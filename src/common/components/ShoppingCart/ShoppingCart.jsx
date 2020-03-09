import React, { useState, useCallback } from 'react';
import Page from '../Page';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from './Product';
import Cart from './Cart';

export const PRODUCTS = [
  {
    id: 'Fitbit_Versa2',
    display_name: 'Fitbit Versa 2',
    price: 21900,
    manufacturer: 'Fitbit',
    image: '/images/smart-watches/Fitbit_Versa2.png',
    currency: 'CAD',
  },
  {
    id: 'Fossil_Gen5',
    display_name: 'Fossil Gen 5',
    price: 39000,
    manufacturer: 'Fossil',
    image: '/images/smart-watches/Fossil_Gen5.jpeg',
    currency: 'CAD',
  },
  {
    id: 'Fossil_Gen5_Carlyle',
    display_name: 'Fossil Gen 5 (Carlyle)',
    price: 39000,
    manufacturer: 'Fossil',
    image: '/images/smart-watches/Fossil_Gen5_Carlyle.jpeg',
    currency: 'CAD',
  },
  {
    id: 'Garmin_Venu',
    display_name: 'Garmin Venu',
    price: 47999,
    manufacturer: 'Garmin',
    image: '/images/smart-watches/Garmin_Venu.jpg',
    currency: 'CAD',
  },
  {
    id: 'LEMFO_LEMT',
    display_name: 'LEMFO LEMT 4G',
    price: 27800,
    manufacturer: 'LEMFO',
    image: '/images/smart-watches/Lemfo_Lemt.jpg',
    currency: 'CAD',
  },
  {
    id: 'Relogio_Fashion_SmartWatch_For_Women',
    display_name: 'Relogio Fashion Watch',
    price: 2100,
    manufacturer: 'Relogio',
    image: '/images/smart-watches/Relogio_Fashion_Smartwatch.jpg',
    currency: 'CAD',
  },
  {
    id: 'Samsung_Galaxy_Watch_Active2',
    display_name: 'Samsung Galaxy Active2',
    price: 35967,
    manufacturer: 'Samsung',
    image: '/images/smart-watches/Samsung_Galaxy_Watch_Active2.jpg',
    currency: 'CAD',
  },
];

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = useCallback((product) => {
    setCartItems([].concat(cartItems, product));
  }, [cartItems]);

  const handleRemoveFromCart = useCallback((product) => {
    setCartItems(cartItems.filter(ci => ci.id !== product.id));
  }, [cartItems]);

  return (
    <Page title="Shopping Cart" showHome>
      <Row>
        <Col sm={8}>
          <Row>
            {PRODUCTS.map(product => (
              <Col sm={4} key={product.id}>
                <Product
                  item={product}
                  addedToCart={cartItems.find(c => c.id === product.id)}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col sm={4}>
          <Cart
            items={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </Col>
      </Row>
    </Page>
  );
}
