import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { fetchWallet, addSavingsAccount, addSavingsDeposit } from '../api/walletApi';
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

    // Fetch wallet from backend
    const loadWallet = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchWallet(token);
            setWallet(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch wallet');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        loadWallet();
    }, [loadWallet]);

    // Add new savings account
    const handleAddAccount = async (account: { title: string; rate: number; amount: number }) => {
        const now = new Date().toISOString();
        await addSavingsAccount(token, {
            ...account,
            created: now,
            updated: now,
        });
        setShowAccountModal(false);
        await loadWallet();
    };

    // Add new savings deposit
    const handleAddDeposit = async (deposit: { title: string; endDate: string; rate: number; amount: number }) => {
        const now = new Date().toISOString();
        await addSavingsDeposit(token, {
            ...deposit,
            created: now,
            updated: now,
        });
        setShowDepositModal(false);
        await loadWallet();
    };

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
                onSave={handleAddAccount}
            />
            <AddDepositModal
                visible={showDepositModal}
                onClose={() => setShowDepositModal(false)}
                onSave={handleAddDeposit}
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