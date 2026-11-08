import React, { useState } from 'react';
import SimpleForm from './components/SimpleForm';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      
      <div className="header-area">
        <div className="dashboard-title">
          Admin Dashboard
        </div>
        <button className="add-book-trigger-btn" onClick={handleOpenModal}>
          Add Book
        </button>
      </div>

      
      {isModalOpen && (
        <div className="modal-overlay">
          <SimpleForm onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default App;