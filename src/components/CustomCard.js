import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useApp } from '../context/AppContext';
import { RADIUS, SPACING } from '../constants/theme';

export const CustomCard = ({
  children,
  onPress,
  style,
  elevated = true,
  padding = SPACING.base,
  ...props
}) => {
  const { colors, isDark } = useApp();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      padding: padding,
      shadowColor: colors.shadow,
    },
    elevated &&
      (Platform.OS === 'ios'
        ? styles.iosShadow
        : Platform.OS === 'android'
        ? styles.androidShadow
        : styles.webShadow),
    isDark && styles.darkShadowOverride,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={cardStyle}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  iosShadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  androidShadow: {
    elevation: 3,
  },
  webShadow: {
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.06)',
  },
  darkShadowOverride: {
    shadowOpacity: 0.35,
    elevation: 4,
  },
});
