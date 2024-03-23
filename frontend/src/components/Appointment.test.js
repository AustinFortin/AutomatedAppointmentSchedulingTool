import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterWithRouter from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';


global.fetch = jest.fn();


test('renders correct controls for a doctor with a pending appointment', () => {
    const userDetails = { type: 'doctor' };
    const appointmentDetails = { accepted: false, rejected: false };
    const { getByText } = render(<Appointment userDetails={userDetails} appointmentDetails={appointmentDetails} />);
  
    expect(getByText('Accept Appointment Request')).toBeInTheDocument();
    expect(getByText('Reject Appointment Request')).toBeInTheDocument();
  });

test('sends correct request when accepting an appointment', async () => {
   
    const userDetails = { type: 'doctor' };
    const appointmentDetails = { id: 1, accepted: false, rejected: false };
    const { getByText, getByPlaceholderText } = render(<Appointment userDetails={userDetails} appointmentDetails={appointmentDetails} />);
  
    fireEvent.change(getByPlaceholderText('Time in hh:mm format (24-hour clock)'), { target: { value: '09:00' } });
    fireEvent.change(getByPlaceholderText('Optional message to patient'), { target: { value: 'See you then' } });
    fireEvent.click(getByText('Accept Appointment Request'));
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/accept_appointment', expect.anything());
    });
});

test('sends correct request when rejecting an appointment', async () => {
    
    const userDetails = { type: 'doctor' };
    const appointmentDetails = { id: 1, accepted: false, rejected: false };
    const { getByText } = render(<Appointment userDetails={userDetails} appointmentDetails={appointmentDetails} />);
  
    fireEvent.click(getByText('Reject Appointment Request'));
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/reject_appointment', expect.anything());
    });
});

test('sends correct request when deleting an appointment', async () => {
   
    const userDetails = { type: 'patient' };
    const appointmentDetails = { id: 1, accepted: false, rejected: false };
    const { getByText } = render(<Appointment userDetails={userDetails} appointmentDetails={appointmentDetails} />);
  
    fireEvent.click(getByText('Delete Appointment Request'));
  
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/delete_appointment', expect.anything());
    });
});


