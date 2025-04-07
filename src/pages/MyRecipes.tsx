import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, CircularProgress, Alert, Paper } from '@mui/material';
import { ChefHatIcon, PlusCircleIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import RecipeCard from '../components/RecipeCard';
const MyRecipes: React.FC = () => {
  const navigate = useNavigate();
  const {
    recipes,
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
  const userRecipes = recipes.filter(recipe => recipe.author.id === user?.id);
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  return <div>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold">
          My Recipes
        </Typography>
        <Button variant="contained" color="primary" startIcon={<PlusCircleIcon size={18} />} onClick={() => navigate('/create-recipe')}>
          Add Recipe
        </Button>
      </Box>
      {isLoading ? <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box> : userRecipes.length > 0 ? <Grid container spacing={4}>
          {userRecipes.map(recipe => <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard recipe={recipe} showEditButton />
            </Grid>)}
        </Grid> : <Paper className="text-center py-12 px-4">
          <ChefHatIcon size={64} className="mx-auto mb-4 text-gray-300" />
          <Typography variant="h6" color="textSecondary" className="mb-2">
            You haven't created any recipes yet
          </Typography>
          <Typography variant="body2" color="textSecondary" className="mb-6">
            Share your culinary creations with the Flavor Exchange community
          </Typography>
          <Button variant="contained" color="primary" startIcon={<PlusCircleIcon size={18} />} onClick={() => navigate('/create-recipe')}>
            Create First Recipe
          </Button>
        </Paper>}
    </div>;
};
export default MyRecipes;