export interface Order {
  id: string;
  productName: string;
  productImage: string;
  color: string;
  size: string;
  price: number;
  status: 'delivered' | 'cancelled' | 'exchanged';
  reason: string;
  orderId: string;
  note: string;
}

export const orders: Order[] = [
  {
    id: '1',
    productName: 'HELMONT Solid Men Hooded Neck Green T-Shirt',
    productImage:
      'https://images.pexels.com/photos/54334/running-shoe-shoe-brooks-highly-functional-54334.jpg',
    color: 'Green',
    size: 'S',
    price: 269,
    status: 'delivered',
    reason: 'Order delivered.',
    orderId: '12303311728493294756',
    note: 'We have delivered your order successfully.',
  },
  {
    id: '2',
    productName: 'ABC Printed Round Neck T-Shirt',
    productImage:
      'https://images.pexels.com/photos/54334/running-shoe-shoe-brooks-highly-functional-54334.jpg',
    color: 'Black',
    size: 'M',
    price: 399,
    status: 'cancelled',
    reason: 'Order cancelled by user.',
    orderId: '98203311728493294756',
    note: 'Your order has been cancelled as per your request.',
  },
  {
    id: '3',
    productName: 'XYZ Stylish Jacket',
    productImage:
      'https://images.pexels.com/photos/54334/running-shoe-shoe-brooks-highly-functional-54334.jpg',
    color: 'Blue',
    size: 'L',
    price: 899,
    status: 'exchanged',
    reason: 'You requested an exchange due to size issues.',
    orderId: '77203311728493294756',
    note: 'We have completed your request for exchange.',
  },
];
