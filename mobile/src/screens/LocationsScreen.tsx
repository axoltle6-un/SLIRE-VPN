import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ChevronLeft, Signal, Search, XCircle } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useVpnStore } from '../store/useVpnStore';
import { useNavigation } from '@react-navigation/native';

export default function LocationsScreen() {
  const { servers, selectedServer, setServer } = useVpnStore();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (server: any) => {
    setServer(server);
    navigation.goBack();
  };

  // Filter massive list of 40+ countries
  const filteredServers = servers.filter(s => 
    s.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Signal color={item.ping < 100 ? colors.success : item.ping < 180 ? colors.warning : colors.error} size={16} />
          <Text style={styles.ping}>{item.ping}ms</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={colors.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>All Locations</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color={colors.textGray} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search countries or cities..."
              placeholderTextColor={colors.textGray}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <XCircle color={colors.textGray} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={filteredServers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No servers found for "{searchQuery}"</Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  backButton: { padding: 8, marginLeft: -8 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  searchContainer: { paddingHorizontal: 20, paddingBottom: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 16, height: 48 },
  searchInput: { flex: 1, color: colors.text, fontSize: 16, marginLeft: 10, height: '100%' },
  list: { padding: 20, paddingTop: 10 },
  serverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 16, borderRadius: 16, marginBottom: 12 },
  serverCardActive: { borderColor: colors.primary, borderWidth: 1, backgroundColor: 'rgba(0,217,126,0.05)' },
  flag: { fontSize: 24, marginRight: 16 },
  serverInfo: { flex: 1 },
  city: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 4 },
  country: { color: colors.textGray, fontSize: 13 },
  metrics: { alignItems: 'flex-end' },
  ping: { color: colors.textGray, fontSize: 12, marginTop: 4 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { color: colors.textGray, fontSize: 16 }
});
