import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CustomCard, CustomButton, StatusBadge } from '../components';
import { SPACING, RADIUS } from '../constants/theme';

export const LabDetailScreen = ({ route, navigation }) => {
  const { labId } = route.params || {};
  const { colors, isDark, labs, toggleLabStatus } = useApp();

  const lab = labs.find((l) => l.id === labId) || labs[0];

  // Local state for Interactive Demo Playground (demonstrating useState & useEffect)
  // 1. Counter Demo state
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  // 2. Timer Demo state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Demonstrate useEffect with timer interval & proper cleanup
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // 3. Dynamic Text Input Demo state
  const [inputText, setInputText] = useState('React Native rocks!');

  // 4. Checklist demo state
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Initialize project workspace', done: true },
    { id: 2, text: 'Create atomic UI components', done: true },
    { id: 3, text: 'Integrate global Context provider', done: true },
    { id: 4, text: 'Verify responsive flexbox layout', done: false },
    { id: 5, text: 'Record walkthrough demo video', done: false },
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const isCompleted = lab.status === 'Completed';

  const handleToggleStatus = () => {
    toggleLabStatus(lab.id);
  };

  // Render specific interactive playground demo based on lab's topic
  const renderInteractiveDemo = () => {
    if (lab.interactiveDemoType === 'timer') {
      return (
        <CustomCard style={styles.demoCard} padding={SPACING.base}>
          <View style={styles.demoHeader}>
            <View style={[styles.demoTag, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="stopwatch-outline" size={14} color={colors.primary} />
              <Text style={[styles.demoTagText, { color: colors.primary }]}>
                INTERACTIVE HOOKS: useEffect & useState
              </Text>
            </View>
            <Text style={[styles.demoSubtitle, { color: colors.textSecondary }]}>
              Stopwatch with lifecycle interval cleanup
            </Text>
          </View>

          <View style={[styles.timerDisplay, { backgroundColor: colors.cardAlt }]}>
            <Text style={[styles.timerNumbers, { color: colors.text }]}>
              {Math.floor(timerSeconds / 60)
                .toString()
                .padStart(2, '0')}
              :{(timerSeconds % 60).toString().padStart(2, '0')}
            </Text>
            <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>
              {isTimerRunning ? 'Interval Active' : 'Stopped'}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <CustomButton
              title={isTimerRunning ? 'Pause' : 'Start'}
              icon={isTimerRunning ? 'pause' : 'play'}
              variant={isTimerRunning ? 'secondary' : 'primary'}
              size="sm"
              style={{ flex: 1 }}
              onPress={() => setIsTimerRunning(!isTimerRunning)}
            />
            <CustomButton
              title="Reset"
              icon="refresh"
              variant="outline"
              size="sm"
              style={{ flex: 1 }}
              onPress={() => {
                setIsTimerRunning(false);
                setTimerSeconds(0);
              }}
            />
          </View>
        </CustomCard>
      );
    }

    if (lab.interactiveDemoType === 'counter') {
      return (
        <CustomCard style={styles.demoCard} padding={SPACING.base}>
          <View style={styles.demoHeader}>
            <View style={[styles.demoTag, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="calculator-outline" size={14} color={colors.primary} />
              <Text style={[styles.demoTagText, { color: colors.primary }]}>
                INTERACTIVE HOOKS: useState Reactivity
              </Text>
            </View>
            <Text style={[styles.demoSubtitle, { color: colors.textSecondary }]}>
              Counter with configurable step size
            </Text>
          </View>

          <View style={[styles.counterDisplay, { backgroundColor: colors.cardAlt }]}>
            <Text style={[styles.counterNumber, { color: colors.text }]}>
              {counter}
            </Text>
            <Text style={[styles.counterLabel, { color: colors.textSecondary }]}>
              Current Count (Step: {step})
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <CustomButton
              title={`-${step}`}
              icon="remove"
              variant="secondary"
              size="sm"
              style={{ flex: 1 }}
              onPress={() => setCounter((c) => c - step)}
            />
            <CustomButton
              title="Reset"
              icon="refresh"
              variant="outline"
              size="sm"
              style={{ flex: 1 }}
              onPress={() => setCounter(0)}
            />
            <CustomButton
              title={`+${step}`}
              icon="add"
              variant="primary"
              size="sm"
              style={{ flex: 1 }}
              onPress={() => setCounter((c) => c + step)}
            />
          </View>
        </CustomCard>
      );
    }

    if (lab.interactiveDemoType === 'greeting') {
      return (
        <CustomCard style={styles.demoCard} padding={SPACING.base}>
          <View style={styles.demoHeader}>
            <View style={[styles.demoTag, { backgroundColor: `${colors.primary}18` }]}>
              <Ionicons name="text-outline" size={14} color={colors.primary} />
              <Text style={[styles.demoTagText, { color: colors.primary }]}>
                INTERACTIVE HOOKS: Two-way Data Binding
              </Text>
            </View>
            <Text style={[styles.demoSubtitle, { color: colors.textSecondary }]}>
              Live text mirror and state reactivity
            </Text>
          </View>

          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type anything here..."
            placeholderTextColor={colors.textMuted}
            style={[
              styles.demoInput,
              {
                backgroundColor: colors.cardAlt,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />

          <View style={[styles.livePreviewBox, { backgroundColor: colors.cardAlt }]}>
            <Text style={[styles.previewLabel, { color: colors.textSecondary }]}>
              Live React Native Preview:
            </Text>
            <Text style={[styles.previewText, { color: colors.primary }]}>
              "{inputText || '(empty)'}"
            </Text>
            <Text style={[styles.charCount, { color: colors.textMuted }]}>
              Character count: {inputText.length}
            </Text>
          </View>
        </CustomCard>
      );
    }

    // Default to interactive checklist demo
    return (
      <CustomCard style={styles.demoCard} padding={SPACING.base}>
        <View style={styles.demoHeader}>
          <View style={[styles.demoTag, { backgroundColor: `${colors.primary}18` }]}>
            <Ionicons name="checkbox-outline" size={14} color={colors.primary} />
            <Text style={[styles.demoTagText, { color: colors.primary }]}>
              ACTIVITY CHECKLIST
            </Text>
          </View>
          <Text style={[styles.demoSubtitle, { color: colors.textSecondary }]}>
            Interactive milestone progress
          </Text>
        </View>

        {checklist.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => toggleChecklistItem(item.id)}
            style={[
              styles.checklistItem,
              { borderBottomColor: colors.borderLight },
            ]}
          >
            <Ionicons
              name={item.done ? 'checkbox' : 'square-outline'}
              size={20}
              color={item.done ? colors.success : colors.textMuted}
            />
            <Text
              style={[
                styles.checklistText,
                {
                  color: item.done ? colors.textSecondary : colors.text,
                  textDecorationLine: item.done ? 'line-through' : 'none',
                },
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </CustomCard>
    );
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

        {/* Interactive Playground Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Live Interactive Playground
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Demonstrating React Hooks in action
          </Text>
        </View>

        {renderInteractiveDemo()}

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
  demoCard: {
    marginBottom: SPACING.lg,
  },
  demoHeader: {
    marginBottom: SPACING.md,
  },
  demoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.sm,
    gap: 4,
    marginBottom: 4,
  },
  demoTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  demoSubtitle: {
    fontSize: 12,
  },
  timerDisplay: {
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  timerNumbers: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 2,
  },
  timerLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  counterDisplay: {
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  counterNumber: {
    fontSize: 40,
    fontWeight: '800',
  },
  counterLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  demoInput: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 14,
    marginBottom: SPACING.md,
  },
  livePreviewBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  previewText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  charCount: {
    fontSize: 11,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checklistText: {
    fontSize: 13,
    flex: 1,
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
