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
import { SPACING, RADIUS } from '../constants/theme';

export const LabsScreen = ({ navigation }) => {
  const { colors, labs, stats } = useApp();

  // Local state for interactive search & category filter (useState)
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

  const renderHeader = () => (
    <View style={styles.headerArea}>
      <View style={styles.titleSection}>
        <Text style={[styles.mainHeading, { color: colors.text }]}>
          Laboratory Directory
        </Text>
        <Text style={[styles.mainSubheading, { color: colors.textSecondary }]}>
          Master compilation for future laboratory submissions
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
          Showing {filteredLabs.length} of {labs.length} activities
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
  );

  const renderEmptyList = () => (
    <CustomCard style={styles.emptyContainer} padding={SPACING.xl}>
      <Ionicons name="search-outline" size={48} color={colors.textMuted} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No activities found</Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No activities match your search "{searchQuery}" or category filter. Try searching for a different keyword like "Props", "Hooks", or "Navigation".
      </Text>
    </CustomCard>
  );

  const renderFooter = () => (
    <CustomCard
      style={{
        marginTop: SPACING.md,
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.cardAlt,
      }}
      padding={SPACING.base}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: RADIUS.md,
            backgroundColor: `${colors.primary}15`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="folder-outline" size={22} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 }}>
            Future Laboratory Activities
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 17, color: colors.textSecondary }}>
            Future laboratory activities will appear here once assigned by the instructor.
          </Text>
        </View>
      </View>
    </CustomCard>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <FlatList
        data={filteredLabs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <LabCard
            lab={item}
            onPress={() => navigation.navigate('LabDetail', { labId: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxl,
  },
  headerArea: {
    marginBottom: SPACING.sm,
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
    marginBottom: SPACING.sm,
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
