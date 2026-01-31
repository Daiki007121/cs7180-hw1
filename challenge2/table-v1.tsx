// React Table V1
import React, { useState } from 'react';

export function DataTable({ data, columns }) {
    const [sortKey, setSortKey] = useState(null);
    const [filter, setFilter] = useState('');

    const filtered = data.filter(row =>
        JSON.stringify(row).toLowerCase().includes(filter.toLowerCase())
    );

    const sorted = sortKey
        ? [...filtered].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1))
        : filtered;

    return (
        <div>
            <input
                placeholder="Filter..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} onClick={() => setSortKey(col.key)}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col) => (
                                <td key={col.key}>{row[col.key]}</td>
                            ))}
                        </tr>
          </tbody>
            </table>
        </div>
    );
}



