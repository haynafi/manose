const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchInventory() {
  const response = await fetch(`${API_BASE_URL}/inventory`);
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }
  return response.json();
}

export async function addInventoryItem(item: {
  items_name: string;
  category: string;
  first_stock: number;
  unit: string;
}) {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error('Failed to add inventory item');
  }
  return response.json();
}

export async function fetchPIC() {
  const response = await fetch(`${API_BASE_URL}/pic`);
  if (!response.ok) {
    throw new Error('Failed to fetch PIC data');
  }
  return response.json();
}

export async function addPIC(pic: {
  pic_name: string;
  pic_phone_number: string;
  pic_email: string;
  pic_unit: string;
}) {
  const response = await fetch(`${API_BASE_URL}/pic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pic),
  });
  if (!response.ok) {
    throw new Error('Failed to add PIC');
  }
  return response.json();
}

