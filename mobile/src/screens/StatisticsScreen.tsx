import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Activity, Download, Upload, Clock, BarChart2 } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function StatisticsScreen() {
  const StatCard = ({ icon, label, value, sub }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.grid}>
          <StatCard 
            icon={<Download color={colors.accent} size={20} />} 
            label="Data Downloaded" 
            value="14.2 GB" 
            sub="This Month" 
          />
          <StatCard 
            icon={<Upload color={colors.primary} size={20} />} 
            label="Data Uploaded" 
            value="3.8 GB" 
            sub="This Month" 
          />
        </View>

        <View style={styles.grid}>
          <StatCard 
            icon={<Clock color={colors.warning} size={20} />} 
            label="Time Protected" 
            value="112 hrs" 
            sub="Active Session: 2h 14m" 
          />
          <StatCard 
            icon={<Activity color={colors.error} size={20} />} 
            label="Connections" 
            value="48" 
            sub="Most Used: New York" 
          />
        </View>

        <View style={styles.chartCard}>
          <View style={styles.cardHeader}>
            <BarChart2 color={colors.text} size={20} />
            <Text style={styles.cardLabel}>Network Activity (Last 7 Days)</Text>
          </View>
          <View style={styles.chartPlaceholder}>
            {/* Mocking a Bar Chart visually */}
            {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={[styles.bar, { height: `${h}%` }]} />
                <Text style={styles.barDay}>{['M','T','W','T','F','S','S'][i]}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: { color: colors.text, fontSize: 32, fontWeight: '800' },
  scroll: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 16, width: '48%' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardLabel: { color: colors.textGray, fontSize: 14, fontWeight: '600', marginLeft: 8 },
  cardValue: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 4 },
  cardSub: { color: colors.textGray, fontSize: 12 },
  chartCard: { backgroundColor: colors.card, borderRadius: 20, padding: 20, marginTop: 4 },
  chartPlaceholder: { height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20, paddingTop: 20 },
  barColumn: { alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: 30 },
  bar: { width: 12, backgroundColor: colors.primary, borderRadius: 6, marginBottom: 8 },
  barDay: { color: colors.textGray, fontSize: 12, fontWeight: '600' }
});
