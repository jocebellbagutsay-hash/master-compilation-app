import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CustomCard, CustomButton } from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const SettingsScreen = ({ navigation }) => {
  const {
    themeMode,
    isDark,
    toggleTheme,
    setThemeMode,
    colors,
    profile,
    updateProfile,
    stats,
  } = useApp();

  // Local draft state for profile form
  const [student1, setStudent1] = useState(profile.student1);
  const [student2, setStudent2] = useState(profile.student2);
  const [studentId1, setStudentId1] = useState(profile.studentId1);
  const [studentId2, setStudentId2] = useState(profile.studentId2);
  const [section, setSection] = useState(profile.section);
  const [course, setCourse] = useState(profile.course);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const handleSaveProfile = () => {
    updateProfile({
      student1,
      student2,
      studentId1,
      studentId2,
      section,
      course,
    });
    setSaveFeedback(true);
    setTimeout(() => {
      setSaveFeedback(false);
    }, 2500);
  };

  const handleResetDefaults = () => {
    const defaultProfile = {
      student1: 'Alex Rivera',
      studentId1: '2023-10492',
      role1: 'Lead Frontend & State Architect',
      student2: 'Jordan Cruz',
      studentId2: '2023-10884',
      role2: 'UI/UX & Component Specialist',
      course: 'BS in Information Technology',
      section: 'BSIT 3-A',
    };
    setStudent1(defaultProfile.student1);
    setStudent2(defaultProfile.student2);
    setStudentId1(defaultProfile.studentId1);
    setStudentId2(defaultProfile.studentId2);
    setSection(defaultProfile.section);
    setCourse(defaultProfile.course);
    updateProfile(defaultProfile);
    Alert.alert('Reset Successful', 'Profile values reset to default student credentials.');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Global Settings</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            React Context API Live State Dispatcher
          </Text>
        </View>

        {/* Global State Explanation Callout */}
        <CustomCard style={styles.infoBanner} padding={SPACING.md}>
          <View style={styles.infoRow}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                Live Global Synchronization
              </Text>
              <Text style={[styles.infoBody, { color: colors.textSecondary }]}>
                Changes made here immediately dispatch through `AppContext` and re-render the Home Dashboard, headers, navigation bars, and all screens without refreshing.
              </Text>
            </View>
          </View>
        </CustomCard>

        {/* Section 1: Dark / Light Theme Toggle */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance & Theme
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Toggle global color palette
          </Text>
        </View>

        <CustomCard style={styles.card} padding={SPACING.base}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabelGroup}>
              <View style={[styles.settingIcon, { backgroundColor: `${colors.primary}18` }]}>
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={20}
                  color={isDark ? '#FBBF24' : colors.primary}
                />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingSublabel, { color: colors.textSecondary }]}>
                  Current theme: {themeMode.toUpperCase()}
                </Text>
              </View>
            </View>

            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.surface, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Theme Visual Selector Cards */}
          <View style={styles.themeSelectorRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setThemeMode('light')}
              style={[
                styles.themeChoiceCard,
                {
                  backgroundColor: '#FFFFFF',
                  borderColor: !isDark ? colors.primary : '#E2E8F0',
                  borderWidth: !isDark ? 2 : 1,
                },
              ]}
            >
              <Ionicons name="sunny" size={22} color="#F59E0B" />
              <Text style={[styles.themeChoiceText, { color: '#0F172A' }]}>
                Light Mode
              </Text>
              {!isDark && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]}>
                  <Text style={styles.activeIndicatorText}>ACTIVE</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setThemeMode('dark')}
              style={[
                styles.themeChoiceCard,
                {
                  backgroundColor: '#161F30',
                  borderColor: isDark ? colors.primary : '#2A374A',
                  borderWidth: isDark ? 2 : 1,
                },
              ]}
            >
              <Ionicons name="moon" size={22} color="#38BDF8" />
              <Text style={[styles.themeChoiceText, { color: '#F8FAFC' }]}>
                Dark Mode
              </Text>
              {isDark && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]}>
                  <Text style={styles.activeIndicatorText}>ACTIVE</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </CustomCard>

        {/* Section 2: Global Student Profile Management */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Student Pair Parameters
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Changing these values updates the Home Dashboard greeting & hero banner instantly
          </Text>
        </View>

        <CustomCard style={styles.card} padding={SPACING.base}>
          {saveFeedback && (
            <View style={[styles.feedbackBanner, { backgroundColor: `${colors.success}20`, borderColor: colors.success }]}>
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text style={[styles.feedbackText, { color: colors.success }]}>
                Global state updated! Switch to the Home Tab to see changes live.
              </Text>
            </View>
          )}

          {/* Student 1 */}
          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
            Student 1 Full Name
          </Text>
          <TextInput
            value={student1}
            onChangeText={setStudent1}
            placeholder="Student 1 Name"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
            Student 1 ID
          </Text>
          <TextInput
            value={studentId1}
            onChangeText={setStudentId1}
            placeholder="e.g. 2023-10492"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          {/* Student 2 */}
          <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: SPACING.sm }]}>
            Student 2 Full Name
          </Text>
          <TextInput
            value={student2}
            onChangeText={setStudent2}
            placeholder="Student 2 Name"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
            Student 2 ID
          </Text>
          <TextInput
            value={studentId2}
            onChangeText={setStudentId2}
            placeholder="e.g. 2023-10884"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          {/* Section & Course */}
          <View style={styles.inputRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                Section
              </Text>
              <TextInput
                value={section}
                onChangeText={setSection}
                placeholder="Section"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.cardAlt,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
              />
            </View>

            <View style={{ flex: 1.5 }}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                Course
              </Text>
              <TextInput
                value={course}
                onChangeText={setCourse}
                placeholder="Course"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.cardAlt,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.actionButtonRow}>
            <CustomButton
              title="Save Changes"
              icon="save-outline"
              variant="primary"
              size="md"
              style={{ flex: 1 }}
              onPress={handleSaveProfile}
            />
            <CustomButton
              title="Reset"
              icon="refresh-outline"
              variant="outline"
              size="md"
              onPress={handleResetDefaults}
            />
          </View>
        </CustomCard>

        {/* Section 3: Live State Inspector */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Live State Inspector
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Direct Context API memory snapshot
          </Text>
        </View>

        <CustomCard style={styles.card} padding={SPACING.base}>
          <View style={[styles.codeBlock, { backgroundColor: colors.cardAlt }]}>
            <Text style={[styles.codeText, { color: colors.accent }]}>
              {JSON.stringify(
                {
                  themeMode,
                  activePair: `${profile.student1} & ${profile.student2}`,
                  section: profile.section,
                  course: profile.course,
                  completedLabs: `${stats.completed}/${stats.total} (${stats.percent}%)`,
                },
                null,
                2
              )}
            </Text>
          </View>
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
  infoBanner: {
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  infoBody: {
    fontSize: 12,
    lineHeight: 17,
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
  card: {
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingSublabel: {
    fontSize: 12,
  },
  themeSelectorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  themeChoiceCard: {
    flex: 1,
    padding: SPACING.base,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  themeChoiceText: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  activeIndicator: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: RADIUS.xs,
    marginTop: 6,
  },
  activeIndicatorText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  actionButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: SPACING.base,
  },
  codeBlock: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});
