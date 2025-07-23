import React from 'react';
import {Modal, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function CustomModal({visible, onClose, children}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.content}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        minWidth: 320,
        maxWidth: '90%',
        elevation: 8,
    },
});