import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';
import { BackButton, LinkButton, PrimaryButton } from '../components/Buttons';
import { ChecklistItem } from '../components/ChecklistItem';

export function ChecklistScreen({
  dayTitle,
  heading,
  description,
  items,
  doneMap,
  onToggle,
  ctaLabel,
  ctaColor,
  onCta,
  onBack,
  onPain,
}: {
  dayTitle: string;
  heading: string;
  description: string;
  items: string[];
  doneMap: Record<number, boolean>;
  onToggle: (idx: number) => void;
  ctaLabel: string;
  ctaColor: string;
  onCta: () => void;
  onBack: () => void;
  onPain: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <Text style={styles.dayTitle}>{dayTitle}</Text>
      </View>

      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.list}>
        {items.map((text, i) => (
          <ChecklistItem key={i} text={text} done={!!doneMap[i]} onPress={() => onToggle(i)} />
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton title={ctaLabel} onPress={onCta} color={ctaColor} />
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
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dayTitle: {
    fontFamily: font.bold,
    fontSize: 16,
    color: colors.textMuted,
  },
  heading: {
    fontFamily: font.extraBold,
    fontSize: 28,
    color: colors.text,
  },
  description: {
    fontFamily: font.regular,
    fontSize: 17,
    color: colors.textSoft,
    lineHeight: 25,
  },
  list: {
    gap: 12,
  },
  footer: {
    marginTop: 'auto',
    gap: 10,
    paddingTop: 24,
  },
});
