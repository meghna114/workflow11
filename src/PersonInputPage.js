import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PersonInputPage.css'; // Import the CSS file

const PersonInputPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // Parse JSON input
      const personData = JSON.parse(jsonInput);

      // Normalize field names and values to lowercase
      const normalizedData = {
        name: personData.name ? personData.name.toLowerCase() : '',
        gender: personData.gender ? personData.gender.toLowerCase() : '',
        dob: personData.dob ? personData.dob.toLowerCase() : '',
        pincode: personData.pincode ? personData.pincode.toLowerCase() : ''
      };

      // Validate required fields
      const { name, gender, dob, pincode } = normalizedData;
      if (!name || !gender || !dob || !pincode) {
        setError('All fields (name, gender, dob, pincode) are required');
        return;
      }

      // If valid, clear errors and navigate to the next page
      setError('');
      navigate('/workflow-tree');
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="person-input-page">
      <h1>Enter Personal Information in JSON Format</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <textarea
          id="json-input"
          rows="10"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter your JSON data here (e.g., {"name": "John Doe", "gender": "Male", "dob": "1990-01-01", "pincode": "123456"})'
          className="json-textarea"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PersonInputPage;
