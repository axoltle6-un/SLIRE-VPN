import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function SubscriptionScreen() {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handleSelect = (plan: string) => {
    Haptics.selectionAsync();
    setSelectedPlan(plan);
  };

  const features = [
    "Military-grade AES-256 Encryption",
    "100+ Global Server Locations",
    "Strict No-Logs Policy",
    "Connect up to 5 devices simultaneously",
    "Malware & Ad Blocker built-in",
    "24/7 Priority Customer Support"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.text} size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient 
          colors={['rgba(0, 217, 126, 0.15)', 'transparent']} 
          style={styles.gradientBg} 
        />
        
        <Text style={styles.title}>Unlock SLIRE+</Text>
        <Text style={styles.subtitle}>Get absolute privacy and lightning fast unlimited bandwidth worldwide.</Text>

        <View style={styles.features}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <CheckCircle2 color={colors.primary} size={20} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardActive]}
          onPress={() => handleSelect('monthly')}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.planTitle}>1 Month</Text>
            <Text style={styles.planPrice}>$11.99 / mo</Text>
          </View>
          <View style={styles.radio}>
            {selectedPlan === 'monthly' && <View style={styles.radioActive} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardActive]}
          onPress={() => handleSelect('yearly')}
          activeOpacity={0.8}
        >
          {selectedPlan === 'yearly' && (
            <LinearGradient colors={['rgba(0, 217, 126, 0.1)', 'transparent']} style={StyleSheet.absoluteFill} borderRadius={20} />
          )}
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>SAVE 49%</Text>
          </View>
          <View>
            <Text style={styles.planTitle}>12 Months</Text>
            <Text style={styles.planPrice}>$5.99 / mo</Text>
            <Text style={styles.planBilled}>Billed $71.88 yearly</Text>
          </View>
          <View style={styles.radio}>
            {selectedPlan === 'yearly' && <View style={styles.radioActive} />}
          </View>
        </TouchableOpacity>

      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} activeOpacity={0.8}>
          <LinearGradient colors={['#fff', '#e6e6e6']} style={styles.payButtonGradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
            <Text style={styles.payButtonText}>Subscribe via Apple Pay</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, zIndex: 10 },
  backButton: { padding: 8, marginLeft: -8, width: 46 },
  gradientBg: { position: 'absolute', top: -100, left: 0, right: 0, height: 300 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 40, fontWeight: '900', marginBottom: 12, letterSpacing: -0.5 },
  subtitle: { color: colors.textGray, fontSize: 16, marginBottom: 36, lineHeight: 24, fontWeight: '500' },
  features: { marginBottom: 36 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  featureText: { color: colors.text, fontSize: 15, marginLeft: 16, fontWeight: '600' },
  planCard: { backgroundColor: colors.card, borderRadius: 24, padding: 24, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: 'transparent' },
  planCardActive: { borderColor: colors.primary, backgroundColor: colors.card },
  saveBadge: { position: 'absolute', top: -14, right: 24, backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, shadowColor: colors.primary, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 8, elevation: 5 },
  saveText: { color: '#000', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  planTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 6 },
  planPrice: { color: colors.text, fontSize: 26, fontWeight: '900' },
  planBilled: { color: colors.textGray, fontSize: 13, marginTop: 6, fontWeight: '600' },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  radioActive: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.primary },
  footer: { padding: 24, backgroundColor: colors.background, paddingBottom: 34 },
  payButton: { borderRadius: 20, overflow: 'hidden' },
  payButtonGradient: { padding: 20, alignItems: 'center' },
  payButtonText: { color: '#000', fontSize: 17, fontWeight: '800' }
});
