export interface Account{
    id: string;
    userId: string;
    iban: string;
    current_balance: string;
    currency: string;
}

export interface AccountResponse extends Omit<Account, "current_balance"> {
    current_balance: number;
}