import React, { useState } from 'react';
import SimpleForm from './components/SimpleForm';
import './App.css';

// Book Card Component
const BookCard = ({ book, onEdit, onDelete }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="book-card-display">
      <p>Book Name: {book.bookTitle}</p>
      <p>ISBN Number: {book.isbn}</p>
      <p>Publication Date: {book.publicationDate}</p>

      {/* Expanded Author Info */}
      {showMore && (
        <div className="extra-details">
          <p>Author: {book.authorName}</p>
          <p>DOB: {book.dob}</p>
          <p>Bio: {book.bio}</p>
        </div>
      )}

      {/* Actions Row */}
      <div className="card-actions">
        <span className="show-more-link" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </span>
        <div className="btn-group">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([]); // State to store the list of books
  const [editingBook, setEditingBook] = useState(null); // State to track which book is being edited

  const handleOpenModal = () => {
    setEditingBook(null); // Clear edit state for a new book
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  // Add or Update Book Handler
  const handleSaveBook = (savedBook) => {
    if (editingBook) {
      // Update existing book
      setBooks(books.map(book => (book.id === savedBook.id ? savedBook : book)));
    } else {
      // Add new book
      setBooks([...books, savedBook]);
    }
  };

  // Delete Book Handler
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Trigger Edit Modal
  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard-container">
      <div className="header-area">
        <div className="dashboard-title">Admin Dashboard</div>
        <button className="add-book-trigger-btn" onClick={handleOpenModal}>
          Add Book
        </button>
      </div>

      {/* Render the list of books */}
      <div className="books-list">
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            onEdit={() => handleEditBook(book)} 
            onDelete={() => handleDeleteBook(book.id)} 
          />
        ))}
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay">
          <SimpleForm 
            onClose={handleCloseModal} 
            onSave={handleSaveBook} 
            bookToEdit={editingBook} 
          />
        </div>
      )}
    </div>
  );
};

export default App;