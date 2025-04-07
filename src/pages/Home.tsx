import React, { useEffect, useState } from 'react';
import { Typography, TextField, InputAdornment, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, CircularProgress, useTheme } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';

const Home: React.FC = () => {
  const theme = useTheme();
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
  return (
    <Box className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" sx={{ bgcolor: 'background.default' }}>
      <Box className="text-center mb-8 pt-8">
        <Typography variant="h3" component="h1" className="font-bold mb-4" sx={{ color: 'text.primary' }}>
          Discover Delicious Recipes
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }} className="mb-6">
          Find and share the best recipes from around the world
        </Typography>
      </Box>

      <Box className="mb-8">
        <Box className="flex flex-col md:flex-row gap-4">
          <Box className="flex-1">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search recipes by name or ingredients..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={20} className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 0.7,
                  },
                },
              }}
            />
          </Box>
          <Box className="w-full md:w-1/3">
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ color: 'text.secondary' }}>Dietary Preference</InputLabel>
              <Select
                value={dietaryFilter}
                onChange={handleDietaryChange}
                label="Dietary Preference"
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '& .MuiSelect-icon': {
                    color: 'text.secondary',
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {dietaryOptions.map((option) => (
                  <MenuItem key={option} value={option} sx={{ color: 'text.primary' }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box>
      ) : filteredRecipes.length > 0 ? (
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {filteredRecipes.map((recipe) => (
            <Box key={recipe.id} className="h-full">
              <RecipeCard recipe={recipe} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="text-center py-12">
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            No recipes found. Try adjusting your search.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Home;