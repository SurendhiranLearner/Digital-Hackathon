import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', data);
            login(res.data.token, res.data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Registration failed', error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email-id"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={errors.email?.message as string}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Choose a password"
                        {...register('password', { required: 'Password is required' })}
                        error={errors.password?.message as string}
                    />
                    <Button type="submit" className="w-full">Sign Up</Button>
                </form>
                <div className="text-center">
                    <Link to="/login" className="text-blue-600 hover:text-blue-500">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
