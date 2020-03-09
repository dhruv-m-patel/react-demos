import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const NoTransactionsMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Container = styled.div`
  & table {
    color: grey;
  }
`;

export default function TransactionHistory({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) {
  if (!transactions.length) {
    return (
      <NoTransactionsMessage>
        There are no transactions yet!
        <br />
        <br />
        <Button size="lg" block variant="primary" onClick={onAddTransaction}>
          Add transaction
        </Button>
      </NoTransactionsMessage>
    );
  }

  return (
    <Container>
      <h2>
        <Button size="sm" variant="primary" onClick={onAddTransaction}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        &nbsp;
        Transaction History
      </h2>
      <hr />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Memo</th>
            <th>Type</th>
            <th>$</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>{transaction.memo}</td>
            <td>{transaction.type}</td>
            <td>{(transaction.amount / 100).toFixed(2)}</td>
            <td>
              <Button size="sm" variant="danger" onClick={() => { onDeleteTransaction(transaction.id); }}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
}

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      memo: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['income', 'expense']).isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ),
  onAddTransaction: PropTypes.func,
  onDeleteTransaction: PropTypes.func,
};

TransactionHistory.defaultProps = {
  transactions: [],
  onAddTransaction: () => {},
  onDeleteTransaction: () => {},
};
