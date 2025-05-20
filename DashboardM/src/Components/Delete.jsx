import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const Delete = () => {
  const { productId } = useParams(); // Assuming the route has `productId`
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is required
        const response = await fetch(`https://localhost:7050/api/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          alert('Product deleted successfully!');
          navigate('/'); // Redirect to home/dashboard after successful deletion
        } else {
          const errorText = await response.text();
          setError(errorText || 'Something went wrong.');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false); // Set loading to false after operation completes
      }
    };

    // Call the deleteProduct function if the productId is valid
    if (productId) {
      deleteProduct();
    } else {
      setError('Invalid Product ID');
      setLoading(false);
    }
  }, [productId, navigate]);

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <>
              <p>Deleting Product...</p>
              <Spinner animation="border" role="status" />
            </>
          ) : error ? (
            <>
              <p style={{ color: 'red' }}>Error: {error}</p>
              <Button variant="danger" onClick={() => navigate('/')}>
                Go Back
              </Button>
            </>
          ) : (
            <p>Product deleted successfully!</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default Delete;
