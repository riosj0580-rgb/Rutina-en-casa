import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { PrimaryButton } from './Buttons';

export function RestSheet({
  visible,
  timerText,
  onSkip,
}: {
  visible: boolean;
  timerText: string;
  onSkip: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onSkip}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.label}>Descansa</Text>
          <Text style={styles.timer}>{timerText}</Text>
          <Text style={styles.desc}>Respira tranquila. Te aviso cuando toque la siguiente serie.</Text>
          <View style={styles.buttonWrap}>
            <PrimaryButton title="Saltar descanso" onPress={onSkip} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.screenBg,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingTop: 36,
    paddingHorizontal: 26,
    paddingBottom: 52,
    alignItems: 'center',
    gap: 16,
  },
  label: {
    fontFamily: font.bold,
    fontSize: 19,
    color: colors.textSoft,
  },
  timer: {
    fontFamily: font.extraBold,
    fontSize: 76,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  desc: {
    fontFamily: font.regular,
    fontSize: 17,
    color: colors.placeholderText,
    textAlign: 'center',
    lineHeight: 25,
    maxWidth: 280,
  },
  buttonWrap: {
    alignSelf: 'stretch',
    marginTop: 6,
  },
});
