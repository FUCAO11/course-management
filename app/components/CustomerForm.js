import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CustomerForm({ customer }) {
  const [name, setName] = useState(customer ? customer.name : '');
  const [dateOfBirth, setDateOfBirth] = useState(customer ? customer.dateOfBirth : '');
  const [memberNumber, setMemberNumber] = useState(customer ? customer.memberNumber : '');
  const [interests, setInterests] = useState(customer ? customer.interests : '');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, dateOfBirth, memberNumber, interests };

    if (customer) {
      // Update customer
      await fetch(`/api/customer?id=${customer._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      // Add new customer
      await fetch('/api/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Date of Birth:</label>
      <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

      <label>Member Number:</label>
      <input value={memberNumber} onChange={(e) => setMemberNumber(e.target.value)} required />

      <label>Interests:</label>
      <input value={interests} onChange={(e) => setInterests(e.target.value)} required />

      <button type="submit">{customer ? 'Update Customer' : 'Add Customer'}</button>
    </form>
  );
}
