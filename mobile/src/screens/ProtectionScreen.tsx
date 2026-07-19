import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity, Animated } from 'react-native';
import { Shield, Lock, Globe, AlertTriangle, Network, Fingerprint, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
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
    Haptics.selectionAsync();
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (icon: any, title: string, subtitle: string, key: keyof typeof switches) => (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => toggle(key)}
      style={styles.cardWrapper}
    >
      <BlurView intensity={20} tint="dark" style={styles.card}>
        <View style={[styles.iconContainer, switches[key] && styles.iconContainerActive]}>
          {React.cloneElement(icon, { color: switches[key] ? colors.primary : colors.text })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Switch 
          value={switches[key]} 
          onValueChange={() => toggle(key)}
          trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.primary }}
          thumbColor="#fff"
        />
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Protection</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>CORE SECURITY</Text>
        {renderItem(<Shield size={24} />, "Kill Switch", "Block internet if VPN drops", "killSwitch")}
        {renderItem(<Globe size={24} />, "DNS Leak Protection", "Force requests via secure DNS", "dnsLeak")}
        {renderItem(<Network size={24} />, "IPv6 Leak Protection", "Disable external IPv6 routing", "ipv6Leak")}
        {renderItem(<Fingerprint size={24} />, "WebRTC Protection", "Prevent browser IP discovery", "webrtc")}

        <Text style={styles.sectionHeader}>THREAT PROTECTION</Text>
        {renderItem(<AlertTriangle size={24} />, "Malware & Ad Blocker", "Filter malicious domains via DNS", "adBlocker")}

        <Text style={styles.sectionHeader}>ADVANCED ROUTING</Text>
        {renderItem(<Lock size={24} />, "Split Tunneling", "Choose which apps use the VPN", "splitTunnel")}
        {renderItem(<Zap size={24} />, "Auto-Connect", "Connect on untrusted networks", "autoConnect")}
        <View style={{height: 40}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 10 },
  headerTitle: { color: colors.text, fontSize: 32, fontWeight: '900' },
  scroll: { paddingHorizontal: 20 },
  sectionHeader: { color: colors.textGray, fontSize: 13, fontWeight: '800', marginTop: 24, marginBottom: 16, letterSpacing: 1.5 },
  cardWrapper: { marginBottom: 12 },
  card: { backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconContainer: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconContainerActive: { backgroundColor: 'rgba(0, 217, 126, 0.1)' },
  textContainer: { flex: 1, paddingRight: 10 },
  title: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: colors.textGray, fontSize: 13, fontWeight: '500' }
});
