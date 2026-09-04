import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { BackButton } from '../components/Buttons';

export function ProgressScreen({
  week,
  weekSummary,
  sessions,
  onBack,
}: {
  week: { label: string; done: boolean }[];
  weekSummary: string;
  sessions: { title: string; when: string }[];
  onBack: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <Text style={styles.headerLabel}>Inicio</Text>
      </View>

      <Text style={styles.title}>Mi semana</Text>

      <View style={styles.week}>
        {week.map((d, i) => (
          <View key={i} style={styles.weekCell}>
            <Text style={styles.weekLabel}>{d.label}</Text>
            {d.done ? (
              <View style={[styles.weekSquare, styles.weekSquareDone]}>
                <Text style={styles.weekCheck}>✓</Text>
              </View>
            ) : (
              <View style={[styles.weekSquare, styles.weekSquarePending]} />
            )}
          </View>
        ))}
      </View>

      <Text style={styles.summary}>{weekSummary}</Text>

      <View style={styles.sessions}>
        {sessions.map((s, i) => (
          <View key={i} style={styles.sessionCard}>
            <View style={styles.sessionIcon}>
              <Text style={styles.sessionCheck}>✓</Text>
            </View>
            <View>
              <Text style={styles.sessionTitle}>{s.title}</Text>
              <Text style={styles.sessionWhen}>{s.when}</Text>
            </View>
          </View>
        ))}
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
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: 32,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLabel: {
    fontFamily: font.bold,
    fontSize: 16,
    color: colors.textMuted,
  },
  title: {
    fontFamily: font.extraBold,
    fontSize: 28,
    color: colors.text,
  },
  week: {
    flexDirection: 'row',
    gap: 7,
  },
  weekCell: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
  },
  weekLabel: {
    fontFamily: font.bold,
    fontSize: 15,
    color: colors.textMuted,
  },
  weekSquare: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekSquareDone: {
    backgroundColor: colors.green,
  },
  weekSquarePending: {
    backgroundColor: colors.chipBg,
  },
  weekCheck: {
    fontFamily: font.extraBold,
    fontSize: 18,
    color: '#fff',
  },
  summary: {
    fontFamily: font.bold,
    fontSize: 18,
    color: colors.textStrong,
  },
  sessions: {
    gap: 10,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    padding: 16,
  },
  sessionIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.sessionIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionCheck: {
    fontFamily: font.extraBold,
    fontSize: 18,
    color: colors.green,
  },
  sessionTitle: {
    fontFamily: font.extraBold,
    fontSize: 18,
    color: colors.text,
  },
  sessionWhen: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.sessionWhen,
  },
});
