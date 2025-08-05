import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password,email)
        try {
            const res = await axios.post('http://localhost:3000/login', {
                email,
                password
            })
            if (res.status === 200) {
                toast.success('Login successful!');
                navigate('/');
                console.log(res.data)

                localStorage.setItem("token", res.data.token)
                localStorage.setItem("role", res.data.user.role)
                localStorage.setItem("userId", res.data.user._id)
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to access your loan dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <span
                                className="font-medium text-primary hover:underline cursor-pointer"
                                onClick={() => navigate('/signup')}
                            >
                                Signup
                            </span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
