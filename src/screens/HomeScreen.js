import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import {
  HeaderBar,
  CustomCard,
  CustomButton,
  StatBox,
  LabCard,
  StatusBadge,
} from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const HomeScreen = ({ navigation }) => {
  const { colors, isDark, profile, labs, stats } = useApp();

  const featuredLabs = labs.slice(0, 3);
  const finalProject = labs.find((l) => l.id === 'final-proj') || labs[labs.length - 1];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* Top Header with live greeting and theme switcher */}
      <HeaderBar
        onProfilePress={() => navigation.navigate('ProfileTab')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Pair Hero Banner */}
        <CustomCard style={styles.heroCard} padding={SPACING.lg}>
          <View style={styles.heroTopRow}>
            <View style={[styles.pairTag, { backgroundColor: `${colors.primary}20` }]}>
              <Ionicons name="people" size={14} color={colors.primary} />
              <Text style={[styles.pairTagText, { color: colors.primary }]}>
                PAIR COLLABORATION
              </Text>
            </View>
            <View style={styles.termBadge}>
              <Text style={[styles.termBadgeText, { color: colors.textSecondary }]}>
                {profile.academicYear}
              </Text>
            </View>
          </View>

          <Text style={[styles.heroHeading, { color: colors.text }]}>
            Master Compilation Hub
          </Text>

          <Text style={[styles.heroSubtext, { color: colors.textSecondary }]}>
            Final requirement and centralized compilation for all laboratory activities by{' '}
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {profile.student1}
            </Text>{' '}
            &{' '}
            <Text style={{ fontWeight: '700', color: colors.text }}>
              {profile.student2}
            </Text>
            .
          </Text>

          {/* Progress bar container */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                Curriculum Milestone Completion
              </Text>
              <Text style={[styles.progressPercent, { color: colors.primary }]}>
                {stats.percent}%
              </Text>
            </View>
            <View style={[styles.progressBarTrack, { backgroundColor: colors.surface }]}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${stats.percent}%`,
                    backgroundColor: colors.primary,
                  },
                ]}
              />
            </View>
          </View>
        </CustomCard>

        {/* Responsive Stats Grid (Flexbox) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Activity Metrics
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Real-time synchronization
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatBox
            icon="albums-outline"
            value={stats.total}
            label="Total Labs"
            accentColor={colors.primary}
            onPress={() => navigation.navigate('LabsTab')}
          />
          <StatBox
            icon="checkmark-done-circle-outline"
            value={stats.completed}
            label="Completed"
            accentColor={colors.success}
            onPress={() => navigation.navigate('LabsTab')}
          />
          <StatBox
            icon="hourglass-outline"
            value={stats.inProgress}
            label="In Progress"
            accentColor={colors.warning}
            onPress={() => navigation.navigate('LabsTab')}
          />
        </View>

        {/* Quick Menu Hub */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Navigation Hub
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Quick access menus
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {/* Card 1: View Labs */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('LabsTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="folder-open" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>All Activities</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Explore complete lab syllabus & code demos
            </Text>
          </CustomCard>

          {/* Card 2: Settings & Global State */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('SettingsTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.accent}18` }]}>
              <Ionicons name="options" size={24} color={colors.accent} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Settings & Theme</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Test live global state & edit pair info
            </Text>
          </CustomCard>

          {/* Card 3: Pair Info */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('ProfileTab')}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.success}18` }]}>
              <Ionicons name="person-circle" size={24} color={colors.success} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Pair Details</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Student IDs, roles & contributions
            </Text>
          </CustomCard>

          {/* Card 4: Final Showcase */}
          <CustomCard
            style={styles.menuCard}
            onPress={() => navigation.navigate('LabDetail', { labId: finalProject.id })}
            padding={SPACING.md}
          >
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.warning}18` }]}>
              <Ionicons name="trophy" size={24} color={colors.warning} />
            </View>
            <Text style={[styles.menuTitle, { color: colors.text }]}>Final Showcase</Text>
            <Text style={[styles.menuDesc, { color: colors.textSecondary }]}>
              Capstone requirements & architecture
            </Text>
          </CustomCard>
        </View>

        {/* Featured / Recent Laboratory Activities */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Laboratory Activities (Placeholder Slots)
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Empty compilation slots ready for future submissions
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LabsTab')}
            style={styles.seeAllButton}
          >
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              View All ({labs.length})
            </Text>
            <Ionicons name="arrow-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {featuredLabs.map((lab) => (
          <LabCard
            key={lab.id}
            lab={lab}
            onPress={() => navigation.navigate('LabDetail', { labId: lab.id })}
          />
        ))}

        {/* Bottom CTA for Settings Demo */}
        <CustomCard style={styles.settingsCallout} padding={SPACING.base}>
          <View style={styles.calloutRow}>
            <View style={[styles.calloutIcon, { backgroundColor: `${colors.primary}20` }]}>
              <Ionicons name="color-wand" size={22} color={colors.primary} />
            </View>
            <View style={styles.calloutTextContainer}>
              <Text style={[styles.calloutTitle, { color: colors.text }]}>
                Global State Management
              </Text>
              <Text style={[styles.calloutBody, { color: colors.textSecondary }]}>
                Toggle between Light and Dark themes or edit pair student names in Settings to watch every screen update instantly.
              </Text>
            </View>
          </View>
          <CustomButton
            title="Open Global Settings"
            icon="settings-outline"
            variant="outline"
            size="sm"
            style={{ marginTop: SPACING.md }}
            onPress={() => navigation.navigate('SettingsTab')}
          />
        </CustomCard>
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
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  termBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  termBadgeText: {
    fontSize: 12,
    fontWeight: '500',
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
    marginBottom: SPACING.base,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: RADIUS.full,
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
    gap: 4,
    paddingBottom: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
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
    minHeight: 120,
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
  settingsCallout: {
    marginTop: SPACING.base,
    borderStyle: 'dashed',
  },
  calloutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  calloutIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutTextContainer: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  calloutBody: {
    fontSize: 12,
    lineHeight: 17,
  },
});
