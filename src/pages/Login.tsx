import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Link, Alert, InputAdornment, IconButton } from '@mui/material';
import { LogInIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { mockUsers } from '../mock/mockData';
const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    login
  } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }
    // Mock authentication - in real app this would be an API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        const {
          password,
          ...userWithoutPassword
        } = user;
        login(userWithoutPassword);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
      setIsSubmitting(false);
    }, 1000);
  };
  return <Box className="flex justify-center py-8">
      <Paper className="p-8 w-full max-w-md">
        <Box className="text-center mb-6">
          <Typography variant="h4" component="h1" className="font-bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to continue to Flavor Exchange
          </Typography>
        </Box>
        {error && <Alert severity="error" className="mb-4">
            {error}
          </Alert>}
        <form onSubmit={handleLogin}>
          <TextField label="Email Address" variant="outlined" fullWidth margin="normal" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
          <TextField label="Password" variant="outlined" fullWidth margin="normal" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required InputProps={{
          endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </IconButton>
                </InputAdornment>
        }} />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={isSubmitting} startIcon={<LogInIcon size={18} />} className="mt-4">
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
          <Box className="mt-4 text-center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register">
                Sign up
              </Link>
            </Typography>
          </Box>
          <Box className="mt-6 p-3 bg-gray-50 rounded text-center">
            <Typography variant="body2" color="textSecondary" className="mb-2">
              Demo Accounts (Email / Password):
            </Typography>
            <Typography variant="body2" color="primary">
              vegan@example.com / password123
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>;
};
export default Login;