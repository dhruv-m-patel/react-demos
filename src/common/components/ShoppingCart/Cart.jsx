import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import styled from 'styled-components';
import useEffectWithDeepCompare from '../../../lib/hooks/useEffectWithDeepCompare'

const Trigger = styled.button`
  background-color: transparent;
  color: grey;
  border: 1px solid grey;
  font-size: 0.9rem;
  cursor: pointer;
`;

const CartContainer = styled.div`
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 8px;
`;

const CartItem = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;

  & img {
    max-width: 100%;
    max-height: 5rem;
  }
`;

export default function Cart({
  items,
  onRemoveFromCart,
}) {
  const [cartItems, setCartItems] = useState({});
  const [subtotalLines, setSubtotalLines] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);

  const onPlus = useCallback((product) => {
    setCartItems({
      ...cartItems,
      [product.id]: {
        ...product,
        quantity: (product.quantity || 0) + 1,
      },
    });
  }, [cartItems]);

  const onMinus = useCallback((product) => {
    const item = Object.values(cartItems).find(ci => ci.id === product.id);
    if (item?.quantity === 1) {
      onRemoveFromCart(product);
    } else {
      setCartItems({
        ...cartItems,
        [product.id]: {
          ...product,
          quantity: product.quantity - 1,
        },
      });
    }
  }, [cartItems, onRemoveFromCart]);

  const handleRemoveFromCart = useCallback((cartItem) => {
    onRemoveFromCart(cartItem);
  }, [onRemoveFromCart]);

  useEffectWithDeepCompare(() => {
    const subtotals = [];
    let total = 0;

    const updatedCartItems = items.reduce((result, item) => {
      const alreadyInCart = Object.values(cartItems).find(ci => ci.id === item.id);
      if (alreadyInCart?.quantity !== 0) {
        const cartItem =  {
          ...item,
          quantity: alreadyInCart ? alreadyInCart.quantity : 1,
        };
        result[item.id] = cartItem;
        subtotals.push(`${(cartItem.price / 100).toFixed(2)} ${cartItem.currency} * ${cartItem.quantity} =  ${(cartItem.price * cartItem.quantity / 100).toFixed(2)}`);
        total += (cartItem.price / 100) * cartItem.quantity;
      }
      return result;
    }, {});

    setCartItems(updatedCartItems);
    setSubtotalLines(subtotals);
    setOrderTotal(total.toFixed(2));
  }, [items, cartItems]);

  if (!items.length) {
    return null;
  }

  return (
    <CartContainer>
      <h2>Your Order</h2>
      <hr />
      {Object.values(cartItems).map(cartItem => (
        <CartItem key={cartItem.id}>
          <Row>
            <Col sm={3}>
              <img src={cartItem.image} />
            </Col>
            <Col sm={9}>
              <p><strong>{cartItem.display_name}</strong></p>
              <p>{(cartItem.price / 100).toFixed(2)} {cartItem.currency}</p>
              <Row>
                <Col sm={6}>
                  <Trigger onClick={() => { onMinus(cartItem); }}>
                    <FontAwesomeIcon icon={faMinus} />
                  </Trigger>
                  &nbsp;
                  {cartItem.quantity}
                  &nbsp;
                  <Trigger onClick={() => { onPlus(cartItem); }}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Trigger>
                </Col>
                <Col sm={6} style={{ textAlign: 'right' }}>
                  <Trigger onClick={() => { handleRemoveFromCart(cartItem); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Trigger>
                </Col>
              </Row>
            </Col>
          </Row>
        </CartItem>
      ))}
      <hr />
      <strong>Subtotal:</strong>
      <ul>
        {subtotalLines.map(subtotalLine => (
          <li key={subtotalLine}>
            <small>{subtotalLine}</small>
          </li>
        ))}
      </ul>
      <hr />
      <strong>Total: ${orderTotal}</strong>
    </CartContainer>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display_name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      manufacturer: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  ),
  onRemoveFromCart: PropTypes.func,
};

Cart.defaultProps = {
  items: [],
  onRemoveFromCart: () => {},
};
