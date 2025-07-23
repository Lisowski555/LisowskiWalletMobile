import React, {useState, useEffect} from 'react';
import {Modal, View, TextInput, Button, Text, StyleSheet} from 'react-native';
import type {SavingsAccount} from '../types/Wallet';

type Props = {
    visible: boolean;
    onClose: () => void;
    account: SavingsAccount | null;
    onSave: (account: { title: string; rate: number; amount: number }) => void;
};

export default function EditAccountModal({visible, onClose, account, onSave}: Props) {
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (account) {
            setTitle(account.title);
            setRate((account.rate * 100).toString());
            setAmount(account.amount.amount.toString());
        }
    }, [account, visible]);

    function handleSave() {
        if (!title || !rate || !amount) return;
        onSave({
            title,
            rate: Number(rate) / 100,
            amount: Number(amount),
        });
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rate (%)"
                        keyboardType="numeric"
                        value={rate}
                        onChangeText={setRate}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Button title="Save changes" onPress={handleSave}/>
                    <Button title="Cancel" onPress={onClose}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#22223B88'},
    container: {backgroundColor: '#fff', padding: 24, borderRadius: 12, width: '80%'},
    title: {fontSize: 22, fontWeight: 'bold', marginBottom: 12},
    input: {
        backgroundColor: '#F7F7F2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#A66FB5'
    },
});