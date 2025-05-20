import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cartState } = useCart();

  const total = cartState.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container>
      <h2 className="my-4">Order Summary</h2>
      {cartState.cartItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartState.cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
        </>
      )}
    </Container>
  );
};

export default Checkout;
