import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CustomCard, CustomButton, StatusBadge } from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const LabDetailScreen = ({ route, navigation }) => {
  const { labId } = route.params || {};
  const { colors, labs, toggleLabStatus } = useApp();

  const lab = labs.find((l) => l.id === labId) || labs[0];
  const isCompleted = lab.status === 'Completed';

  const handleToggleStatus = () => {
    toggleLabStatus(lab.id);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* Custom Header Bar */}
      <View style={[styles.navHeader, { borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.navHeaderTitle, { color: colors.text }]}>
          {lab.labNumber}
        </Text>
        <StatusBadge status={lab.status} size="sm" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Lab Title Banner */}
        <CustomCard style={styles.titleCard} padding={SPACING.lg}>
          <View style={styles.metaRow}>
            <View style={[styles.catBadge, { backgroundColor: `${colors.primary}18` }]}>
              <Text style={[styles.catBadgeText, { color: colors.primary }]}>
                {lab.category}
              </Text>
            </View>
            <Text style={[styles.metaDate, { color: colors.textSecondary }]}>
              {lab.dateCompleted} • {lab.grade}
            </Text>
          </View>

          <Text style={[styles.labTitle, { color: colors.text }]}>
            {lab.title}
          </Text>

          <Text style={[styles.labDescription, { color: colors.textSecondary }]}>
            {lab.description}
          </Text>

          {/* Toggle status action button */}
          <CustomButton
            title={isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
            icon={isCompleted ? 'time-outline' : 'checkmark-circle-outline'}
            variant={isCompleted ? 'outline' : 'primary'}
            size="md"
            style={{ marginTop: SPACING.md }}
            onPress={handleToggleStatus}
          />
        </CustomCard>

        {/* Objectives Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Laboratory Objectives
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Key requirements achieved
          </Text>
        </View>

        <CustomCard style={styles.objectivesCard} padding={SPACING.base}>
          {lab.objectives.map((obj, index) => (
            <View key={index} style={styles.objectiveRow}>
              <View style={[styles.objBullet, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
              <Text style={[styles.objectiveText, { color: colors.text }]}>
                {obj}
              </Text>
            </View>
          ))}
        </CustomCard>

        {/* Concepts Covered Tags */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Architecture & Principles
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {lab.conceptsCovered.map((concept, index) => (
            <View
              key={index}
              style={[
                styles.conceptTag,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="pricetag-outline" size={12} color={colors.primary} />
              <Text style={[styles.conceptTagText, { color: colors.text }]}>
                {concept}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxl,
  },
  titleCard: {
    marginBottom: SPACING.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  catBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
  },
  catBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaDate: {
    fontSize: 12,
  },
  labTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  labDescription: {
    fontSize: 14,
    lineHeight: 21,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  objectivesCard: {
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  objBullet: {
    width: 18,
    height: 18,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  objectiveText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.lg,
  },
  conceptTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    gap: 6,
  },
  conceptTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
