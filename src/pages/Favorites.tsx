import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { HeartIcon, PlusCircleIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import RecipeCard from '../components/RecipeCard';
const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const {
    recipes,
    getUserFavorites,
    isLoading
  } = useRecipeStore();
  const {
    isAuthenticated,
    user
  } = useAuthStore();
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
  return <div>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold">
          Your Favorites
        </Typography>
        <Button variant="contained" color="primary" startIcon={<PlusCircleIcon size={18} />} onClick={() => navigate('/create-recipe')}>
          Add Recipe
        </Button>
      </Box>
      {isLoading ? <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box> : favoriteRecipes.length > 0 ? <Grid container spacing={4}>
          {favoriteRecipes.map(recipe => <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard recipe={recipe} />
            </Grid>)}
        </Grid> : <Box className="text-center py-12 px-4">
          <HeartIcon size={64} className="mx-auto mb-4 text-gray-300" />
          <Typography variant="h6" color="textSecondary" className="mb-2">
            You haven't saved any favorites yet
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-6">
            Browse recipes and click the heart icon to add them to your
            favorites
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Discover Recipes
          </Button>
        </Box>}
    </div>;
};
export default Favorites;