import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Display = () => {
  const { productId } = useParams(); // The product ID from the URL params
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    price: '',
    imgPath: '',
    description: '',
    categoryId: '', // To store category ID from the product
  });
  const [categories, setCategories] = useState([]); // For storing categories
  const [loading, setLoading] = useState(false);
 const token = localStorage.getItem('token');
  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7050/api/product/categories", {
            headers: { Authorization: `Bearer ${token}` },
          });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch product details by product ID
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7050/api/product/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setFormData({
          productId: result.productId,
          productName: result.productName,
          price: result.price,
          imgPath: result.imgPath,
          description: result.description,
          categoryId: result.categoryId,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Get category name by categoryId
  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : 'Unknown Category';
  };

  return (
    <Container>
      <h2 className="text-center my-4">Product Management</h2>
      <hr />
      <Container className="shadow px-4 pt-1 pb-4">
        <h4 className="mt-5">Product Details</h4>

        
        {loading ? (
          <h1>Loading...</h1>
        ) : (

          <Row>
          <Col lg={8}>
            <Form>
            {/* <Form.Group className="mb-3" controlId="formProductId">
              <Form.Label>Product ID :</Form.Label>
              <Form.Control type="text" name='productId' value={formData.productId} disabled />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name :</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Product Name"
                name="productName"
                value={formData.productName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price :</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Price"
                name="price"
                value={formData.price}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                disabled
                as="textarea"
                rows={3}
                placeholder="Product Description"
                name="description"
                value={formData.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category :</Form.Label>
              <Form.Control
                disabled
                type="text"
                name="categoryId"
                value={getCategoryName(formData.categoryId)} // Display category name
              />
            </Form.Group>
          </Form>
          </Col>
          <Col lg={4} align="center">
          {formData.imgPath ? (
                        <Image
                          src={`https://localhost:7050${formData.imgPath}`}
                          alt={formData.productName}
                          thumbnail
                         
                        />
                      ) : (
                        'No image'
                      )}
          </Col>
        </Row>
        
        )}
      </Container>
    </Container>
  );
};

export default Display;
