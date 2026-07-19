import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft, Signal } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useVpnStore } from '../store/useVpnStore';
import { useNavigation } from '@react-navigation/native';

export default function LocationsScreen() {
  const { servers, selectedServer, setServer } = useVpnStore();
  const navigation = useNavigation();

  const handleSelect = (server: any) => {
    setServer(server);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedServer.id === item.id;
    return (
      <TouchableOpacity 
        style={[styles.serverCard, isSelected && styles.serverCardActive]}
        onPress={() => handleSelect(item)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.serverInfo}>
          <Text style={styles.city}>{item.city}</Text>
          <Text style={styles.country}>{item.country}</Text>
        </View>
        <View style={styles.metrics}>
          <Signal color={item.ping < 100 ? colors.success : colors.warning} size={16} />
          <Text style={styles.ping}>{item.ping}ms</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Locations</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={servers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  backButton: { padding: 8 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  list: { padding: 20 },
  serverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 16, borderRadius: 16, marginBottom: 12 },
  serverCardActive: { borderColor: colors.primary, borderWidth: 1, backgroundColor: 'rgba(0,217,126,0.05)' },
  flag: { fontSize: 24, marginRight: 16 },
  serverInfo: { flex: 1 },
  city: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  country: { color: colors.textGray, fontSize: 13 },
  metrics: { alignItems: 'flex-end' },
  ping: { color: colors.textGray, fontSize: 12, marginTop: 4 }
});
