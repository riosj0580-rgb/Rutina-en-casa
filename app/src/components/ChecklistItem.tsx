import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';

export function ChecklistItem({
  text,
  done,
  onPress,
}: {
  text: string;
  done: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      {done ? (
        <View style={styles.doneCheck}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      ) : (
        <View style={styles.pendingCheck} />
      )}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  doneCheck: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 19,
    fontFamily: font.extraBold,
  },
  pendingCheck: {
    width: 34,
    height: 34,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.outlineBorder,
  },
  text: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: 18,
    color: colors.text,
    lineHeight: 24,
  },
});
