import React, {useState, useEffect} from 'react';
import {Modal, View, TextInput, Button, Text, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type {SavingsDeposit} from '../types/Wallet';

type Props = {
    visible: boolean;
    onClose: () => void;
    deposit: SavingsDeposit | null;
    onSave: (deposit: { title: string; endDate: string; rate: number; amount: number }) => void;
};

export default function EditDepositModal({visible, onClose, deposit, onSave}: Props) {
    const [title, setTitle] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [rate, setRate] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (deposit) {
            setTitle(deposit.title);
            setEndDate(deposit.endDate);
            setRate((deposit.rate * 100).toString());
            setAmount(deposit.amount.amount.toString());
        }
    }, [deposit, visible]);

    function handleSave() {
        if (!title || !endDate || !rate || !amount) return;
        onSave({
            title,
            endDate,
            rate: Number(rate) / 100,
            amount: Number(amount),
        });
    }

    const handleDateChange = (_event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            // Format as YYYY-MM-DD
            const iso = selectedDate.toISOString().substring(0, 10);
            setEndDate(iso);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Deposit</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <View>
                        <Button title={endDate ? `End Date: ${endDate}` : "Choose End Date"}
                                onPress={() => setShowDatePicker(true)}/>
                        {showDatePicker && (
                            <DateTimePicker
                                value={endDate ? new Date(endDate) : new Date()}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
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