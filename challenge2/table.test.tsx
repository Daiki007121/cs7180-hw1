import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './table-v3';

const data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 20 },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
];

describe('DataTable', () => {
  test('renders data', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('filters data', () => {
    render(<DataTable data={data} columns={columns} />);
    fireEvent.change(screen.getByPlaceholderText('Filter...'), { target: { value: 'Bob' } });
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  test('sorts data', () => {
    render(<DataTable data={data} columns={columns} />);
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('20');
  });
});
