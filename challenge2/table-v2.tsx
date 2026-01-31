// React Table V2
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
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const filtered = data.filter((row: any) =>
        Object.values(row).some((val: any) =>
            String(val).toLowerCase().includes(filter.toLowerCase())
        )
    );

    const sorted = sortKey
        ? [...filtered].sort((a: any, b: any) => (a[sortKey] > b[sortKey] ? 1 : -1))
        : filtered;

    const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

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
                        {columns.map((col: Column) => (
                            <th key={col.key} onClick={() => setSortKey(col.key)}>
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
                <button onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>Page {page + 1}</span>
                <button onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
}
