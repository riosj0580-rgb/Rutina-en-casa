import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';

export function PrimaryButton({
  title,
  onPress,
  color = colors.dark,
  textColor = colors.screenBg,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        { backgroundColor: color, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <Text style={[styles.primaryText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

export function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outline, pressed && { backgroundColor: colors.outlineHoverBg }]}
    >
      <Text style={styles.outlineText}>{title}</Text>
    </Pressable>
  );
}

export function LinkButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.link} hitSlop={8}>
      <Text style={styles.linkText}>{title}</Text>
    </Pressable>
  );
}

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.back} hitSlop={6}>
      <Text style={styles.backText}>‹</Text>
    </Pressable>
  );
}

export function DayButton({
  letter,
  title,
  subtitle,
  lastLabel,
  bg,
  bgHover,
  iconBg,
  subtitleColor,
  lastColor,
  onPress,
}: {
  letter: string;
  title: string;
  subtitle: string;
  lastLabel: string;
  bg: string;
  bgHover: string;
  iconBg: string;
  subtitleColor: string;
  lastColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.day, { backgroundColor: pressed ? bgHover : bg }]}
    >
      <View style={[styles.dayIcon, { backgroundColor: iconBg }]}>
        <Text style={styles.dayIconText}>{letter}</Text>
      </View>
      <View style={styles.dayTextCol}>
        <Text style={styles.dayTitle}>{title}</Text>
        <Text style={[styles.daySubtitle, { color: subtitleColor }]}>{subtitle}</Text>
        <Text style={[styles.dayLast, { color: lastColor }]}>{lastLabel}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  primaryText: {
    fontFamily: font.extraBold,
    fontSize: 20,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.outlineBorder,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  outlineText: {
    fontFamily: font.bold,
    fontSize: 18,
    color: colors.textStrong,
  },
  link: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
  back: {
    backgroundColor: colors.chipBg,
    borderRadius: 14,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: font.extraBold,
    fontSize: 22,
    color: colors.textStrong,
    marginTop: -2,
  },
  day: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  dayIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayIconText: {
    fontFamily: font.extraBold,
    fontSize: 24,
    color: '#fff',
  },
  dayTextCol: {
    flex: 1,
    gap: 3,
  },
  dayTitle: {
    fontFamily: font.extraBold,
    fontSize: 23,
    color: colors.text,
  },
  daySubtitle: {
    fontFamily: font.semiBold,
    fontSize: 17,
  },
  dayLast: {
    fontFamily: font.semiBold,
    fontSize: 15,
  },
});
