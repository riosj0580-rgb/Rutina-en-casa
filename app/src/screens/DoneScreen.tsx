import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { OutlineButton, PrimaryButton } from '../components/Buttons';

export function DoneScreen({
  doneLine,
  onProgress,
  onHome,
}: {
  doneLine: string;
  onProgress: () => void;
  onHome: () => void;
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✓</Text>
      </View>
      <Text style={styles.title}>Listo, terminaste</Text>
      <Text style={styles.body}>{doneLine}</Text>
      <View style={styles.buttons}>
        <PrimaryButton title="Ver mi semana" onPress={onProgress} />
        <OutlineButton title="Volver al inicio" onPress={onHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenBg,
    paddingHorizontal: 26,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  badge: {
    width: 96,
    height: 96,
    borderRadius: 34,
    backgroundColor: colors.greenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: font.extraBold,
    fontSize: 44,
    color: colors.green,
  },
  title: {
    fontFamily: font.extraBold,
    fontSize: 30,
    color: colors.text,
    textAlign: 'center',
  },
  body: {
    fontFamily: font.regular,
    fontSize: 18,
    lineHeight: 26,
    color: colors.textSoft,
    textAlign: 'center',
  },
  buttons: {
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 8,
  },
});
