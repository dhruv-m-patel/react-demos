import Table from 'react-bootstrap/Table';
import Tester from '../../../../tests/Tester'
import ExpenseTracker from './ExpenseTracker';
import IncomeExpense, { Amount } from './IncomeExpense'
import TransactionHistory, { NoTransactionsMessage } from './TransactionHistory'
import TransactionEditor from './TransactionEditor'

const testRunner = new Tester();

const testTransaction = {
  id: 1,
  memo: 'Costco - Groceries',
  date: '2020-03-10',
  type: 'expense',
  amount: 20000,
};

describe('ExpenseTracker', () => {
  test('it should render', () => {
    const { component } = testRunner.getShallowInstance(ExpenseTracker);
    expect(component).toBeDefined();
    expect(component.find(TransactionEditor).length).toEqual(1);
    expect(component.find(IncomeExpense).length).toEqual(1);
    expect(component.find(TransactionHistory).length).toEqual(1);
  });
});

describe('IncomeExpense', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(
      IncomeExpense,
      { transactions: [testTransaction] },
    );
    expect(component).toBeDefined();
    expect(component.find(Amount).at(1).text()).toEqual('Expense$200');
  });
});

describe('TransactionEditor', () => {
  test('it should render', () => {
    const { component } = testRunner.getMountedInstance(TransactionEditor);
    expect(component).toBeDefined();
  });
});

describe('TransactionHistory', () => {
  test('it should render with no transactions', () => {
    const { component } = testRunner.getMountedInstance(TransactionHistory);
    expect(component).toBeDefined();
    expect(component.find(NoTransactionsMessage).length).toEqual(1);
  });

  test('it should render with transactions', () => {
    const { component } = testRunner.getMountedInstance(
      TransactionHistory,
      { transactions: [testTransaction] },
    );
    expect(component).toBeDefined();
    expect(component.find(Table).length).toEqual(1);
    expect(component.find(Table).at(0).find('tr').length).toEqual(2);
  });
});
