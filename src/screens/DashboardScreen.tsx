import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Modal } from 'react-native';
import { fetchWallet } from '../api/walletApi';
import type { SavingsWallet } from '../types/Wallet';
import SavingsAccountCard from '../components/SavingsAccountCard';
import SavingsDepositCard from '../components/SavingsDepositCard';
import TotalBalance from '../components/TotalBalance';
import AddAccountModal from './AddAccountModal';
import AddDepositModal from './AddDepositModal';

type Props = {
    token: string;
};

export default function DashboardScreen({ token }: Props) {
    const [wallet, setWallet] = useState<SavingsWallet | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);

    useEffect(() => {
        const loadWallet = async () => {
            setLoading(true);
            const data = await fetchWallet(token);
            setWallet(data);
            setLoading(false);
        };
        loadWallet();
    }, [token]);

    if (loading) return <Text style={styles.loading}>Loading...</Text>;
    if (!wallet) return <Text style={styles.error}>No wallet data found!</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <TotalBalance wallet={wallet} />

            <View>
                <Text style={styles.sectionTitle}>Savings Accounts</Text>
                {wallet.savingsAccounts.map(acc => (
                    <SavingsAccountCard key={acc.id} account={acc} />
                ))}
                <Button title="➕ Add Account" onPress={() => setShowAccountModal(true)} />
            </View>

            <View>
                <Text style={styles.sectionTitle}>Savings Deposits</Text>
                {wallet.savingsDeposits.map(dep => (
                    <SavingsDepositCard key={dep.id} deposit={dep} />
                ))}
                <Button title="➕ Add Deposit" onPress={() => setShowDepositModal(true)} />
            </View>

            <AddAccountModal
                visible={showAccountModal}
                onClose={() => setShowAccountModal(false)}
                onSave={() => setShowAccountModal(false)} //* implementacja dodania konta */ }
                // token={token}
            />
            <AddDepositModal
                visible={showDepositModal}
                onClose={() => setShowDepositModal(false)}
                onSave={() => setShowDepositModal(false)}/* implementacja dodania lokaty */
                // token={token}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#F7F7F2' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
    loading: { fontSize: 18, textAlign: 'center', marginTop: 40 },
    error: { color: 'red', fontSize: 18, textAlign: 'center', marginTop: 40 }
});