import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginWithRouter from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';


test('renders without crashing and has essential elements', () => {
    const { getByText, getByPlaceholderText } = render(<Router><LoginWithRouter /></Router>);
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });


test('updates state on input field change', () => {
    const { getByPlaceholderText } = render(<Router><LoginWithRouter /></Router>);
  
    const usernameInput = getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    expect(usernameInput.value).toBe('newuser');
  
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    expect(passwordInput.value).toBe('newpassword');
});  

