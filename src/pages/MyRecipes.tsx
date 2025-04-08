import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, CircularProgress, Alert, Paper, useTheme } from '@mui/material';
import { ChefHatIcon, PlusCircleIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import RecipeCard from '../components/RecipeCard';

const MyRecipes: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { recipes, isLoading, fetchRecipes } = useRecipeStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Fetch latest recipes when component mounts
    fetchRecipes();
  }, [isAuthenticated, navigate, fetchRecipes]);

  const userRecipes = recipes.filter(recipe => recipe.author.id === user?.id);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Box className="min-h-screen" sx={{ bgcolor: 'background.default' }}>
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Box className="flex justify-between items-center mb-8">
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: 'text.primary',
              fontSize: '2rem',
              fontWeight: 600
            }}
          >
            My Recipes
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<PlusCircleIcon size={18} />} 
            onClick={() => navigate('/create-recipe')}
            sx={{
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Add Recipe
          </Button>
        </Box>

        {isLoading ? (
          <Box className="flex justify-center py-12">
            <CircularProgress />
          </Box>
        ) : userRecipes.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userRecipes.map(recipe => (
              <Box key={recipe.id} className="h-full">
                <RecipeCard recipe={recipe} showEditButton />
              </Box>
            ))}
          </Box>
        ) : (
          <Box 
            className="text-center py-16 px-4 rounded-lg"
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: 1,
              borderColor: 'divider'
            }}
          >
            <ChefHatIcon 
              size={64} 
              className="mx-auto mb-6" 
              style={{ 
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' 
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.primary',
                mb: 2,
                fontWeight: 500
              }}
            >
              You haven't created any recipes yet
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                mb: 6
              }}
            >
              Share your culinary creations with the Flavor Exchange community
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PlusCircleIcon size={18} />} 
              onClick={() => navigate('/create-recipe')}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Create First Recipe
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyRecipes;