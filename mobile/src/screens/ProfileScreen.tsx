import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { User, Crown, CreditCard, ShieldCheck, HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const RowItem = ({ icon, title, subtitle, onPress, isDanger }: any) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={[styles.iconBox, isDanger && { backgroundColor: 'rgba(255,77,77,0.1)' }]}>
        {icon}
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowTitle, isDanger && { color: colors.error }]}>{title}</Text>
        {subtitle && <Text style={styles.rowSub}>{subtitle}</Text>}
      </View>
      {!isDanger && <ChevronRight color={colors.textGray} size={20} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')}>
             <Settings color={colors.text} size={26} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User color={colors.text} size={40} />
          </View>
          <Text style={styles.name}>Premium User</Text>
          <Text style={styles.email}>user@slirevpn.com</Text>
          
          <View style={styles.badge}>
            <Crown color="#000" size={16} />
            <Text style={styles.badgeText}>SLIRE+ Active</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
        <View style={styles.card}>
          <RowItem icon={<CreditCard color={colors.text} size={22}/>} title="Manage Plan" subtitle="Renews Oct 12, 2027" onPress={() => navigation.navigate('Subscription')} />
          <View style={styles.divider} />
          <RowItem icon={<ShieldCheck color={colors.text} size={22}/>} title="Devices" subtitle="2/5 Connected" />
        </View>

        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.card}>
          <RowItem icon={<HelpCircle color={colors.text} size={22}/>} title="Help Center" subtitle="FAQs & Live Chat" />
        </View>

        <View style={{marginTop: 20}}>
          <RowItem icon={<LogOut color={colors.error} size={22}/>} title="Sign Out" isDanger />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: colors.text, fontSize: 32, fontWeight: '800' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  profileCard: { alignItems: 'center', backgroundColor: colors.card, padding: 30, borderRadius: 24, marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  email: { color: colors.textGray, fontSize: 14, marginBottom: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  badgeText: { color: '#000', fontWeight: '800', marginLeft: 6, fontSize: 13 },
  sectionTitle: { color: colors.textGray, fontSize: 13, fontWeight: '700', marginBottom: 12, marginLeft: 8, letterSpacing: 1 },
  card: { backgroundColor: colors.card, borderRadius: 20, paddingHorizontal: 16, marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  rowText: { flex: 1 },
  rowTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  rowSub: { color: colors.textGray, fontSize: 13, marginTop: 4 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginLeft: 56 }
});
