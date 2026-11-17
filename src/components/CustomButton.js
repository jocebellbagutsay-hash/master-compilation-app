import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { RADIUS, SPACING } from '../constants/theme';

export const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors } = useApp();

  const getContainerStyle = () => {
    let bg = colors.primary;
    let border = 'transparent';

    if (variant === 'secondary') {
      bg = colors.cardAlt;
    } else if (variant === 'outline') {
      bg = 'transparent';
      border = colors.primary;
    } else if (variant === 'danger') {
      bg = colors.danger;
    } else if (variant === 'ghost') {
      bg = 'transparent';
    }

    let padV = SPACING.md;
    let padH = SPACING.base;
    if (size === 'sm') {
      padV = SPACING.xs + 2;
      padH = SPACING.md;
    } else if (size === 'lg') {
      padV = SPACING.base;
      padH = SPACING.xl;
    }

    return {
      backgroundColor: disabled ? colors.surface : bg,
      borderColor: disabled ? 'transparent' : border,
      borderWidth: variant === 'outline' ? 1.5 : 0,
      paddingVertical: padV,
      paddingHorizontal: padH,
      borderRadius: RADIUS.md,
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (variant === 'primary' || variant === 'danger') return '#FFFFFF';
    if (variant === 'outline') return colors.primary;
    return colors.text;
  };

  const textColor = getTextColor();
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.buttonBase, getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={iconSize} color={textColor} style={styles.iconLeft} />
          )}
          <Text
            style={[
              styles.textBase,
              {
                color: textColor,
                fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 14,
                fontWeight: '600',
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={iconSize} color={textColor} style={styles.iconRight} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBase: {
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
