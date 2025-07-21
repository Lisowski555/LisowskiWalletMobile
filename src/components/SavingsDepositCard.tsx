import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { SavingsDeposit } from '../types/Wallet';

export default function SavingsDepositCard({ deposit }: { deposit: SavingsDeposit }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>Deposit: {deposit.title}</Text>
            <Text>Amount: {deposit.amount.amount} {deposit.amount.currency}</Text>
            <Text>Rate: {(deposit.rate * 100).toFixed(2)}%</Text>
            <Text>End date: {deposit.endDate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#fff', padding: 16, marginVertical: 8, borderRadius: 8, elevation: 2 },
    name: { fontWeight: 'bold', fontSize: 16 }
});