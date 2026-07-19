import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function SubscriptionScreen() {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const features = [
    "Secure & Encrypted Connections",
    "100+ Global Server Locations",
    "Strict No-Logs Policy",
    "Connect up to 5 devices",
    "Malware & Ad Blocker built-in",
    "24/7 Customer Support"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Unlock SLIRE+</Text>
        <Text style={styles.subtitle}>Get absolute privacy and unlimited bandwidth.</Text>

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
          onPress={() => setSelectedPlan('monthly')}
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
          onPress={() => setSelectedPlan('yearly')}
        >
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
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Subscribe via Apple Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20 },
  backButton: { padding: 8, marginLeft: -8, width: 44 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 36, fontWeight: '800', marginBottom: 12 },
  subtitle: { color: colors.textGray, fontSize: 16, marginBottom: 32 },
  features: { marginBottom: 32 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  featureText: { color: colors.text, fontSize: 15, marginLeft: 12, fontWeight: '500' },
  planCard: { backgroundColor: colors.card, borderRadius: 20, padding: 20, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: 'transparent' },
  planCardActive: { borderColor: colors.primary, backgroundColor: 'rgba(0,217,126,0.05)' },
  saveBadge: { position: 'absolute', top: -12, right: 20, backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  saveText: { color: '#000', fontSize: 11, fontWeight: '800' },
  planTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 6 },
  planPrice: { color: colors.text, fontSize: 24, fontWeight: '800' },
  planBilled: { color: colors.textGray, fontSize: 13, marginTop: 4 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  radioActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  footer: { padding: 24, backgroundColor: colors.background },
  payButton: { backgroundColor: colors.text, borderRadius: 16, padding: 18, alignItems: 'center' },
  payButtonText: { color: '#000', fontSize: 16, fontWeight: '700' }
});
