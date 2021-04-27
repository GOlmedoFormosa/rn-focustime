import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETED: 1,
  CENCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [focusHistory, setFocusHistory] = useState([]);
  const addFocusHistorySubjectWithStatus = (focusSubject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject: focusSubject, status }]);
  };
  const handleClearFocusHistory = () => setFocusHistory([]);
  const handleSaveFocusHistory = () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const handleLoadFocusHistory = () => {
    try {
      const history = AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => handleLoadFocusHistory(), []);
  useEffect(() => handleSaveFocusHistory(), [focusHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject('');
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CENCELLED);
            setFocusSubject('');
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={handleClearFocusHistory}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
