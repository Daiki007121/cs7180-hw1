import React, { useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
}

export function DataTable({ data, columns }: DataTableProps) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);
  const pageSize = 10;

  const filtered = data.filter((row: any) =>
    Object.values(row).some((val: any) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sorted = sort
    ? [...filtered].sort((a: any, b: any) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];
        const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sort.dir === 'asc' ? compare : -compare;
      })
    : filtered;

  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <input
        placeholder="Filter..."
        value={filter}
        onChange={(e) => { setFilter(e.target.value); setPage(0); }}
      />
      
      <table>
        <thead>
          <tr>
            {columns.map((col: Column) => (
              <th key={col.key} onClick={() => setSort(
                sort?.key === col.key && sort?.dir === 'asc'
                  ? { key: col.key, dir: 'desc' }
                  : { key: col.key, dir: 'asc' }
              )}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row: any, i: number) => (
            <tr key={i}>
              {columns.map((col: Column) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
          Prev
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={(page + 1) * pageSize >= sorted.length}>
          Next
        </button>
      </div>
    </div>
  );
}
