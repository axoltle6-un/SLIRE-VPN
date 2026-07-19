import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [protocol, setProtocol] = useState('WireGuard');

  const protocols = [
    { id: 'WireGuard', desc: 'Fastest, Modern, Battery Efficient' },
    { id: 'OpenVPN UDP', desc: 'Fast, Reliable, Standard' },
    { id: 'OpenVPN TCP', desc: 'Slower, Bypasses strict firewalls' },
    { id: 'IKEv2', desc: 'Fast, good for mobile networks' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.sectionTitle}>VPN PROTOCOL</Text>
        <View style={styles.card}>
          {protocols.map((p, i) => (
            <View key={p.id}>
              <TouchableOpacity style={styles.row} onPress={() => setProtocol(p.id)}>
                <View style={styles.textContainer}>
                  <Text style={styles.rowTitle}>{p.id}</Text>
                  <Text style={styles.rowSub}>{p.desc}</Text>
                </View>
                <View style={styles.radio}>
                  {protocol === p.id && <View style={styles.radioActive} />}
                </View>
              </TouchableOpacity>
              {i < protocols.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>APPEARANCE</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowTitle}>Theme</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.rowSub}>Dark </Text>
              <ChevronLeft color={colors.textGray} size={16} style={{transform: [{rotate: '180deg'}]}} />
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8, marginLeft: -8 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  scroll: { paddingHorizontal: 20 },
  sectionTitle: { color: colors.textGray, fontSize: 13, fontWeight: '700', marginBottom: 12, marginLeft: 8, marginTop: 10, letterSpacing: 1 },
  card: { backgroundColor: colors.card, borderRadius: 20, paddingHorizontal: 16, marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, justifyContent: 'space-between' },
  textContainer: { flex: 1, paddingRight: 20 },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  rowSub: { color: colors.textGray, fontSize: 13 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  radioActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }
});
