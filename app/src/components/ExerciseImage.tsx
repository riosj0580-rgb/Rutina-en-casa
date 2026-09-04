import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { colors, font } from '../theme';

export function ExerciseImage({ source }: { source: ImageSourcePropType | null }) {
  if (source) {
    return (
      <View style={styles.frame}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>
    );
  }
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>imagen de referencia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 8,
  },
  placeholder: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.placeholderBg,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.placeholderStripe,
  },
  placeholderText: {
    fontFamily: font.regular,
    fontSize: 13,
    color: colors.placeholderText,
    backgroundColor: colors.screenBg,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});
