import React from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const { cartState, dispatchCart } = useCart();
  const navigate = useNavigate();

  const total = cartState.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <h2 className="my-4">Shopping Cart</h2>
      {cartState.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartState.cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    {item.imgPath ? (
                      <Image
                        src={`https://localhost:7050${item.imgPath}`}
                        alt={item.productName}
                        thumbnail
                        style={{ width: '60px' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>
                    <Link to={`/products/view/${item.productId}`}>
                      {item.productName}
                    </Link>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        dispatchCart({
                          type: 'REMOVE_FROM_CART',
                          payload: item.productId,
                        })
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="danger"
              onClick={() => dispatchCart({ type: 'CLEAR_CART' })}
            >
              Clear Cart
            </Button>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
