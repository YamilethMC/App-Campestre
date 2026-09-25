/**
 * `react-native-vector-icons` no trae tipos y no publica `@types`.
 *
 * Sin esto, cualquier `tsc --noEmit` del proyecto sale en rojo por dos
 * componentes que funcionan perfectamente en ejecución. Declararlo aquí deja el
 * typecheck limpio sin tocar el código que entregó el Club ni instalar nada.
 *
 * Si algún día el paquete publica sus tipos, este archivo se borra y ya.
 */
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/MaterialCommunityIcons';
declare module 'react-native-vector-icons/FontAwesome';
