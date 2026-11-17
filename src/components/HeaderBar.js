import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { SPACING, RADIUS } from '../constants/theme';

export const HeaderBar = ({ title, subtitle, showThemeToggle = true, onProfilePress }) => {
  const { colors, isDark, toggleTheme, profile } = useApp();
  const [greeting, setGreeting] = useState('Welcome');

  // Demonstrate useEffect to calculate time-of-day greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const displayTitle = title || `${greeting}, ${profile.student1.split(' ')[0]} & ${profile.student2.split(' ')[0]}!`;
  const displaySubtitle = subtitle || `${profile.course} • ${profile.section}`;

  return (
    <View style={[styles.headerContainer, { borderBottomColor: colors.borderLight }]}>
      <TouchableOpacity
        style={styles.textContainer}
        activeOpacity={onProfilePress ? 0.7 : 1}
        onPress={onProfilePress}
      >
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {displaySubtitle}
        </Text>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {displayTitle}
        </Text>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        {showThemeToggle && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleTheme}
            style={[
              styles.iconButton,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
              },
            ]}
            accessibilityLabel="Toggle Theme"
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={18}
              color={isDark ? '#FBBF24' : colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
