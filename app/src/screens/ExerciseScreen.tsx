import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Exercise } from '../data';
import { colors, font } from '../theme';
import { BackButton, LinkButton, PrimaryButton } from '../components/Buttons';
import { ExerciseImage } from '../components/ExerciseImage';

export function ExerciseScreen({
  stepLabel,
  ex,
  isCircuit,
  sets,
  nextLabel,
  onBack,
  onOpenRir,
  onCompleteSet,
  onSetSet,
  onNext,
  onPain,
}: {
  stepLabel: string;
  ex: Exercise;
  isCircuit: boolean;
  sets: { n: number; label: string; done: boolean; pending: boolean }[];
  nextLabel: string;
  onBack: () => void;
  onOpenRir: () => void;
  onCompleteSet: () => void;
  onSetSet: (n: number) => void;
  onNext: () => void;
  onPain: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <Text style={styles.stepLabel}>{stepLabel}</Text>
      </View>

      <Text style={styles.name}>{ex.name}</Text>

      <ExerciseImage source={ex.img} />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Haz</Text>
          <Text style={styles.statValue}>{ex.reps}</Text>
        </View>
        <Pressable style={styles.statCard} onPress={onOpenRir}>
          <Text style={styles.statLabel}>Esfuerzo (?)</Text>
          <Text style={styles.statValue}>{ex.rir}</Text>
        </Pressable>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Descanso</Text>
          <Text style={styles.statValue}>{ex.rest}</Text>
        </View>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>{ex.note}</Text>
      </View>

      {isCircuit ? (
        <PrimaryButton title="Ejercicio hecho" onPress={onCompleteSet} color={colors.orange} textColor="#fff" />
      ) : (
        <View style={styles.setsBlock}>
          <Text style={styles.setsLabel}>Toca cada serie al terminarla</Text>
          <View style={styles.setsRow}>
            {sets.map((s) => (
              <Pressable
                key={s.n}
                onPress={() => onSetSet(s.n)}
                style={[styles.setButton, s.done && styles.setButtonDone]}
              >
                <Text style={[styles.setButtonText, s.done && styles.setButtonTextDone]}>
                  {s.done ? '✓ ' + s.label : s.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <PrimaryButton title={nextLabel} onPress={onNext} />
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
    paddingTop: 20,
    paddingHorizontal: 22,
    paddingBottom: 32,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  stepLabel: {
    fontFamily: font.bold,
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'right',
  },
  name: {
    fontFamily: font.extraBold,
    fontSize: 29,
    lineHeight: 33,
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 4,
  },
  statLabel: {
    fontFamily: font.bold,
    fontSize: 14,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statValue: {
    fontFamily: font.extraBold,
    fontSize: 19,
    lineHeight: 23,
    color: colors.text,
  },
  note: {
    backgroundColor: colors.greenBg,
    borderRadius: 18,
    padding: 16,
  },
  noteText: {
    fontFamily: font.regular,
    fontSize: 17,
    lineHeight: 25,
    color: colors.greenNoteText,
  },
  setsBlock: {
    gap: 10,
  },
  setsLabel: {
    fontFamily: font.bold,
    fontSize: 16,
    color: colors.textMuted,
  },
  setsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  setButton: {
    flex: 1,
    minHeight: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
  },
  setButtonDone: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  setButtonText: {
    fontFamily: font.extraBold,
    fontSize: 18,
    color: colors.textSoft,
  },
  setButtonTextDone: {
    color: '#fff',
  },
  footer: {
    marginTop: 'auto',
    gap: 10,
    paddingTop: 14,
  },
});
