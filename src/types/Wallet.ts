export interface Money {
    amount: number; // BigDecimal -> number
    currency: 'PLN' | 'USD' | 'EUR';
}

export interface SavingsAccount {
    id: string;
    title: string;
    amount: Money;
    rate: number;
    created: string;
    updated: string;
}

export interface SavingsDeposit {
    id: string;
    amount: Money;
    rate: number;
    endDate: string;
    created: string;
    updated: string;
}

export interface SavingsWallet {
    id: string;
    userId: string;
    savingsAccounts: SavingsAccount[];
    savingsDeposits: SavingsDeposit[];
    created: string;
    updated: string;
}