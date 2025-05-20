import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are dedicated to providing the best online shopping experience with top-quality products and unbeatable service.
            </p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
                <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/dashboard" className="text-white text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
              
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@dp.com</p>
            <p>Phone: +91 1234567890</p>
            <p>SM Vita, Juhu, India</p>
          </Col>
        </Row>

        <hr className="border-top border-light" />

        <div className="text-center">
          <small>© {new Date().getFullYear()} Our Store. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
