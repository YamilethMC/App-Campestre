import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './Style';

interface SubstituteModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, phone: string) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Pide el nombre y el teléfono de quien viene en lugar del socio (§3).
 *
 * Se hace con un Modal y no con `Alert.prompt` porque **`Alert.prompt` sólo
 * existe en iOS**: en Android no hace nada, y el socio se quedaría mirando una
 * pantalla que no responde.
 *
 * Los dos datos son obligatorios: Carlos pide "proporcionando previamente su
 * nombre y contacto al profesor", y el profesor necesita poder confirmarle a
 * quién va a recibir.
 */
export const SubstituteModal: React.FC<SubstituteModalProps> = ({ visible, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const completo = nombre.trim().length >= 3 && telefono.trim().length >= 7;

  const cerrar = () => {
    setNombre('');
    setTelefono('');
    setError('');
    onClose();
  };

  const enviar = async () => {
    setEnviando(true);
    setError('');
    const resultado = await onSubmit(nombre.trim(), telefono.trim());
    setEnviando(false);
    if (resultado.success) cerrar();
    else setError(resultado.error ?? 'No se pudo registrar');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cerrar}>
      <View style={styles.fondo}>
        <View style={styles.tarjeta}>
          <Text style={styles.titulo}>Mandar a alguien en tu lugar</Text>
          <Text style={styles.ayuda}>
            Si viene y paga, no se te cobra nada. Si no se presenta o no paga, el cargo te toca a ti.
          </Text>

          <Text style={styles.etiqueta}>Nombre completo</Text>
          <TextInput
            style={styles.campo}
            value={nombre}
            onChangeText={setNombre}
            placeholder="¿Quién viene?"
            autoCapitalize="words"
          />

          <Text style={styles.etiqueta}>Teléfono</Text>
          <TextInput
            style={styles.campo}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Para que el profesor le confirme"
            keyboardType="phone-pad"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.botones}>
            <TouchableOpacity style={styles.secundario} onPress={cerrar} disabled={enviando}>
              <Text style={styles.textoSecundario}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primario, (!completo || enviando) && styles.apagado]}
              onPress={enviar}
              disabled={!completo || enviando}
            >
              <Text style={styles.textoPrimario}>{enviando ? 'Enviando...' : 'Confirmar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubstituteModal;
