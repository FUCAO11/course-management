"use client";

import { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';

export default function CustomersPage() {
  // State for storing customers and the form data for new or updated customers
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: '',
  });
  const [editingCustomerId, setEditingCustomerId] = useState(null); // Track if we are editing a customer

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    const response = await fetch('/api/customer');
    const data = await response.json();
    setCustomers(data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (either for adding or updating a customer)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCustomerId) {
      // Update an existing customer
      const response = await fetch(`/api/customer/${editingCustomerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Customer updated successfully');
        setEditingCustomerId(null); // Reset editing state
      } else {
        alert('Failed to update customer');
      }
    } else {
      // Add a new customer
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Customer added successfully');
      } else {
        alert('Failed to add customer');
      }
    }

    // Clear form and fetch updated customer list
    setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    fetchCustomers();
  };

  // Handle deleting a customer
  const handleDelete = async (id) => {
    const response = await fetch(`/api/customer/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Customer deleted successfully');
      fetchCustomers();
    } else {
      alert('Failed to delete customer');
    }
  };

  // Handle editing a customer (populate the form with existing data)
  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0], // 格式化日期为 YYYY-MM-DD
      memberNumber: customer.memberNumber,
      interests: customer.interests,
    });
    setEditingCustomerId(customer._id); // Set editing ID to the customer being edited
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Customers</h1>

      {/* Form for adding/updating customers */}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <input
              type="date"
              name="dateOfBirth"
              lang="en"  // Ensure the date input is in English
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <input
              type="number"
              name="memberNumber"
              placeholder="Member Number"
              value={formData.memberNumber}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              value={formData.interests}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editingCustomerId ? 'Update Customer' : 'Add Customer'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Customer List */}
      <Box sx={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}><strong>Name</strong></Grid>
          <Grid item xs={12} md={3}><strong>Date of Birth</strong></Grid>
          <Grid item xs={12} md={3}><strong>Member Number</strong></Grid>
          <Grid item xs={12} md={3}><strong>Actions</strong></Grid>
        </Grid>

        {customers.map((customer) => (
          <Grid container spacing={2} key={customer._id} sx={{ marginTop: '10px' }}>
            <Grid item xs={12} md={3}>{customer.name}</Grid>
            <Grid item xs={12} md={3}>{new Date(customer.dateOfBirth).toLocaleDateString()}</Grid>
            <Grid item xs={12} md={3}>{customer.memberNumber}</Grid>
            <Grid item xs={12} md={3}>
              <Button variant="outlined" onClick={() => handleEdit(customer)} sx={{ marginRight: '10px' }}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(customer._id)}>Delete</Button>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
