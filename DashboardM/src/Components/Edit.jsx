import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    productName: '',
    price: '',
    description: '',
    categoryId: '',
    image: null, // Image file state
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
const token = localStorage.getItem('token');
  // Fetch categories from the backend
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
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch product data by ID to populate the form
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7050/api/product/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const result = await response.json();
        setFormData({
          id: result.id,
          productName: result.productName,
          price: result.price,
          description: result.description,
          categoryId: result.categoryId,
          image: result.imgPath, // Assuming the backend returns the image URL
        });
        setImagePreview(`https://localhost:7050${result.imgPath}`); // Show the existing image preview
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    
    // Set the preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Read the selected image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('productName', formData.productName);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('categoryId', formData.categoryId);

    if (formData.image) {
      formDataToSubmit.append('image', formData.image); // Add the new image if selected
    }

    try {
      const response = await fetch(`https://localhost:7050/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'PUT',
        body: formDataToSubmit,
      });

      if (response.ok) {
        alert('Product updated successfully!');
        navigate('/'); // Redirect to the product list page after successful update
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Something went wrong.'}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Edit Product</h2>
      <hr />
      <Container className="shadow px-4 pt-1 pb-4">
        <h4 className="mt-5">Product Details:</h4>
        {loading ? (
          <h1>Loading...</h1>
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
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Image Upload Section */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Product Image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-3">
                  <h5>Selected Image:</h5>
                  <img
                    src={`${imagePreview}`}
                    alt="Product Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Container>
    </Container>
  );
};

export default EditProduct;
