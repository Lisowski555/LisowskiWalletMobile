import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Button, ScrollView, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    fetchWallet,
    addSavingsAccount,
    addSavingsDeposit,
    editSavingsAccount,
    deleteSavingsAccount,
    editSavingsDeposit,
    deleteSavingsDeposit
} from '../api/walletApi';
import type {SavingsWallet, SavingsAccount, SavingsDeposit} from '../types/Wallet';
import SavingsAccountCard from '../components/SavingsAccountCard';
import SavingsDepositCard from '../components/SavingsDepositCard';
import TotalBalance from '../components/TotalBalance';
import AddAccountModal from './AddAccountModal';
import AddDepositModal from './AddDepositModal';
import EditAccountModal from './EditAccountModal';
import EditDepositModal from './EditDepositModal';

type Props = {
    token: string;
};

export default function DashboardScreen({token}: Props) {
    const [wallet, setWallet] = useState<SavingsWallet | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);

    // State to edit account
    const [showEditAccountModal, setShowEditAccountModal] = useState(false);
    const [editingAccount, setEditingAccount] = useState<SavingsAccount | null>(null);

    // State to edit deposit
    const [showEditDepositModal, setShowEditDepositModal] = useState(false);
    const [editingDeposit, setEditingDeposit] = useState<SavingsDeposit | null>(null);

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

    // Editing account
    const handleEditAccount = async (updated: { title: string; rate: number; amount: number }) => {
        if (!editingAccount) return;
        try {
            const updatedWallet = await editSavingsAccount(token, editingAccount.id, {
                ...updated,
                rate: updated.rate > 1 ? updated.rate / 100 : updated.rate,
            });
            setWallet(updatedWallet);
            setShowEditAccountModal(false);
            setEditingAccount(null);
        } catch (err) {
            Alert.alert('Error', 'Failed to edit account');
        }
    };

    // Deleting account
    const handleDeleteAccount = async (accountId: string) => {
        Alert.alert(
            'Confirm removal',
            'Are you sure you want to delete this account?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedWallet = await deleteSavingsAccount(token, accountId);
                            setWallet(updatedWallet);
                        } catch (err) {
                            Alert.alert('Error', 'Failed to delete account');
                        }
                    }
                },
            ]
        );
    };

    // Editing deposit
    const handleEditDeposit = async (updated: { title: string; endDate: string; rate: number; amount: number }) => {
        if (!editingDeposit) return;
        try {
            const updatedWallet = await editSavingsDeposit(token, editingDeposit.id, {
                ...updated,
                rate: updated.rate > 1 ? updated.rate / 100 : updated.rate,
            });
            setWallet(updatedWallet);
            setShowEditDepositModal(false);
            setEditingDeposit(null);
        } catch (err) {
            Alert.alert('Error', 'Failed to edit deposit');
        }
    };

    // Deleting deposit
    const handleDeleteDeposit = async (depositId: string) => {
        Alert.alert(
            'Confirm removal',
            'Are you sure you want to delete this deposit?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedWallet = await deleteSavingsDeposit(token, depositId);
                            setWallet(updatedWallet);
                        } catch (err) {
                            Alert.alert('Error', 'Failed to delete deposit');
                        }
                    }
                },
            ]
        );
    };

    if (loading) return <Text style={styles.loading}>Loading...</Text>;
    if (!wallet) return <Text style={styles.error}>No wallet data found!</Text>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 48}}>
                <Text style={styles.title}>Dashboard</Text>
                <TotalBalance wallet={wallet}/>

                <View>
                    <Text style={styles.sectionTitle}>Savings Accounts</Text>
                    {wallet.savingsAccounts.map(acc => (
                        <SavingsAccountCard
                            key={acc.id}
                            account={acc}
                            onEdit={() => {
                                setEditingAccount(acc);
                                setShowEditAccountModal(true);
                            }}
                            onDelete={() => handleDeleteAccount(acc.id)}
                        />
                    ))}
                    <Button title="➕ Add Account" onPress={() => setShowAccountModal(true)}/>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Savings Deposits</Text>
                    {wallet.savingsDeposits.map(dep => (
                        <SavingsDepositCard
                            key={dep.id}
                            deposit={dep}
                            onEdit={() => {
                                setEditingDeposit(dep);
                                setShowEditDepositModal(true);
                            }}
                            onDelete={() => handleDeleteDeposit(dep.id)}
                        />
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
                <EditAccountModal
                    visible={showEditAccountModal}
                    onClose={() => {
                        setShowEditAccountModal(false);
                        setEditingAccount(null);
                    }}
                    account={editingAccount}
                    onSave={handleEditAccount}
                />
                <EditDepositModal
                    visible={showEditDepositModal}
                    onClose={() => {
                        setShowEditDepositModal(false);
                        setEditingDeposit(null);
                    }}
                    deposit={editingDeposit}
                    onSave={handleEditDeposit}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: '#F7F7F2'},
    container: {flex: 1, padding: 16, backgroundColor: '#F7F7F2'},
    title: {fontSize: 28, fontWeight: 'bold', marginBottom: 16},
    sectionTitle: {fontSize: 20, fontWeight: 'bold', marginVertical: 8},
    loading: {fontSize: 18, textAlign: 'center', marginTop: 40},
    error: {color: 'red', fontSize: 18, textAlign: 'center', marginTop: 40}
});