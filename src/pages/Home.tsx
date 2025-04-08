import React, { useEffect, useState } from 'react';
import { Typography, TextField, InputAdornment, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, CircularProgress, useTheme, Container, Paper } from '@mui/material';
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
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: { xs: 0, md: 1 },
        px: { xs: 0, md: 2 }
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: '16px 12px', md: 3 },
          borderRadius: 4,
          bgcolor: 'background.default',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
        }}
      >
        <Box className="text-center mb-6">
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 1.5,
              color: 'text.primary',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              lineHeight: { xs: 1.2, md: 1.3 }
            }}
          >
            Discover Delicious Recipes
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }
            }}
          >
            Find and share the best recipes from around the world
          </Typography>
        </Box>

        <Box 
          sx={{ 
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            '& > *': { flex: 1 }
          }}
        >
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
              sx: { height: 56 }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
                height: 23,
                '&::placeholder': {
                  color: 'text.secondary',
                  opacity: 0.7,
                },
              },
            }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel 
              sx={{ 
                color: 'text.secondary',
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -6px) scale(0.75)'
                }
              }}
            >
              Dietary Preference
            </InputLabel>
            <Select
              value={dietaryFilter}
              onChange={handleDietaryChange}
              label="Dietary Preference"
              sx={{
                height: 56,
                bgcolor: 'background.paper',
                color: 'text.primary',
                borderRadius: 2,
                '& .MuiSelect-select': {
                  pt: 2,
                  pb: 1,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
                '& .MuiSelect-icon': {
                  color: 'text.secondary',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '& .MuiMenuItem-root': {
                      py: 1,
                    }
                  }
                }
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

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredRecipes.length > 0 ? (
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3,
              mb: 4
            }}
          >
            {filteredRecipes.map((recipe) => (
              <Box key={recipe.id} sx={{ height: '100%' }}>
                <RecipeCard recipe={recipe} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              No recipes found. Try adjusting your search.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
export default Home;