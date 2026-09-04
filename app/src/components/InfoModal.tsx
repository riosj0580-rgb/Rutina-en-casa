import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { PrimaryButton } from './Buttons';

export function InfoModal({
  visible,
  title,
  body,
  onClose,
}: {
  visible: boolean;
  title: string;
  body: string;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <PrimaryButton title="Entendido" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 26,
  },
  card: {
    width: '100%',
    backgroundColor: colors.screenBg,
    borderRadius: 28,
    padding: 26,
    gap: 16,
  },
  title: {
    fontFamily: font.extraBold,
    fontSize: 23,
    color: colors.text,
  },
  body: {
    fontFamily: font.regular,
    fontSize: 18,
    lineHeight: 27,
    color: colors.textStrong,
  },
});
