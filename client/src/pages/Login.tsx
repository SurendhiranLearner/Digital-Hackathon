import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', data);
            login(res.data.token, res.data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login failed', error);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
            <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
                {/* Left Side (Image/Branding) */}
                <div className="hidden md:flex w-1/2 bg-[#5C218B] items-center justify-center flex-col text-white p-10 relative">
                    <div className="absolute top-10 left-10 font-bold text-2xl">Digitalflake</div>
                    <div className="mt-20">
                        <h2 className="text-4xl font-bold mb-4">Welcome to Digitalflake Admin</h2>
                        <p className="text-lg opacity-80">Manage your comprehensive dashboard with ease.</p>
                    </div>
                    {/* Placeholder Pattern/Image */}
                    <div className="absolute bottom-0 right-0 opacity-20">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="100" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">Log In</h2>
                        <p className="text-gray-500 mt-2">Welcome to Digitalflake admin</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Input
                                label="Email-id"
                                placeholder="Enter your email"
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                error={errors.email?.message as string}
                                className="h-12"
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password', { required: 'Password is required' })}
                                error={errors.password?.message as string}
                                className="h-12"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <Link to="/forgot-password" className="text-sm text-[#5C218B] hover:underline font-medium">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg bg-[#5C218B] hover:bg-[#4a1a70]">
                            Log In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <Link to="/register" className="text-gray-500 hover:text-[#5C218B]">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
