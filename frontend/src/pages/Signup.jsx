import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [image,setImage] = useState('')
  const [imageUrl,setImageUrl] = useState('')

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('email', email);
      // formData.append('password', password);
      // formData.append('phoneNumber', phoneNumber);
      // formData.append('cnic', cnic);
      // formData.append('role', role);
      // if (profileImage) {
      //   formData.append('imageUrl', profileImage);
      // }

      const res = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        password,
        phoneNumber,
        cnic,
        role,
        imageUrl
      });

      if (res.status === 200) {
        toast.success('Signup successful!');
        navigate('/verifypage');
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
          <CardTitle className="text-2xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription>
            Join us to start your loan application journey
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                name="cnic"
                type="text"
                required
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="Enter your CNIC"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. customer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

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

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                className="font-medium text-primary hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
