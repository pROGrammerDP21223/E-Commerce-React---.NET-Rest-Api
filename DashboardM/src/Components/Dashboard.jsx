import React, { useEffect, useState, Suspense } from 'react';
import { Button, Container, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

// Lazy load Tabs and Table components
const Tabs = React.lazy(() => import('react-bootstrap/Tabs'));
const Tab = React.lazy(() => import('react-bootstrap/Tab'));
const Table = React.lazy(() => import('react-bootstrap/Table'));

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // NEW
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const { dispatchCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const [productsRes, categoriesRes] = await Promise.all([ 
          fetch('https://localhost:7050/api/product', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://localhost:7050/api/product/categories', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [productData, categoryData] = await Promise.all([ 
          productsRes.json(),
          categoriesRes.json(),
        ]);

        setProducts(productData);
        setCategories(categoryData);
        setActiveCategoryId(categoryData[0]?.categoryId || null); // Set initial tab
      } catch (err) {
        console.error('Error:', err);
        if (err.message.includes('401')) {
          alert('Unauthorized. Please login.');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.categoryId === categoryId);
    return category ? category.categoryName : 'Unknown';
  };

  const handleAddToCart = (product) => {
    dispatchCart({ type: 'ADD_TO_CART', payload: product });
    setAlertMessage(`${product.productName} added to cart!`);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const filteredProducts = products.filter(p => p.categoryId === activeCategoryId);

  return (
    <Container>
      {alertMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          minWidth: '300px',
        }}>
          <Alert variant="success" onClose={() => setAlertMessage('')} dismissible>
            {alertMessage}
          </Alert>
        </div>
      )}

      <h2 className="text-center my-4">Ecommerce</h2>
      <hr />

      <Container className="shadow px-4 py-3">
        <div className='d-flex justify-content-between align-items-center'>
          <h4>Product List</h4>
          {/* <Button className='me-3 my-2' variant="primary" as={Link} to="/products/create">Add Product</Button> */}
        </div>

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Suspense fallback={<div>Loading Categories...</div>}>
              <Tabs
                activeKey={activeCategoryId}
                onSelect={(k) => setActiveCategoryId(Number(k))}
                className="mb-3"
              >
                {categories.map(cat => (
                  <Tab eventKey={cat.categoryId} title={cat.categoryName} key={cat.categoryId}>
                    <Suspense fallback={<div>Loading Products...</div>}>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            {/* <th>Product ID</th> */}
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price ($)</th>
                            <th>Actions</th>
                            <th>Add to Cart</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map(p => (
                            <tr key={p.productId}>
                              {/* <td>{p.productId}</td> */}
                              <td>{p.productName}</td>
                              <td>
                                {p.imgPath ? (
                                  <Image
                                    src={`https://localhost:7050${p.imgPath}`}
                                    alt={p.productName}
                                    thumbnail
                                    style={{ width: '80px' }}
                                  />
                                ) : 'No image'}
                              </td>
                              <td>{p.price.toFixed(2)}</td>
                              <td>
                                <Button variant="primary" className="me-2" as={Link} to={`/products/view/${p.productId}`}>
                                  View
                                </Button>
                                {/* <Button variant="warning" className="me-2" as={Link} to={`/products/edit/${p.productId}`}>
                                  Edit
                                </Button>
                                <Button variant="danger" as={Link} to={`/products/delete/${p.productId}`}>
                                  Delete
                                </Button> */}
                              </td>
                              <td>
                                <Button variant="success" onClick={() => handleAddToCart(p)}>
                                  Add to Cart
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Suspense>
                  </Tab>
                ))}
              </Tabs>
            </Suspense>
          </>
        )}
      </Container>
    </Container>
  );
};

export default Dashboard;
