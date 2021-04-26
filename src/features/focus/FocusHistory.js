import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';

// components
import { RoundedButton } from '../../components/RoundedButton';
// utils
import { fontSizes, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => (
  <Text
    style={
      Platform.OS === 'web'
        ? StyleSheet.flatten(styles.historyItem)(item.status)
        : styles.historyItem(item.status)
    }>
    {item.subject}
  </Text>
);

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => onClear();
  console.log('platform', Platform.OS);
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={clearHistory} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
