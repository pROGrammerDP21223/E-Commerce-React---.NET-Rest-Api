import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate(); // For navigation after successful product creation
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    categoryId: '',
    image: null, // for image file upload
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
const token = localStorage.getItem('token');
  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7050/api/product/categories", {
            headers: { Authorization: `Bearer ${token}` },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        setError('Error fetching categories');
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (for image)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous errors

    // Prepare the data for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('productName', formData.productName);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('categoryId', formData.categoryId);

    if (formData.image) {
      formDataToSubmit.append('image', formData.image); // Attach the image if present
    }

    // Get token from localStorage (or your preferred storage)
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://localhost:7050/api/product', {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token in the Authorization header
        },
      });

      if (response.ok) {
        alert('Product created successfully!');
        navigate('/'); // Redirect to the product list page after successful creation
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText || 'Something went wrong.'}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Create Product</h2>
      <hr />
      <Container className="shadow px-4 pt-1 pb-4">
        <h4 className="mt-5">Product Details:</h4>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
            <p>Submitting product...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Product Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Product Image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="ms-3"
              variant="warning"
              type="reset"
              onClick={() =>
                setFormData({
                  productName: '',
                  price: '',
                  description: '',
                  categoryId: '',
                  image: null,
                })
              }
            >
              Reset
            </Button>
          </Form>
        )}
      </Container>
    </Container>
  );
};

export default Create;
