import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const [status, setStatus] = useState('Disconnected');

  const toggleConnection = () => {
    if (status === 'Disconnected') {
      setStatus('Connecting...');
      setTimeout(() => setStatus('Connected'), 1500);
    } else {
      setStatus('Disconnected');
    }
  };

  const isConnected = status === 'Connected';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>SLIRE VPN</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      <View style={styles.connectContainer}>
        <TouchableOpacity 
          style={[styles.connectButton, isConnected && styles.connectButtonActive]} 
          onPress={toggleConnection}
        >
          <Text style={styles.connectText}>
            {isConnected ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>

      {isConnected && (
        <View style={styles.statsCard}>
          <Text style={styles.statsText}>IP: 198.51.100.24</Text>
          <Text style={styles.statsText}>Server: New York, USA</Text>
          <Text style={styles.statsText}>Protocol: WireGuard</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  brand: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    color: colors.textGray,
    fontSize: 16,
    marginTop: 5,
  },
  connectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  connectButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.textGray,
  },
  connectButtonActive: {
    backgroundColor: 'rgba(0, 217, 126, 0.2)',
    borderColor: colors.primary,
  },
  connectText: {
    color: colors.text,
    fontSize: 48,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  statsText: {
    color: colors.textGray,
    fontSize: 16,
    marginBottom: 10,
  }
});
