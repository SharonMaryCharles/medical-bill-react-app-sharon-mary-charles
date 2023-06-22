import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const BlogBillEdit = () => 
{
  const [patientName, setPatientName] = useState('');
  const [address, setAddress] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [dateOfService, setDateOfService] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billPicture, setBillPicture] = useState(null);
  const history = useHistory();

  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const errorStyle = 
  {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  };

  const validateForm = () => 
  {
    const errors = {};

    if (patientName.trim() === '') 
    {
      errors.patientName = 'Error : Patient Name is required';
    }
    else if (!/^[A-Za-z\s]+$/.test(patientName)) 
    {
      errors.patientName = 'Error : Patient Name should contain alphabetic characters only';
    }

    if (address.trim() === '') 
    {
      errors.address = 'Error : Address is required';
    }

    if (hospitalName.trim() === '') 
    {
      errors.hospitalName = 'Error : Hospital Name is required';
    }

    if (dateOfService.trim() === '') 
    {
      errors.dateOfService = 'Error : Date of Service is required';
    }

    if (billAmount.trim() === '') 
    {
      errors.billAmount = 'Error : Bill Amount is required';
    } 
    else if (isNaN(billAmount)) 
    {
      errors.billAmount = 'Error : Bill Amount must be a number';
    }

    return errors;
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();

    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) 
    {

    const blog = { patientName, address, hospitalName, dateOfService, billAmount, billPicture };
    
    if (billPicture) 
    {
      const formData = new FormData();
      formData.append('billPicture', billPicture);
    
      fetch('http://localhost:8000/blogs/' + id, 
      { 
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog), formData 
      })
      .then(() => 
      {
        history.push('/');
      })
    }
   }
   else 
    {
      setErrors(validationErrors);
    }
  }

  const backHome = () =>
  {
    fetch('http://localhost:8000/blogs/', 
    {
      method: 'GET'
    })
    .then(() => 
    {
      history.push('/');
    })
  }

  return (
    <div className="edit">

      <h2>Edit Bill</h2>

      <form onSubmit={handleSubmit}>

        <label>Patient Name :</label>
        <input 
          type="text"  
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        
        {errors.patientName && <div className="error" style={errorStyle}>{errors.patientName}</div>}
        <br></br>

        <label>Address :</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        
        {errors.address && <div className="error" style={errorStyle}>{errors.address}</div>}
        <br></br>

        <label>Hospital Name :</label>
        <input 
          type="text"  
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
        
        {errors.hospitalName && <div className="error" style={errorStyle}>{errors.hospitalName}</div>}
        <br></br>

        <label>Date Of Service :</label>
        <input 
          type="date" 
          value={dateOfService}
          onChange={(e) => setDateOfService(e.target.value)}
        />
        
        {errors.dateOfService && <div className="error" style={errorStyle}>{errors.dateOfService}</div>}
        <br></br>

        <label>Bill Amount :</label>
        <input 
          type="text"  
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
        
        {errors.billAmount && <div className="error" style={errorStyle}>{errors.billAmount}</div>}
        <br></br>

        <label>Bill Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => 
          { 
            setBillPicture(e.target.files[0]);
            setBillPicture(URL.createObjectURL(e.target.files[0]));
          }}/>

          <br></br>

        {""}<button>Done</button>{" ------------------------------------ "} 
        <button onClick={backHome}>Back Home</button>
      </form>
    </div>
  );
}
 
export default BlogBillEdit;