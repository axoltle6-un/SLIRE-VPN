import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Shield, Lock, Globe, AlertTriangle, Network, Fingerprint, Zap } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function ProtectionScreen() {
  const [switches, setSwitches] = useState({
    killSwitch: true,
    dnsLeak: true,
    ipv6Leak: true,
    webrtc: true,
    adBlocker: false,
    splitTunnel: false,
    autoConnect: true,
  });

  const toggle = (key: keyof typeof switches) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (icon: any, title: string, subtitle: string, key: keyof typeof switches) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch 
        value={switches[key]} 
        onValueChange={() => toggle(key)}
        trackColor={{ false: '#333', true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Protection</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionHeader}>CORE SECURITY</Text>
        {renderItem(<Shield color={colors.text} size={24} />, "Kill Switch", "Block internet if VPN drops", "killSwitch")}
        {renderItem(<Globe color={colors.text} size={24} />, "DNS Leak Protection", "Force requests through secure DNS", "dnsLeak")}
        {renderItem(<Network color={colors.text} size={24} />, "IPv6 Leak Protection", "Disable IPv6 routing externally", "ipv6Leak")}
        {renderItem(<Fingerprint color={colors.text} size={24} />, "WebRTC Protection", "Prevent browser IP discovery", "webrtc")}

        <Text style={styles.sectionHeader}>THREAT PROTECTION</Text>
        {renderItem(<AlertTriangle color={colors.text} size={24} />, "Malware & Ad Blocker", "Filter malicious domains via DNS", "adBlocker")}

        <Text style={styles.sectionHeader}>ADVANCED ROUTING</Text>
        {renderItem(<Lock color={colors.text} size={24} />, "Split Tunneling", "Choose which apps use the VPN", "splitTunnel")}
        {renderItem(<Zap color={colors.text} size={24} />, "Auto-Connect", "Connect on untrusted networks", "autoConnect")}
        <View style={{height: 40}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: { color: colors.text, fontSize: 32, fontWeight: '800' },
  scroll: { paddingHorizontal: 20 },
  sectionHeader: { color: colors.textGray, fontSize: 13, fontWeight: '700', marginTop: 24, marginBottom: 12, letterSpacing: 1 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  title: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  subtitle: { color: colors.textGray, fontSize: 13, paddingRight: 10 }
});
