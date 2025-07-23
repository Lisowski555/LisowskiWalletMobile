import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import type {SavingsAccount} from '../types/Wallet';

type Props = {
    account: SavingsAccount;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function SavingsAccountCard({account, onEdit, onDelete}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>Account: {account.title}</Text>
            <Text>Amount: {account.amount.amount} {account.amount.currency}</Text>
            <Text>Rate: {(account.rate * 100).toFixed(2)}%</Text>
            <View style={{flexDirection: 'row', gap: 8, marginTop: 8}}>
                {onEdit && <Button title="Edit" onPress={onEdit}/>}
                {onDelete && <Button title="Delete" color="#d42f2f" onPress={onDelete}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {backgroundColor: '#fff', padding: 16, marginVertical: 8, borderRadius: 8, elevation: 2},
    name: {fontWeight: 'bold', fontSize: 16}
});