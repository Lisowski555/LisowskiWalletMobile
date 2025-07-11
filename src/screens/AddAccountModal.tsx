import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomModal from '../components/Modal';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (account: { title: string; rate: number; amount: number }) => void;
};

export default function AddAccountModal({ visible, onClose, onSave }: Props) {
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [amount, setAmount] = useState('');

    function handleSubmit() {
        if (!title || Number(rate) <= 0 || Number(amount) <= 0) return;
        onSave({
            title,
            rate: Number(rate) / 100, // procenty na ułamek
            amount: Number(amount),
        });
        setTitle(''); setRate(''); setAmount('');
        onClose();
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <Text style={styles.title}>Add Savings Account</Text>
            <View style={styles.form}>
                <Text>Name:</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Account name" />
                <Text>Rate (%):</Text>
                <TextInput style={styles.input} value={rate} onChangeText={setRate} placeholder="e.g. 3.5" keyboardType="numeric" />
                <Text>Amount:</Text>
                <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="e.g. 1000" keyboardType="numeric" />
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