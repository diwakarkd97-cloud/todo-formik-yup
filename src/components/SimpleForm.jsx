import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SimpleForm = ({ onClose }) => {
  // Yup Validation Schema
  const validationSchema = Yup.object({
    bookTitle: Yup.string().required('Book title is required'),
    isbn: Yup.string().required('ISBN number is required'),
    publicationDate: Yup.date().required('Publication date is required'),
    authorName: Yup.string().required('Author name is required'),
    dob: Yup.date().required('Date of birth is required'),
    bio: Yup.string().required('Short biography is required'),
  });

  // Initial Form Values
  const initialValues = {
    bookTitle: '',
    isbn: '',
    publicationDate: '',
    authorName: '',
    dob: '',
    bio: '',
  };

  // Form Submission Handler
  const onSubmit = (values, { resetForm }) => {
    console.log('Form Data Submitted:', values);
    alert('Book added successfully!');
    resetForm();
    onClose(); // Close modal after successful submission
  };

  return (
    <div className="form-card">
      {/* Close Button */}
      <button className="close-btn" onClick={onClose} type="button">
        ×
      </button>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="form-content">
            
            {/* --- BOOK DETAILS SECTION --- */}
            <div className="form-section">
              <h3 className="section-title">Book Details</h3>
              
              <div className="form-group">
                <Field 
                  type="text" 
                  name="bookTitle" 
                  placeholder="Book title" 
                  className="form-input" 
                />
                <ErrorMessage name="bookTitle" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <Field 
                  type="text" 
                  name="isbn" 
                  placeholder="ISBN number" 
                  className="form-input" 
                />
                <ErrorMessage name="isbn" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <label className="date-label">Publication date</label>
                <Field 
                  type="date" 
                  name="publicationDate" 
                  className="form-input date-input" 
                />
                <ErrorMessage name="publicationDate" component="div" className="error-text" />
              </div>
            </div>

            <hr className="divider" />

            {/* --- AUTHOR DETAILS SECTION --- */}
            <div className="form-section">
              <h3 className="section-title">Author Details</h3>
              
              <div className="form-group">
                <Field 
                  type="text" 
                  name="authorName" 
                  placeholder="Author name" 
                  className="form-input" 
                />
                <ErrorMessage name="authorName" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <label className="date-label">Date of birth</label>
                <Field 
                  type="date" 
                  name="dob" 
                  className="form-input date-input" 
                />
                <ErrorMessage name="dob" component="div" className="error-text" />
              </div>

              <div className="form-group">
                <Field 
                  type="text" 
                  name="bio" 
                  placeholder="Short biography" 
                  className="form-input" 
                />
                <ErrorMessage name="bio" component="div" className="error-text" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Add Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SimpleForm;