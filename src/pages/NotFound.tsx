import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Paper } from '@mui/material';
import { HomeIcon } from 'lucide-react';
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return <Box className="flex justify-center items-center py-16">
      <Paper className="p-8 text-center max-w-md">
        <Typography variant="h2" className="font-bold mb-2">
          404
        </Typography>
        <Typography variant="h5" className="mb-4">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" className="mb-6">
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" startIcon={<HomeIcon size={18} />} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Paper>
    </Box>;
};
export default NotFound;