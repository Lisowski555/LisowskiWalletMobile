// import axios from 'axios';
// import type { SavingsWallet } from '../types/Wallet';
//
// const API_URL = 'http://10.0.2.2:8080';
//
// export async function fetchWallet(token: string): Promise<SavingsWallet> {
//     const response = await axios.get(`${API_URL}/wallet`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
// }
//
// // Dodanie nowego konta
// export async function addSavingsAccount(token: string, account: Omit<SavingsAccount, 'id'>) {
//     const response = await axios.post(`${API_URL}/wallet/accounts`, account, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
// }
//
// // Analogicznie dla lokat
// export async function addSavingsDeposit(token: string, deposit: Omit<SavingsDeposit, 'id'>) {
//     const response = await axios.post(`${API_URL}/wallet/deposits`, deposit, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return response.data;
// }

import axios from 'axios';
import type { SavingsWallet, SavingsAccount, SavingsDeposit } from '../types/Wallet';

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
    account: { title: string; rate: number; amount: number; created: string; updated: string }
): Promise<void> {
    await axios.post('http://10.0.2.2:8080/wallet/account', account, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Dodaj lokatę
export async function addSavingsDeposit(
    token: string,
    deposit: { title: string; endDate: string; rate: number; amount: number; created: string; updated: string }
): Promise<void> {
    await axios.post('http://10.0.2.2:8080/wallet/deposit', deposit, {
        headers: { Authorization: `Bearer ${token}` }
    });
}