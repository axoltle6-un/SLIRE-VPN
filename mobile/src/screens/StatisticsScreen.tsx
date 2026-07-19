import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { Activity, Download, Upload, Clock, BarChart2 } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';

export default function StatisticsScreen() {
  // Mock data heights
  const chartData = [40, 70, 45, 90, 60, 100, 30];
  const barAnims = useRef(chartData.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Staggered bar chart animation on mount
    const animations = barAnims.map((anim, index) => 
      Animated.spring(anim, {
        toValue: chartData[index],
        friction: 6,
        tension: 40,
        useNativeDriver: false // Height animation doesn't support native driver
      })
    );

    Animated.stagger(50, animations).start();
  }, []);

  const StatCard = ({ icon, label, value, sub }: any) => (
    <BlurView intensity={20} tint="dark" style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </BlurView>
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
            label="Data Download" 
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
            label="Protected" 
            value="112 hrs" 
            sub="Active: 2h 14m" 
          />
          <StatCard 
            icon={<Activity color={colors.error} size={20} />} 
            label="Connections" 
            value="48" 
            sub="Most: New York" 
          />
        </View>

        <BlurView intensity={20} tint="dark" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <BarChart2 color={colors.text} size={20} />
            <Text style={styles.chartLabel}>Network Activity (Last 7 Days)</Text>
          </View>
          <View style={styles.chartPlaceholder}>
            {chartData.map((_, i) => (
              <View key={i} style={styles.barColumn}>
                <Animated.View style={[
                  styles.bar, 
                  { height: barAnims[i].interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }
                ]} />
                <Text style={styles.barDay}>{['M','T','W','T','F','S','S'][i]}</Text>
              </View>
            ))}
          </View>
        </BlurView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: { color: colors.text, fontSize: 32, fontWeight: '900' },
  scroll: { paddingHorizontal: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 24, padding: 20, width: '48%', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardLabel: { color: colors.textGray, fontSize: 13, fontWeight: '700', marginLeft: 8 },
  cardValue: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: 4 },
  cardSub: { color: colors.textGray, fontSize: 12, fontWeight: '500' },
  chartCard: { backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 24, padding: 24, marginTop: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  chartHeader: { flexDirection: 'row', alignItems: 'center' },
  chartLabel: { color: colors.textGray, fontSize: 14, fontWeight: '700', marginLeft: 8 },
  chartPlaceholder: { height: 180, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 24, paddingTop: 20 },
  barColumn: { alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: 30 },
  bar: { width: 14, backgroundColor: colors.primary, borderRadius: 7, marginBottom: 12 },
  barDay: { color: colors.textGray, fontSize: 12, fontWeight: '700' }
});
