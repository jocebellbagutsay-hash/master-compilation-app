import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CustomCard, CustomButton } from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const ProfileScreen = ({ navigation }) => {
  const { colors, profile, isDark, stats } = useApp();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Pair Profile</Text>
        </View>

        {/* Academic Course Card */}
        <CustomCard style={styles.courseCard} padding={SPACING.lg}>
          <View style={styles.courseIconRow}>
            <View style={[styles.courseIcon, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="school-outline" size={26} color={colors.primary} />
            </View>
            <View style={styles.courseTextCol}>
              <Text style={[styles.courseName, { color: colors.text }]}>
                {profile.course}
              </Text>
              <Text style={[styles.subjectName, { color: colors.textSecondary }]}>
                {profile.subject} • {profile.section}
              </Text>
              <Text style={[styles.termText, { color: colors.textMuted }]}>
                {profile.term} • {profile.academicYear}
              </Text>
            </View>
          </View>
        </CustomCard>

        {/* Student 1 Card */}
        <CustomCard style={styles.studentCard} padding={SPACING.lg}>
          <View style={styles.studentHeader}>
            <View style={[styles.avatarBox, { backgroundColor: `${colors.primary}25` }]}>
              <Ionicons name="person" size={28} color={colors.primary} />
            </View>
            <View style={styles.studentMeta}>
              <View style={[styles.roleBadge, { backgroundColor: `${colors.primary}15` }]}>
                <Text style={[styles.roleBadgeText, { color: colors.primary }]}>
                  PAIR MEMBER 1
                </Text>
              </View>
              <Text style={[styles.studentName, { color: colors.text }]}>
                {profile.student1}
              </Text>
              <Text style={[styles.studentId, { color: colors.textSecondary }]}>
                Student ID: {profile.studentId1}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <View style={styles.roleSection}>
            <Text style={[styles.roleDesc, { color: colors.text }]}>
              {profile.role1}
            </Text>
          </View>
        </CustomCard>

        {/* Student 2 Card */}
        <CustomCard style={styles.studentCard} padding={SPACING.lg}>
          <View style={styles.studentHeader}>
            <View style={[styles.avatarBox, { backgroundColor: `${colors.accent}25` }]}>
              <Ionicons name="person" size={28} color={colors.accent} />
            </View>
            <View style={styles.studentMeta}>
              <View style={[styles.roleBadge, { backgroundColor: `${colors.accent}15` }]}>
                <Text style={[styles.roleBadgeText, { color: colors.accent }]}>
                  PAIR MEMBER 2
                </Text>
              </View>
              <Text style={[styles.studentName, { color: colors.text }]}>
                {profile.student2}
              </Text>
              <Text style={[styles.studentId, { color: colors.textSecondary }]}>
                Student ID: {profile.studentId2}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <View style={styles.roleSection}>
            <Text style={[styles.roleDesc, { color: colors.text }]}>
              {profile.role2}
            </Text>
          </View>
        </CustomCard>

        {/* Technical Architecture Info */}
        <CustomCard style={styles.techCard} padding={SPACING.base}>
          <Text style={[styles.techTitle, { color: colors.text }]}>
            Technical Architecture & Deliverables
          </Text>

          <View style={styles.techList}>
            <View style={styles.techRow}>
              <Ionicons name="hardware-chip-outline" size={18} color={colors.primary} />
              <Text style={[styles.techLabel, { color: colors.textSecondary }]}>Framework:</Text>
              <Text style={[styles.techVal, { color: colors.text }]}>React Native 0.88 / Expo SDK 58</Text>
            </View>
            <View style={styles.techRow}>
              <Ionicons name="layers-outline" size={18} color={colors.primary} />
              <Text style={[styles.techLabel, { color: colors.textSecondary }]}>State Engine:</Text>
              <Text style={[styles.techVal, { color: colors.text }]}>React Context API + Hooks</Text>
            </View>
            <View style={styles.techRow}>
              <Ionicons name="navigate-outline" size={18} color={colors.primary} />
              <Text style={[styles.techLabel, { color: colors.textSecondary }]}>Navigation:</Text>
              <Text style={[styles.techVal, { color: colors.text }]}>React Navigation (Tabs + Stack)</Text>
            </View>
            <View style={styles.techRow}>
              <Ionicons name="phone-portrait-outline" size={18} color={colors.primary} />
              <Text style={[styles.techLabel, { color: colors.textSecondary }]}>Layout:</Text>
              <Text style={[styles.techVal, { color: colors.text }]}>Adaptive Flexbox (Zero Overflow)</Text>
            </View>
          </View>

          <CustomButton
            title="Edit Pair Information in Settings"
            icon="create-outline"
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
  header: {
    marginBottom: SPACING.base,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  courseCard: {
    marginBottom: SPACING.md,
  },
  courseIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTextCol: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  termText: {
    fontSize: 11,
  },
  studentCard: {
    marginBottom: SPACING.md,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarBox: {
    width: 54,
    height: 54,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentMeta: {
    flex: 1,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: RADIUS.xs,
    marginBottom: 4,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  studentName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: SPACING.md,
  },
  roleSection: {
    gap: 4,
  },
  roleLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  roleDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  techCard: {
    marginBottom: SPACING.md,
  },
  techTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  techList: {
    gap: 10,
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  techLabel: {
    fontSize: 12,
    width: 90,
  },
  techVal: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
});
