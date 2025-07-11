import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SavingsWallet } from '../types/Wallet';

export default function TotalBalance({ wallet }: { wallet: SavingsWallet }) {
    const total = [
        ...wallet.savingsAccounts.map(a => a.amount.amount),
        ...wallet.savingsDeposits.map(d => d.amount.amount),
    ].reduce((sum, val) => sum + val, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Total Balance:</Text>
            <Text style={styles.amount}>{total.toFixed(2)} PLN</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginVertical: 16, padding: 16, backgroundColor: '#A66FB5', borderRadius: 8 },
    label: { fontSize: 18, color: '#fff' },
    amount: { fontSize: 24, fontWeight: 'bold', color: '#fff' }
});