import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, CircularProgress, Alert, useTheme } from '@mui/material';
import { HeartIcon, PlusCircleIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import RecipeCard from '../components/RecipeCard';

const Favorites: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { recipes, getUserFavorites, isLoading } = useRecipeStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const userFavorites = user ? getUserFavorites(user.id) : [];
  const favoriteRecipes = recipes.filter(recipe => userFavorites.includes(recipe.id));

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
            Your Favorites
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
        ) : favoriteRecipes.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteRecipes.map(recipe => (
              <Box key={recipe.id} className="h-full">
                <RecipeCard recipe={recipe} />
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
            <HeartIcon 
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
              You haven't saved any favorites yet
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                mb: 6
              }}
            >
              Browse recipes and click the heart icon to add them to your favorites
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/')}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Discover Recipes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;