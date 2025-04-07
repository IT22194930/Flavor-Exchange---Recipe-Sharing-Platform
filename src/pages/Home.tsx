import React, { useEffect, useState } from 'react';
import { Typography, TextField, InputAdornment, Grid, Box, Chip, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';
const Home: React.FC = () => {
  const {
    recipes,
    fetchRecipes,
    isLoading
  } = useRecipeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  // Collect all unique dietary info from recipes
  const dietaryOptions = Array.from(new Set(recipes.flatMap(recipe => recipe.dietaryInfo)));
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  // Filter recipes based on search query and dietary filter
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = searchQuery === '' || recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDiet = dietaryFilter === '' || recipe.dietaryInfo.includes(dietaryFilter);
    return matchesSearch && matchesDiet;
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleDietaryChange = (event: SelectChangeEvent) => {
    setDietaryFilter(event.target.value);
  };
  return <div>
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" className="font-bold mb-4">
          Discover Delicious Recipes
        </Typography>
        <Typography variant="h6" color="textSecondary" className="mb-6">
          Find and share the best recipes from around the world
        </Typography>
      </Box>
      <Box className="mb-8">
      <Grid container spacing={3} alignItems="center">
  <Grid xs={12} md={8}>  {/* Remove 'item' prop */}
    <TextField fullWidth variant="outlined" /* ... */ />
  </Grid>
  <Grid xs={12} md={4}>  {/* Remove 'item' prop */}
    <FormControl fullWidth variant="outlined">
      {/* ... */}
    </FormControl>
  </Grid>
</Grid>

{/* Recipe cards grid */}
<Grid container spacing={4}>
  {filteredRecipes.map(recipe => (
    <Grid key={recipe.id} xs={12} sm={6} md={4}>  {/* Remove 'item' prop */}
      <RecipeCard recipe={recipe} />
    </Grid>
  ))}
</Grid>
      </Box>
      {isLoading ? <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box> : filteredRecipes.length > 0 ? <Grid container spacing={4}>
          {filteredRecipes.map(recipe => <Grid item key={recipe.id} xs={12} sm={6} md={4}>
              <RecipeCard recipe={recipe} />
            </Grid>)}
        </Grid> : <Box className="text-center py-12">
          <Typography variant="h6" color="textSecondary">
            No recipes found. Try adjusting your search.
          </Typography>
        </Box>}
    </div>;
};
export default Home;