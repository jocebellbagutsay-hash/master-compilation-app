import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { SearchBar, LabCard, CustomCard } from '../components';
import { SPACING } from '../constants/theme';

export const LabsScreen = ({ navigation }) => {
  const { colors, labs } = useApp();

  // Local state for interactive search & category filter (useState hook)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchesCategory =
        selectedCategory === 'All' || lab.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        lab.title.toLowerCase().includes(query) ||
        lab.labNumber.toLowerCase().includes(query) ||
        lab.description.toLowerCase().includes(query) ||
        lab.conceptsCovered.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [labs, searchQuery, selectedCategory]);

  const renderEmptyList = () => (
    <CustomCard style={styles.emptyContainer} padding={SPACING.xl}>
      <Ionicons name="search-outline" size={48} color={colors.textMuted} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No activities found</Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No activities match your search "{searchQuery}".
      </Text>
    </CustomCard>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {/* SearchBar placed permanently in header to retain focus across re-renders */}
      <View style={styles.headerArea}>
        <View style={styles.titleSection}>
          <Text style={[styles.mainHeading, { color: colors.text }]}>
            Activities Directory
          </Text>
        </View>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={['All', 'Activity 1']}
        />

        <View style={styles.resultsInfoRow}>
          <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
            Showing {filteredLabs.length} of {labs.length} activity
          </Text>
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={[styles.clearSearchLink, { color: colors.primary }]}>
                Clear Filter
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredLabs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <LabCard
            lab={item}
            onPress={() => navigation.navigate('LabDetail', { labId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerArea: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xs,
  },
  listContent: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xxl,
  },
  titleSection: {
    marginBottom: SPACING.base,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  mainSubheading: {
    fontSize: 13,
    marginTop: 2,
  },
  resultsInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    paddingHorizontal: 2,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '500',
  },
  clearSearchLink: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    marginTop: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
