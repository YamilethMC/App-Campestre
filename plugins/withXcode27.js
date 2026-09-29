const fs = require('fs');
const path = require('path');
const {
  IOSConfig,
  withAppDelegate,
  withDangerousMod,
  withInfoPlist,
  withPodfile,
  withXcodeProject,
} = require('expo/config-plugins');

/**
 * Lo que Xcode 27 y iOS 27 le exigen a la app, y Expo SDK 57 no genera solo.
 *
 * 1. Ciclo de vida con escenas (UIScene). Una app compilada con el SDK de iOS 27
 *    que no lo adopta se cierra al abrir. Expo 57.0.26 ya trae `ExpoAppSceneDelegate`,
 *    pero su plantilla no lo conecta; la de SDK 58 sí. Este plugin hace exactamente
 *    los cambios de la plantilla 58: la escena crea la ventana, el AppDelegate deja
 *    de hacerlo y el Info.plist declara la escena. Los overrides de links del
 *    AppDelegate se quedan: `SceneEventForwarder` ya evita que un link llegue dos veces.
 *
 * 2. Xcode 27 rechaza targets con deployment target menor a iOS 15. React Native
 *    sube el de los pods pero no el de sus resource bundles (SDWebImage, RNSVG...).
 *
 * Al pasar a SDK 58 este plugin sobra: cada paso se salta solo si ya está aplicado.
 */

const SCENE_DELEGATE_FILE = 'SceneDelegate.swift';

const SCENE_DELEGATE_SOURCE = `internal import Expo

@objc(SceneDelegate)
class SceneDelegate: ExpoAppSceneDelegate {
  // Extension point for config plugins.
}
`;

const WINDOW_BLOCK =
  /\n#if os\(iOS\) \|\| os\(tvOS\)\n\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\n\s*factory\.startReactNative\([\s\S]*?\)\n#endif\n/;

const PODFILE_MARKER = '# withXcode27: resource bundles';

const PODFILE_SNIPPET = `    ${PODFILE_MARKER}
    installer.target_installation_results.pod_target_installation_results.each do |_, result|
      result.resource_bundle_targets.each do |bundle_target|
        bundle_target.build_configurations.each do |build_config|
          current = build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f
          minimum = Helpers::Constants.min_ios_version_supported.to_f
          build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = [minimum, current].max.to_s
        end
      end
    end

`;

const withSceneAppDelegate = (config) =>
  withAppDelegate(config, (config) => {
    const { language, contents } = config.modResults;
    if (language !== 'swift') {
      throw new Error(`withXcode27: se esperaba un AppDelegate en Swift y es ${language}`);
    }

    const conforms = contents.includes('ExpoReactNativeFactoryProvider');
    const createsWindow = WINDOW_BLOCK.test(contents);
    if (conforms && !createsWindow) return config;

    if (!contents.includes('class AppDelegate: ExpoAppDelegate {') || !createsWindow) {
      throw new Error(
        'withXcode27: el AppDelegate generado no tiene la forma de la plantilla de SDK 57. ' +
          'Revisar el plugin antes de compilar: sin escenas la app se cierra en iOS 27.'
      );
    }

    config.modResults.contents = contents
      .replace(
        'class AppDelegate: ExpoAppDelegate {',
        'class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {'
      )
      .replace(
        WINDOW_BLOCK,
        '\n    // La ventana la crea SceneDelegate y ahí arranca React Native (iOS 27).\n'
      );
    return config;
  });

const withSceneManifest = (config) =>
  withInfoPlist(config, (config) => {
    if (config.modResults.UIApplicationSceneManifest) return config;
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: 'Default Configuration',
            UISceneDelegateClassName: '$(PRODUCT_MODULE_NAME).SceneDelegate',
          },
        ],
      },
    };
    return config;
  });

const withSceneDelegateFile = (config) =>
  withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectName = IOSConfig.XcodeUtils.getProjectName(config.modRequest.projectRoot);
      const file = path.join(config.modRequest.platformProjectRoot, projectName, SCENE_DELEGATE_FILE);
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, SCENE_DELEGATE_SOURCE);
      }
      return config;
    },
  ]);

const withSceneDelegateInProject = (config) =>
  withXcodeProject(config, (config) => {
    const projectName = IOSConfig.XcodeUtils.getProjectName(config.modRequest.projectRoot);
    const filepath = `${projectName}/${SCENE_DELEGATE_FILE}`;
    if (!config.modResults.hasFile(filepath)) {
      IOSConfig.XcodeUtils.addBuildSourceFileToGroup({
        filepath,
        groupName: projectName,
        project: config.modResults,
      });
    }
    return config;
  });

const withResourceBundleTargets = (config) =>
  withPodfile(config, (config) => {
    const { contents } = config.modResults;
    if (contents.includes(PODFILE_MARKER)) return config;

    const anchor = 'post_install do |installer|\n';
    if (!contents.includes(anchor)) {
      throw new Error('withXcode27: no se encontró el post_install del Podfile');
    }
    config.modResults.contents = contents.replace(anchor, anchor + PODFILE_SNIPPET);
    return config;
  });

module.exports = (config) =>
  withResourceBundleTargets(
    withSceneDelegateInProject(
      withSceneDelegateFile(withSceneManifest(withSceneAppDelegate(config)))
    )
  );
