import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { COLORS } from '../../../../../shared/theme/colors';
import { ClassPolicy } from '../../interfaces';
import styles from './Style';

interface PolicyNoticeProps {
  policy: ClassPolicy | null;
  labels: {
    title: string;
    payment: string;
    cancellation: string;
    noShow: string;
    late: string;
  };
}

/**
 * Las reglas del Club, dichas **antes** de que el socio confirme.
 *
 * Hasta ahora sólo veía el precio. Se enteraba de que paga en efectivo cuando
 * llegaba a la clase, y de la política de cancelación cuando intentaba cancelar
 * y ya le costaba. Eso no es informar, es emboscar.
 *
 * Las cifras salen de la política que manda el servidor, no de textos escritos
 * aquí: si el Club cambia la ventana o el porcentaje desde el panel, este aviso
 * cambia solo.
 */
export const PolicyNotice: React.FC<PolicyNoticeProps> = ({ policy, labels }) => {
  if (!policy) return null;

  const reglas = [
    labels.payment,
    labels.cancellation
      .replace('{{hours}}', String(policy.cancellationWindowHours))
      .replace('{{percent}}', String(policy.lateCancelChargePercent)),
    labels.noShow.replace('{{percent}}', String(policy.noShowChargePercent)),
    labels.late,
  ];

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{labels.title}</Text>
      {reglas.map((regla) => (
        <View key={regla} style={styles.fila}>
          <Ionicons
            name="ellipse"
            size={5}
            color={COLORS.gray600}
            style={styles.punto}
          />
          <Text style={styles.texto}>{regla}</Text>
        </View>
      ))}
    </View>
  );
};

export default PolicyNotice;
