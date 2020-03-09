import React, { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Page from '../Page';
import TransactionHistory from './TransactionHistory';
import IncomeExpense from './IncomeExpense'
import TransactionEditor from './TransactionEditor';

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState(false);

  const handleAddTransaction = useCallback((transaction) => {
    setActiveTransaction(transaction);
  }, []);

  const handleRemoveTransaction = useCallback((transactionId) => {
    setTransactions(transactions.filter(t => t.id !== transactionId));
  }, [transactions]);

  const handleCloseTransactionEditor = useCallback(() => {
    setActiveTransaction(undefined);
  }, []);

  const handleSaveNewTransaction = useCallback((transaction) => {
    const maxTransactionId = transactions.reduce((max, { id }) => (id > max ? id : max), 0);
    setTransactions([].concat(transactions, { id: maxTransactionId + 1, ...transaction }));
    setActiveTransaction(undefined);
  }, [transactions]);

  return (
    <Page title="Expense Tracker" showHome>
      <Modal show={!!activeTransaction} onHide={handleCloseTransactionEditor}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <TransactionEditor
            onSave={handleSaveNewTransaction}
            onCancel={handleCloseTransactionEditor}
          />
        </Modal.Body>
      </Modal>
      <IncomeExpense transactions={transactions} />
      <br />
      <br />
      <TransactionHistory
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onDeleteTransaction={handleRemoveTransaction}
      />
    </Page>
  );
}
