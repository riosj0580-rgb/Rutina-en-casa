import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { DayButton, LinkButton, OutlineButton } from '../components/Buttons';

export function HomeScreen({
  lastA,
  lastB,
  lastC,
  onStartA,
  onStartB,
  onStartC,
  onProgress,
  onPain,
}: {
  lastA: string;
  lastB: string;
  lastC: string;
  onStartA: () => void;
  onStartB: () => void;
  onStartC: () => void;
  onProgress: () => void;
  onPain: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Rutina en casa</Text>
        <Text style={styles.title}>Elige el día que quieras hacer hoy</Text>
      </View>

      <View style={styles.days}>
        <DayButton
          letter="A"
          title="Día A"
          subtitle="Fuerza de base"
          lastLabel={lastA}
          bg={colors.greenBg}
          bgHover={colors.greenBgHover}
          iconBg={colors.green}
          subtitleColor={colors.greenSubtitle}
          lastColor={colors.greenLast}
          onPress={onStartA}
        />
        <DayButton
          letter="B"
          title="Día B"
          subtitle="Circuito activador"
          lastLabel={lastB}
          bg={colors.orangeBg}
          bgHover={colors.orangeBgHover}
          iconBg={colors.orange}
          subtitleColor={colors.orangeSubtitle}
          lastColor={colors.orangeLast}
          onPress={onStartB}
        />
        <DayButton
          letter="C"
          title="Día C"
          subtitle="Postura y equilibrio"
          lastLabel={lastC}
          bg={colors.goldBg}
          bgHover={colors.goldBgHover}
          iconBg={colors.gold}
          subtitleColor={colors.goldSubtitle}
          lastColor={colors.goldLast}
          onPress={onStartC}
        />
      </View>

      <View style={styles.footer}>
        <OutlineButton title="Ver mi semana" onPress={onProgress} />
        <LinkButton title="¿Sientes dolor?" onPress={onPain} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  content: {
    flexGrow: 1,
    paddingTop: 24,
    paddingHorizontal: 22,
    paddingBottom: 32,
    gap: 18,
  },
  header: {
    gap: 4,
  },
  eyebrow: {
    fontFamily: font.bold,
    fontSize: 15,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  title: {
    fontFamily: font.extraBold,
    fontSize: 30,
    lineHeight: 35,
    color: colors.text,
  },
  days: {
    gap: 14,
  },
  footer: {
    marginTop: 'auto',
    gap: 10,
    paddingTop: 24,
  },
});
