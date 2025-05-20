import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-banner text-white text-center py-5" style={{ background: '#007bff', color: '#fff' }}>
        <Container>
          <h1>Welcome to Our Store</h1>
          <p>Discover the best deals on the latest products!</p>
          <Button variant="light" as={Link} to="/dashboard">Shop Now</Button>
        </Container>
      </div>

     
      {/* About Us Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">About Us</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              At Our Store, we believe in bringing you the best value and quality on a wide range of products. 
              With a commitment to customer satisfaction and a passion for innovation, we continuously strive 
              to make your shopping experience seamless and enjoyable. Whether you're looking for the latest 
              electronics, trendy fashion, or must-have home items, we've got you covered.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-light py-5 text-center">
        <Container>
          <h3>Don't Miss Our Weekly Deals!</h3>
          <p>Sign up to get special offers delivered to your inbox.</p>
          <Button variant="success">Sign Up</Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
