import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { RADIUS, SPACING } from '../constants/theme';

export const StatusBadge = ({ status = 'In Progress', size = 'md' }) => {
  const { colors, isDark } = useApp();

  const isCompleted = status === 'Completed';
  const isInProgress = status === 'In Progress';

  const badgeColor = isCompleted
    ? colors.success
    : isInProgress
    ? colors.warning
    : colors.textMuted;

  const badgeBg = isCompleted
    ? isDark
      ? 'rgba(52, 211, 153, 0.15)'
      : 'rgba(16, 185, 129, 0.12)'
    : isInProgress
    ? isDark
      ? 'rgba(251, 191, 36, 0.15)'
      : 'rgba(245, 158, 11, 0.12)'
    : isDark
    ? 'rgba(148, 163, 184, 0.15)'
    : 'rgba(148, 163, 184, 0.15)';

  const iconName = isCompleted
    ? 'checkmark-circle'
    : isInProgress
    ? 'time-outline'
    : 'ellipse-outline';

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: badgeBg,
          paddingVertical: isSmall ? 3 : 5,
          paddingHorizontal: isSmall ? 8 : 10,
        },
      ]}
    >
      <Ionicons
        name={iconName}
        size={isSmall ? 12 : 14}
        color={badgeColor}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.badgeText,
          {
            color: badgeColor,
            fontSize: isSmall ? 11 : 12,
            fontWeight: '600',
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    letterSpacing: 0.2,
  },
});
