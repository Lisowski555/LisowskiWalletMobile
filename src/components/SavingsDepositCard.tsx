import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {SavingsDeposit} from '../types/Wallet';

type Props = {
    deposit: SavingsDeposit;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function SavingsDepositCard({deposit, onEdit, onDelete}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>Deposit: {deposit.title}</Text>
            <Text>Amount: {deposit.amount.amount} {deposit.amount.currency}</Text>
            <Text>Rate: {(deposit.rate * 100).toFixed(2)}%</Text>
            <Text>End date: {deposit.endDate}</Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 8}}>
                {onEdit && <Button title="Edit" onPress={onEdit}/>}
                {onDelete && <Button title="Delete" color="red" onPress={onDelete}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {backgroundColor: '#fff', padding: 16, marginVertical: 8, borderRadius: 8, elevation: 2},
    name: {fontWeight: 'bold', fontSize: 16}
});