import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DaySelector({ selectedDay, setSelectedDay }) {
  const days = [
    { label: 'Segunda', value: 'segunda' },
    { label: 'Terça', value: 'terca' },
    { label: 'Quarta', value: 'quarta' },
    { label: 'Quinta', value: 'quinta' },
    { label: 'Sexta', value: 'sexta' },
    { label: 'Sábado', value: 'sabado' },
    { label: 'Domingo', value: 'domingo' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === day.value && styles.selectedButton,
            ]}
            onPress={() => setSelectedDay(day.value)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day.value && styles.selectedText,
              ]}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 15,
  },
  dayButton: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#444',
  },
  selectedButton: {
    backgroundColor: '#7B2CBF',
    borderColor: '#00BFA6',
    shadowColor: '#7B2CBF',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  dayText: {
    color: '#E0E0E0',
    fontWeight: '600',
    fontSize: 15,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
