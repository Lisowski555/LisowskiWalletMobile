import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Button, ScrollView, StyleSheet, Alert} from 'react-native';
import {fetchWallet, addSavingsAccount, addSavingsDeposit} from '../api/walletApi';
import type {SavingsWallet} from '../types/Wallet';
import SavingsAccountCard from '../components/SavingsAccountCard';
import SavingsDepositCard from '../components/SavingsDepositCard';
import TotalBalance from '../components/TotalBalance';
import AddAccountModal from './AddAccountModal';
import AddDepositModal from './AddDepositModal';

type Props = {
    token: string;
};

export default function DashboardScreen({token}: Props) {
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
        const fetch = async () => {
            await loadWallet();
        };
        fetch();
    }, [loadWallet]);

    // Add new savings account
    const handleAddAccount = async (account: { title: string; rate: number; amount: number }) => {
        try {
            const updatedWallet = await addSavingsAccount(token, {
                ...account,
                rate: account.rate > 1 ? account.rate / 100 : account.rate
            });
            setWallet(updatedWallet);
            setShowAccountModal(false);
        } catch (err) {
            Alert.alert('Error', 'Failed to add account');
        }
    };

    // Add new savings deposit
    const handleAddDeposit = async (deposit: { title: string; endDate: string; rate: number; amount: number }) => {
        try {
            const updatedWallet = await addSavingsDeposit(token, {
                ...deposit,
                rate: deposit.rate > 1 ? deposit.rate / 100 : deposit.rate
            });
            setWallet(updatedWallet);
            setShowDepositModal(false);
        } catch (err) {
            Alert.alert('Error', 'Failed to add deposit');
        }
    };

    if (loading) return <Text style={styles.loading}>Loading...</Text>;
    if (!wallet) return <Text style={styles.error}>No wallet data found!</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <TotalBalance wallet={wallet}/>

            <View>
                <Text style={styles.sectionTitle}>Savings Accounts</Text>
                {wallet.savingsAccounts.map(acc => (
                    <SavingsAccountCard key={acc.id} account={acc} />
                    // <View key={acc.id}>
                    //     <Text> {acc.amount.amount} </Text>
                    // </View>
                ))}
                <Button title="➕ Add Account" onPress={() => setShowAccountModal(true)}/>
            </View>

            <View>
                <Text style={styles.sectionTitle}>Savings Deposits</Text>
                {wallet.savingsDeposits.map(dep => (
                    <SavingsDepositCard key={dep.id} deposit={dep}/>
                ))}
                <Button title="➕ Add Deposit" onPress={() => setShowDepositModal(true)}/>
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
    container: {flex: 1, padding: 16, backgroundColor: '#F7F7F2'},
    title: {fontSize: 28, fontWeight: 'bold', marginBottom: 16},
    sectionTitle: {fontSize: 20, fontWeight: 'bold', marginVertical: 8},
    loading: {fontSize: 18, textAlign: 'center', marginTop: 40},
    error: {color: 'red', fontSize: 18, textAlign: 'center', marginTop: 40}
});