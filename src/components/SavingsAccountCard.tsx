import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SavingsAccount } from '../types/Wallet';

export default function SavingsAccountCard({ account }: { account: SavingsAccount }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>Account: {account.id}</Text>
            <Text>Amount: {account.amount.amount} {account.amount.currency}</Text>
            <Text>Rate: {(account.rate * 100).toFixed(2)}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#fff', padding: 16, marginVertical: 8, borderRadius: 8, elevation: 2 },
    name: { fontWeight: 'bold', fontSize: 16 }
});