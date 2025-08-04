import type { Customer, CustomerDetail } from '../types/customer';

const BASE_URL = 'http://localhost:8000';

export async function fetchCustomers(
  query = '',
  billingPeriod = '',
  page = 1
): Promise<{
  current_page: number;
  data: Customer[];
  total: number;
  last_page: number;
  from: number;
  to: number;
}> {
  const params = new URLSearchParams({
    ...(query && { query }),
    ...(billingPeriod && { billing_period: billingPeriod }),
    page: String(page),
  });

  const res = await fetch(`${BASE_URL}/customers?${params}`);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
}


export async function fetchCustomerById(id: number): Promise<CustomerDetail> {
  const res = await fetch(`${BASE_URL}/customers/${id}`);
  if (!res.ok) throw new Error('Failed to fetch customer details');
  const json = await res.json();
  return json.data;
}
