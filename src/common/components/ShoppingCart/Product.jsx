import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const ProductContainer = styled.div`
  margin-bottom: 2rem;
  border: 1px solid grey;
  border-radius: 8px;
  height: 20rem;
  overflow: hidden;

  & h3 {
    font-size: 1.1rem;
    font-weight: bold;
  }

  & h3.small {
    font-size: 0.9rem;
  }

  & img {
    max-width: 100%;
    max-height: 10rem;
    display: block;
    margin: 0 auto;
  }
`;

const CartItem = styled.div`
  padding: 2rem;
`;

const CartActions = styled.div`
  padding: 0 1rem;
`;

const CartTrigger = styled.span`
  cursor: pointer;
`;

export default function Product({
  item,
  onAddToCart,
  addedToCart,
  onRemoveFromCart,
}) {
  const { display_name: productName, price, image, currency } = item;

  const handleRemoveFromCart = useCallback(() => {
    onRemoveFromCart(item);
  }, [onRemoveFromCart]);

  const handleAddToCart = useCallback(() => {
    onAddToCart(item);
  }, [onAddToCart]);

  return (
    <ProductContainer>
      <CartItem>
        <h3 className={productName.split(' ').length >= 2 && productName.length > 20 ? 'small' : ''}>{productName}</h3>
        <br />
        <img src={image} />
      </CartItem>
      <CartActions>
        <Row>
          <Col>{(price / 100).toFixed(2)} {currency}</Col>
          <Col style={{ textAlign: 'right' }}>
            <CartTrigger>
              {addedToCart
                ? (
                  <FontAwesomeIcon icon={faTrash} onClick={handleRemoveFromCart} />
                )
                : (
                  <FontAwesomeIcon icon={faCartPlus} onClick={handleAddToCart} />
                )
              }
            </CartTrigger>
          </Col>
        </Row>
      </CartActions>
    </ProductContainer>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    manufacturer: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
  addedToCart: PropTypes.bool,
  onRemoveFromCart: PropTypes.func,
};

Product.defaultProps = {
  onAddToCart: () => {},
  addedToCart: false,
  onRemoveFromCart: () => {},
};
