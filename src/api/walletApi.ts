import axios from 'axios';
import type { SavingsWallet } from '../types/Wallet';

// Pobierz cały portfel
export async function fetchWallet(token: string): Promise<SavingsWallet> {
    const response = await axios.get('http://10.0.2.2:8080/wallet', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Dodaj konto oszczędnościowe
export async function addSavingsAccount(
    token: string,
    account: { title: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.post('http://10.0.2.2:8080/wallet/accounts', {
        ...account,
        currency: account.currency || 'PLN',
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Dodaj lokatę
export async function addSavingsDeposit(
    token: string,
    deposit: { title: string; endDate: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.post('http://10.0.2.2:8080/wallet/deposits', {
        ...deposit,
        currency: deposit.currency || 'PLN'
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}