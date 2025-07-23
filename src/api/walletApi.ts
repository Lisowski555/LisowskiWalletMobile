import axios from 'axios';
import type {SavingsWallet} from '../types/Wallet';

// Downloading wallet
export async function fetchWallet(token: string): Promise<SavingsWallet> {
    const response = await axios.get('http://10.0.2.2:8080/wallet', {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Adding savings account
export async function addSavingsAccount(
    token: string,
    account: { title: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.post('http://10.0.2.2:8080/wallet/accounts', {
        ...account,
        currency: account.currency || 'PLN',
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Adding savings deposit
export async function addSavingsDeposit(
    token: string,
    deposit: { title: string; endDate: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.post('http://10.0.2.2:8080/wallet/deposits', {
        ...deposit,
        currency: deposit.currency || 'PLN'
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Editing savings account
export async function editSavingsAccount(
    token: string,
    id: string,
    account: { title: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.put(`http://10.0.2.2:8080/wallet/accounts/${id}`, {
        ...account,
        currency: account.currency || 'PLN',
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Deleting savings account
export async function deleteSavingsAccount(
    token: string,
    id: string
): Promise<SavingsWallet> {
    const response = await axios.delete(`http://10.0.2.2:8080/wallet/accounts/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Editing savings deposit
export async function editSavingsDeposit(
    token: string,
    id: string,
    deposit: { title: string; endDate: string; rate: number; amount: number; currency?: string }
): Promise<SavingsWallet> {
    const response = await axios.put(`http://10.0.2.2:8080/wallet/deposits/${id}`, {
        ...deposit,
        currency: deposit.currency || 'PLN',
    }, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}

// Deleting savings deposit
export async function deleteSavingsDeposit(
    token: string,
    id: string
): Promise<SavingsWallet> {
    const response = await axios.delete(`http://10.0.2.2:8080/wallet/deposits/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
}