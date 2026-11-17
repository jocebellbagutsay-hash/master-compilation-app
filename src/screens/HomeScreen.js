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
import {
  HeaderBar,
  CustomCard,
  LabCard,
} from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const HomeScreen = ({ navigation }) => {
  const { colors, profile, labs } = useApp();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* Top Header with live greeting and theme quick-toggle */}
      <HeaderBar
        onProfilePress={() => navigation.navigate('ProfileTab')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome / Pair Profile Card */}
        <CustomCard style={styles.heroCard} padding={SPACING.lg}>
          <View style={styles.heroTopRow}>
            <View style={[styles.pairTag, { backgroundColor: `${colors.primary}20` }]}>
              <Ionicons name="school" size={14} color={colors.primary} />
              <Text style={[styles.pairTagText, { color: colors.primary }]}>
                {profile.course}
              </Text>
            </View>
            <Text style={[styles.sectionBadge, { color: colors.textSecondary }]}>
              {profile.section}
            </Text>
          </View>

          <Text style={[styles.heroHeading, { color: colors.text }]}>
            Master Compilation App
          </Text>

          <Text style={[styles.heroSubtext, { color: colors.textSecondary }]}>
            Final requirement and master compilation hub for all laboratory activities developed by{' '}
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {profile.student1}
            </Text>{' '}
            and{' '}
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {profile.student2}
            </Text>
            .
          </Text>
        </CustomCard>

        {/* Dashboard Menu Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Dashboard Menu
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Quick navigation to application modules
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {/* Menu Item 1: All Activities */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('LabsTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="folder-open" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Activities</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Browse compilation directory
            </Text>
          </CustomCard>

          {/* Menu Item 2: Activity 1 Details */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('LabDetail', { labId: 'act-1' })}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.accent}18` }]}>
              <Ionicons name="document-text" size={24} color={colors.accent} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Activity 1</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              View submission & objectives
            </Text>
          </CustomCard>

          {/* Menu Item 3: Settings */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('SettingsTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.warning}18` }]}>
              <Ionicons name="options" size={24} color={colors.warning} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Theme & student profile
            </Text>
          </CustomCard>

          {/* Menu Item 4: Pair Profile */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('ProfileTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.success}18` }]}>
              <Ionicons name="people" size={24} color={colors.success} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Pair Profile</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Credentials & contributions
            </Text>
          </CustomCard>
        </View>

        {/* Current Activity Card */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Laboratory Activities
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Current active compilation milestone
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LabsTab')}
            style={styles.seeAllButton}
          >
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              View All
            </Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {labs.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            onPress={() => navigation.navigate('LabDetail', { labId: lab.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxl,
  },
  heroCard: {
    marginBottom: SPACING.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  pairTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  pairTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  heroHeading: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  heroSubtext: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    marginBottom: SPACING.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingBottom: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  menuCard: {
    flexBasis: '48%',
    flexGrow: 1,
    minHeight: 115,
    justifyContent: 'center',
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
});
