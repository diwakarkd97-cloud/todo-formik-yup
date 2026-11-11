import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SimpleForm = ({ onClose, onSave, bookToEdit }) => {
  // Updated Yup Validation Schema
  const validationSchema = Yup.object({
    bookTitle: Yup.string().required('Book title is required'),
    isbn: Yup.string()
      .matches(/^[0-9]+$/, 'ISBN must contain only numbers')
      .required('ISBN number is required'),
    publicationDate: Yup.date().required('Publication date is required'),
    authorName: Yup.string().required('Author name is required'),
    dob: Yup.date().required('Date of birth is required'),
    bio: Yup.string()
      .min(10, 'Biography must be at least 10 characters')
      .test('max-words', 'Biography must not exceed 150 words', (value) => {
        if (!value) return true; 
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 150;
      })
      .required('Short biography is required'),
  });

  // Initial Form Values (Populates if editing, otherwise blank)
  const initialValues = bookToEdit || {
    id: Date.now().toString(), // Generate a unique ID for new books
    bookTitle: '',
    isbn: '',
    publicationDate: '',
    authorName: '',
    dob: '',
    bio: '',
  };

  // Form Submission Handler
  const onSubmit = (values, { resetForm }) => {
    // If it's a new book, ensure it gets an ID
    if (!bookToEdit) {
      values.id = Date.now().toString();
    }
    
    onSave(values); // Pass data back to App.jsx
    resetForm();
    onClose(); 
  };

  return (
    <div className="form-card">
      <button className="close-btn" onClick={onClose} type="button">
        ×
      </button>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize // Allows form to update when editing different books
      >
        {() => (
          <Form className="form-content">
            {/* --- BOOK DETAILS SECTION --- */}
            <div className="form-section">
              <h3 className="section-title">Book Details</h3>
              
              <div className="form-group">
                <Field type="text" name="bookTitle" placeholder="Book title" className="form-input" />
                <ErrorMessage name="bookTitle" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <Field type="text" name="isbn" placeholder="ISBN number" className="form-input" />
                <ErrorMessage name="isbn" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <label className="date-label">Publication date</label>
                <Field type="date" name="publicationDate" className="form-input date-input" />
                <ErrorMessage name="publicationDate" component="div" className="error-text" />
              </div>
            </div>

            <hr className="divider" />

            {/* --- AUTHOR DETAILS SECTION --- */}
            <div className="form-section">
              <h3 className="section-title">Author Details</h3>
              
              <div className="form-group">
                <Field type="text" name="authorName" placeholder="Author name" className="form-input" />
                <ErrorMessage name="authorName" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <label className="date-label">Date of birth</label>
                <Field type="date" name="dob" className="form-input date-input" />
                <ErrorMessage name="dob" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <Field as="textarea" name="bio" placeholder="Short biography" className="form-input" rows="3" />
                <ErrorMessage name="bio" component="div" className="error-text" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              {bookToEdit ? 'Update Book' : 'Add Book'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SimpleForm;