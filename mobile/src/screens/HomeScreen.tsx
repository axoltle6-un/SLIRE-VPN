import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import { Shield, MapPin, Activity } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { useVpnStore } from '../store/useVpnStore';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { isConnected, isConnecting, selectedServer, toggleConnection, connectionStats, fetchServers } = useVpnStore();
  const navigation = useNavigation<any>();

  // 120 FPS capable smooth loop animation for connecting state
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const statsSlideAnim = useRef(new Animated.Value(50)).current;
  const statsOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchServers();
  }, []);

  useEffect(() => {
    if (isConnecting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
        ])
      ).start();
      
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.linear })
      ).start();

      // Hide stats
      Animated.parallel([
        Animated.timing(statsSlideAnim, { toValue: 50, duration: 300, useNativeDriver: true }),
        Animated.timing(statsOpacityAnim, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();

    } else if (isConnected) {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
      Animated.spring(pulseAnim, { toValue: 1.05, friction: 4, tension: 5, useNativeDriver: true }).start();

      // Show stats with a smooth slide up
      Animated.parallel([
        Animated.spring(statsSlideAnim, { toValue: 0, friction: 6, tension: 40, useNativeDriver: true }),
        Animated.timing(statsOpacityAnim, { toValue: 1, duration: 400, useNativeDriver: true })
      ]).start();

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
      
      Animated.parallel([
        Animated.timing(statsSlideAnim, { toValue: 50, duration: 300, useNativeDriver: true }),
        Animated.timing(statsOpacityAnim, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [isConnecting, isConnected]);

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleConnection();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const getStatusText = () => {
    if (isConnecting) return 'Connecting...';
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
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>SLIRE VPN</Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>{getStatusText()}</Text>
        </View>
      </View>

      {/* Main Connect Area */}
      <View style={styles.centerArea}>
        {isConnected ? (
           <Animated.View style={[styles.glowRingWrapper, { transform: [{ scale: pulseAnim }] }]}>
             <LinearGradient colors={['rgba(0, 217, 126, 0.4)', 'rgba(0, 217, 126, 0.0)']} style={styles.glowRingActive} />
           </Animated.View>
        ) : isConnecting ? (
           <Animated.View style={[styles.glowRingWrapper, { transform: [{ scale: pulseAnim }] }]}>
             <LinearGradient colors={['rgba(255, 193, 7, 0.3)', 'rgba(255, 193, 7, 0.0)']} style={styles.glowRingActive} />
           </Animated.View>
        ) : null}

        <TouchableOpacity 
          style={[styles.connectButton, isConnected && styles.connectButtonActive]} 
          onPress={handleToggle}
          activeOpacity={0.85}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Shield color={colors.warning} size={64} strokeWidth={1.5} />
            </Animated.View>
          ) : (
            <Shield color={isConnected ? colors.primary : colors.textGray} size={64} strokeWidth={1.5} />
          )}
        </TouchableOpacity>
      </View>

      {/* Selected Location Card */}
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          navigation.navigate('Locations');
        }}
      >
        <BlurView intensity={20} tint="dark" style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <MapPin color={colors.text} size={20} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>{selectedServer.city}, {selectedServer.country}</Text>
            <Text style={styles.locationSubtitle}>Latency: {selectedServer.ping}ms • {selectedServer.flag}</Text>
          </View>
          <Text style={styles.changeText}>Change</Text>
        </BlurView>
      </TouchableOpacity>

      {/* Dynamic Connection Stats Area */}
      <View style={styles.statsContainer}>
        <Animated.View style={{ 
          opacity: statsOpacityAnim, 
          transform: [{ translateY: statsSlideAnim }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: isConnected ? 1 : -1
        }}>
          {connectionStats && (
            <BlurView intensity={30} tint="dark" style={styles.statsCard}>
              <View style={styles.statRow}>
                <Activity color={colors.primary} size={18} />
                <Text style={styles.statLabel}>Protocol</Text>
                <Text style={styles.statValue}>{connectionStats.protocol}</Text>
              </View>
              <View style={styles.statRow}>
                <Shield color={colors.primary} size={18} />
                <Text style={styles.statLabel}>Tunnel IP</Text>
                <Text style={styles.statValue}>{connectionStats.clientIp}</Text>
              </View>
            </BlurView>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingTop: 10 },
  brand: { color: colors.text, fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  status: { fontSize: 16, marginTop: 4, fontWeight: '700' },
  centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glowRingWrapper: { position: 'absolute', width: 320, height: 320, borderRadius: 160, justifyContent: 'center', alignItems: 'center' },
  glowRingActive: { width: '100%', height: '100%', borderRadius: 160 },
  connectButton: { width: 180, height: 180, borderRadius: 90, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, shadowRadius: 30, elevation: 15, zIndex: 10 },
  connectButtonActive: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 25 },
  locationCard: { marginHorizontal: 24, marginBottom: 16, backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  locationIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  locationInfo: { flex: 1 },
  locationTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 4 },
  locationSubtitle: { color: colors.textGray, fontSize: 13, fontWeight: '500' },
  changeText: { color: colors.accent, fontWeight: '700' },
  statsContainer: { height: 100, marginHorizontal: 24, marginBottom: 20, justifyContent: 'flex-end' },
  statsCard: { backgroundColor: 'rgba(20,20,20,0.6)', borderRadius: 24, padding: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(0, 217, 126, 0.2)' },
  statRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  statLabel: { color: colors.textGray, marginLeft: 12, flex: 1, fontSize: 15, fontWeight: '600' },
  statValue: { color: colors.text, fontWeight: '700', fontSize: 15 },
});
