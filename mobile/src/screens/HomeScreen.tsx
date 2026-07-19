import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Shield, MapPin, Activity, Settings2 } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useVpnStore } from '../store/useVpnStore';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { isConnected, isConnecting, selectedServer, toggleConnection, connectionStats, fetchServers } = useVpnStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchServers();
  }, []);

  const getStatusText = () => {
    if (isConnecting) return 'Negotiating Tunnel...';
    if (isConnected) return 'Protected';
    return 'Not Connected';
  };

  const getStatusColor = () => {
    if (isConnecting) return colors.warning;
    if (isConnected) return colors.success;
    return colors.textGray;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>SLIRE VPN</Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>{getStatusText()}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Settings2 color={colors.text} size={24} />
        </TouchableOpacity>
      </View>

      {/* Main Connect Button Area */}
      <View style={styles.centerArea}>
        <View style={[styles.glowRing, isConnected && styles.glowRingActive]}>
          <TouchableOpacity 
            style={[styles.connectButton, isConnected && styles.connectButtonActive]} 
            onPress={toggleConnection}
            activeOpacity={0.8}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <ActivityIndicator size="large" color={colors.text} />
            ) : (
              <Shield color={isConnected ? colors.primary : colors.textGray} size={64} strokeWidth={1.5} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Location Card */}
      <TouchableOpacity 
        style={styles.locationCard} 
        onPress={() => navigation.navigate('Locations')}
        activeOpacity={0.7}
      >
        <View style={styles.locationIcon}>
          <MapPin color={colors.text} size={20} />
        </View>
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>{selectedServer.city}, {selectedServer.country}</Text>
          <Text style={styles.locationSubtitle}>Latency: {selectedServer.ping}ms • {selectedServer.flag}</Text>
        </View>
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>

      {/* Stats Area */}
      {isConnected && connectionStats && (
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <Activity color={colors.primary} size={18} />
            <Text style={styles.statLabel}>Protocol</Text>
            <Text style={styles.statValue}>WireGuard</Text>
          </View>
          <View style={styles.statRow}>
            <Shield color={colors.primary} size={18} />
            <Text style={styles.statLabel}>Tunnel IP</Text>
            <Text style={styles.statValue}>{connectionStats.clientIp}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, marginTop: 10 },
  brand: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: 1 },
  status: { fontSize: 16, marginTop: 4, fontWeight: '600' },
  iconButton: { padding: 8, backgroundColor: colors.card, borderRadius: 12 },
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glowRing: { width: 260, height: 260, borderRadius: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  glowRingActive: { backgroundColor: 'rgba(0, 217, 126, 0.05)' },
  connectButton: { width: 200, height: 200, borderRadius: 100, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  connectButtonActive: { backgroundColor: 'rgba(0, 217, 126, 0.1)', borderWidth: 2, borderColor: colors.primary },
  locationCard: { marginHorizontal: 24, marginBottom: 24, backgroundColor: colors.card, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center' },
  locationIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  locationInfo: { flex: 1 },
  locationTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  locationSubtitle: { color: colors.textGray, fontSize: 13 },
  changeText: { color: colors.accent, fontWeight: '600' },
  statsCard: { marginHorizontal: 24, marginBottom: 40, backgroundColor: colors.card, borderRadius: 20, padding: 20 },
  statRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  statLabel: { color: colors.textGray, marginLeft: 12, flex: 1, fontSize: 15 },
  statValue: { color: colors.text, fontWeight: '600', fontSize: 15 },
});
