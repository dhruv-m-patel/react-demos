import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Container = styled.div`
  padding: 1rem;
`;

const Amount = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 1rem;

  & h3 {
    font-size: 2rem;
    margin: 1rem 0;
  }

  & h3.income {
    color: green;
  }

  & h3.expense {
    color: red;
  }
`;

export default function IncomeExpense({
  transactions,
}) {
  const reduceSum = (sum, transaction) => (sum + transaction.amount / 100);
  const income = transactions.filter(t => t.type === 'income').reduce(reduceSum, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce(reduceSum, 0);

  return (
    <Container>
      <Row>
        <Col>
          <Amount>
            <h3 className="income">Income</h3>
            ${income}
          </Amount>
        </Col>
        <Col>
          <Amount>
            <h3 className="expense">Expense</h3>
            ${expense}
          </Amount>
        </Col>
      </Row>
    </Container>
  );
}

IncomeExpense.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      memo: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['income', 'expense']).isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ),
};

IncomeExpense.defaultProps = {
  transactions: [],
};
