import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Link, Alert, InputAdornment, IconButton } from '@mui/material';
import { UserPlusIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register
  } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }
    // Mock registration - in real app this would be an API call
    setTimeout(() => {
      const newUser = {
        id: `user${Date.now()}`,
        username,
        email
      };
      register(newUser);
      navigate('/');
      setIsSubmitting(false);
    }, 1000);
  };
  return <Box className="flex justify-center py-8">
      <Paper className="p-8 w-full max-w-md">
        <Box className="text-center mb-6">
          <Typography variant="h4" component="h1" className="font-bold">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Join Flavor Exchange to share and discover recipes
          </Typography>
        </Box>
        {error && <Alert severity="error" className="mb-4">
            {error}
          </Alert>}
        <form onSubmit={handleRegister}>
          <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" required />
          <TextField label="Email Address" variant="outlined" fullWidth margin="normal" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
          <TextField label="Password" variant="outlined" fullWidth margin="normal" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" required InputProps={{
          endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </IconButton>
                </InputAdornment>
        }} />
          <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={isSubmitting} startIcon={<UserPlusIcon size={18} />} className="mt-4">
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
          <Box className="mt-4 text-center">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>;
};
export default Register;