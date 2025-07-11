import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomModal from '../components/Modal';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (deposit: { title: string; endDate: string; rate: number; amount: number }) => void;
};

export default function AddDepositModal({ visible, onClose, onSave }: Props) {
    const [title, setTitle] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rate, setRate] = useState('');
    const [amount, setAmount] = useState('');

    function handleSubmit() {
        if (!title || !endDate || Number(rate) <= 0 || Number(amount) <= 0) return;
        onSave({
            title,
            endDate,
            rate: Number(rate) / 100,
            amount: Number(amount),
        });
        setTitle(''); setEndDate(''); setRate(''); setAmount('');
        onClose();
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <Text style={styles.title}>Add Savings Deposit</Text>
            <View style={styles.form}>
                <Text>Name:</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Deposit name" />
                <Text>End Date:</Text>
                <TextInput style={styles.input} value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" />
                <Text>Rate (%):</Text>
                <TextInput style={styles.input} value={rate} onChangeText={setRate} placeholder="e.g. 4.5" keyboardType="numeric" />
                <Text>Amount:</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="e.g. 2000" keyboardType="numeric" />
                <Button title="Save" onPress={handleSubmit} />
            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    form: { gap: 10 },
    input: {
        backgroundColor: '#F7F7F2',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#A66FB5',
    },
});