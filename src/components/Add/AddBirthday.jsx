import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './AddBirthday.css';

Modal.setAppElement('#root');

const AddBirthday = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    country: '',
    city: ''
  });

  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/members', formData);
      setMessage('');
      setModalIsOpen(true);
    } catch (error) {
      let errorMessage = 'Failed to add birthday';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message;
        }
      }
      setMessage(errorMessage);
    }
  };

  const handleAddAnother = () => {
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      country: '',
      city: ''
    });
    setMessage('');
    setModalIsOpen(false);
  };

  const handleViewMembers = () => {
    navigate('/list');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      country: '',
      city: ''
    });
  };

  // Test the connection to the backend on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/api/members')
      .then(response => console.log('Connection successful:', response))
      .catch(error => console.error('Connection failed:', error));
  }, []);

  return (
    <div className={`container ${modalIsOpen ? 'modal-open' : ''}`}>
      <div className="form-wrapper">
        <h2>Add New Birthday</h2>
        <div className={`message-container ${message && !modalIsOpen ? 'error' : ''}`}>
          {message && !modalIsOpen && <p className="message">{message}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Birth Date:
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Birthday</button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Birthday added successfully!</h2>
        <button onClick={handleAddAnother}>Add Another</button>
        <button onClick={handleViewMembers}>View Members</button>
      </Modal>
    </div>
  );
};

export default AddBirthday;
