// Uncomment the code below and write your tests
import { BankAccount, InsufficientFundsError } from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    expect(() => bankAccount.withdraw(1500)).toThrow(InsufficientFundsError);
  });
  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    const destinationAccount = new BankAccount(0);
    expect(() => bankAccount.transfer(1500, destinationAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = new BankAccount(1000);
    expect(() => bankAccount.transfer(500, bankAccount)).toThrow(Error);
  });

  test('should deposit money', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    bankAccount.deposit(500);
    expect(bankAccount.getBalance()).toBe(initialBalance + 500);
  });

  test('should withdraw money', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    bankAccount.withdraw(500);
    expect(bankAccount.getBalance()).toBe(initialBalance - 500);
  });

  test('should transfer money', () => {
    const initialBalance = 1000;
    const bankAccount = new BankAccount(initialBalance);
    const destinationAccount = new BankAccount(0);
    bankAccount.transfer(500, destinationAccount);
    expect(bankAccount.getBalance()).toBe(initialBalance - 500);
    expect(destinationAccount.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = new BankAccount(100);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    await bankAccount.fetchBalance();
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = new BankAccount(100);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    await bankAccount.fetchBalance();
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
