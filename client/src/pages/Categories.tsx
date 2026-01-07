import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from '../components/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Category = {
    _id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
};

const Categories = () => {
    const [data, setData] = useState<Category[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchCategories = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            };
            const res = await axios.get('http://localhost:5000/api/categories', config);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/categories/${id}`, config);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category', error);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span className={row.original.status === 'Active' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {row.original.status}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => navigate(`/categories/edit/${row.original._id}`)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Edit size={18} className="text-gray-600" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Trash size={18} className="text-red-600" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Category</h1>
                <Button onClick={() => navigate('/categories/add')}>Add Category</Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Categories;
