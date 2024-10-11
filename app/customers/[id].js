import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/customer?id=${id}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer Details</h1>
      <p>Name: {customer.name}</p>
      <p>Date of Birth: {customer.dateOfBirth}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
