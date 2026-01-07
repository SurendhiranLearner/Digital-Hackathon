import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from '../components/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

import { Edit2, Trash2, Plus } from 'lucide-react';

type Item = {
    _id: string;
    name: string;
    email: string;
    status: string;
    value?: number;
    category?: string;
};

const Dashboard = () => {
    const [data, setData] = useState<Item[]>([]);
    const { user } = useAuth();

    const columns: ColumnDef<Item>[] = [
        {
            accessorKey: '_id',
            header: 'ID',
            cell: ({ row }) => <span className="font-mono text-xs">{row.original._id.slice(-6).toUpperCase()}</span>
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {row.original.status}
                </span>
            )
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleEdit(row.original._id)}
                        className="p-1 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const res = await axios.get('http://localhost:5000/api/data', config);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleEdit = (id: string) => {
        console.log('Edit record:', id);
        // navigate(`/dashboard/edit/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/data/${id}`, config);
                fetchData();
            } catch (error) {
                console.error('Error deleting record', error);
            }
        }
    };

    const handleAddRecord = () => {
        console.log('Add Record');
        // navigate('/dashboard/add');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 focus:outline-none">Dashboard</h1>
                <Button onClick={handleAddRecord} className="flex items-center gap-2">
                    <Plus size={18} />
                    Add Record
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Dashboard;
