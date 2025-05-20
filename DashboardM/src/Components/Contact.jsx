import React from 'react';

const Contact = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul className="list-group list-group-flush fs-5">
            <li className="list-group-item">
              <strong>Phone:</strong> +91 98765 43210
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> support@ecommerce.com
            </li>
            <li className="list-group-item">
              <strong>Address:</strong> 123 Market Street, Mumbai, India
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
