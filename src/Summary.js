import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Summary = () => {
  const { id } = useParams();
  const bills = JSON.parse(localStorage.getItem('bills')) || [];
  const bill = bills[id];

  return (
    <div className="summary">
      <h2>Bill Summary</h2>
      <p><strong>Patient Name:</strong> {bill.patientName}</p>
      <p><strong>Address:</strong> {bill.address}</p>
      <p><strong>Hospital Name:</strong> {bill.hospitalName}</p>
      <p><strong>Date of Service:</strong> {bill.dateOfService}</p>
      <p><strong>Bill Amount:</strong> {bill.billAmount}</p>
      <p><strong>Bill Picture:</strong></p>
      {bill.billPicture && <img src={URL.createObjectURL(bill.billPicture)} alt="Bill" />}
      <div>
        <Link to="/create" className="btn">
          Edit Bill
        </Link>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Summary;