import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CustomCard } from './CustomCard';
import { StatusBadge } from './StatusBadge';
import { RADIUS, SPACING } from '../constants/theme';

export const LabCard = ({
  lab,
  onPress,
  onToggleStatus,
  compact = false,
  style,
}) => {
  const { colors } = useApp();

  return (
    <CustomCard
      onPress={onPress}
      style={[styles.card, compact && styles.compactCard, style]}
      padding={compact ? SPACING.md : SPACING.base}
    >
      <View style={styles.headerRow}>
        <View style={styles.badgeGroup}>
          <View
            style={[
              styles.categoryTag,
              { backgroundColor: `${colors.primary}1A` },
            ]}
          >
            <Text style={[styles.categoryTagText, { color: colors.primary }]}>
              {lab.category}
            </Text>
          </View>
          <Text style={[styles.labNumber, { color: colors.textSecondary }]}>
            {lab.labNumber}
          </Text>
        </View>

        <StatusBadge status={lab.status} size={compact ? 'sm' : 'md'} />
      </View>

      <View style={styles.titleRow}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.cardAlt, borderColor: colors.border },
          ]}
        >
          <Ionicons
            name={lab.icon || 'code-slash-outline'}
            size={compact ? 18 : 22}
            color={colors.primary}
          />
        </View>
        <View style={styles.titleContent}>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: compact ? 15 : 16 },
            ]}
            numberOfLines={compact ? 1 : 2}
          >
            {lab.title}
          </Text>
          {!compact && lab.description && (
            <Text
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {lab.description}
            </Text>
          )}
        </View>
      </View>

      {!compact && (
        <View style={[styles.footerRow, { borderTopColor: colors.borderLight }]}>
          <View style={styles.conceptsRow}>
            {lab.conceptsCovered.slice(0, 3).map((concept, index) => (
              <View
                key={index}
                style={[styles.conceptPill, { backgroundColor: colors.cardAlt }]}
              >
                <Text style={[styles.conceptText, { color: colors.textSecondary }]}>
                  {concept}
                </Text>
              </View>
            ))}
            {lab.conceptsCovered.length > 3 && (
              <Text style={[styles.moreConcepts, { color: colors.textMuted }]}>
                +{lab.conceptsCovered.length - 3}
              </Text>
            )}
          </View>

          <View style={styles.chevronWrapper}>
            <Text style={[styles.viewDetailsText, { color: colors.primary }]}>
              Explore
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </View>
        </View>
      )}
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  compactCard: {
    marginBottom: SPACING.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  labNumber: {
    fontSize: 12,
    fontWeight: '500',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  conceptsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  conceptPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.xs,
  },
  conceptText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreConcepts: {
    fontSize: 11,
  },
  chevronWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
