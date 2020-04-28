import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const IncomeArray = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const OutcomeArray = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    function TypeReducer(acc: number, curr: Transaction): number {
      return acc + curr.value;
    }

    const income = IncomeArray.reduce(TypeReducer, 0);
    const outcome = OutcomeArray.reduce(TypeReducer, 0);
    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ type, title, value });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
