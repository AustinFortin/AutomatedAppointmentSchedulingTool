import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterWithRouter from "react-router"; 
import { BrowserRouter as Router } from 'react-router-dom';


test('displays specialization field when account type is doctor', () => {
    const { getByLabelText, queryByPlaceholderText } = render(<Router><RegisterWithRouter /></Router>);
  
    fireEvent.change(getByLabelText('Account Type'), { target: { value: 'doctor' } });
    
    expect(queryByPlaceholderText('Specialization')).toBeInTheDocument();
});


test('validates that password and confirmation password match', async () => {
    
    const { getByPlaceholderText, getByText, findByText } = render(<Router><RegisterWithRouter /></Router>);
  
    
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(getByText('Register'));
  
    
    const errorMessage = await findByText(/Password and confirmation do not match./i);
    expect(errorMessage).toBeInTheDocument();
});

test('displays error message for invalid email format', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<Router><RegisterWithRouter /></Router>);

    fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'invalid-email' } });
    fireEvent.click(getByText('Register'));

    
    const errorMessage = await findByText(/Please include an "@" in the email address./i);
    expect(errorMessage).toBeInTheDocument();
  });