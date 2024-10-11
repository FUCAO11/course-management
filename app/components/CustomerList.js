import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  // Fetch customers when component mounts
  useEffect(() => {
    fetch('/api/customer')
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/customer?id=${id}`, { method: 'DELETE' });
    setCustomers(customers.filter((customer) => customer._id !== id));
  };

  return (
    <div>
      <h1>Customer List</h1>
      <Link href="/add-customer">Add New Customer</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.interests}
            <Link href={`/customer/${customer._id}`}>View Details</Link>
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
