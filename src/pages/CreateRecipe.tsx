import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, ListItemText, Checkbox, SelectChangeEvent, IconButton, Alert, CircularProgress, useTheme } from '@mui/material';
import { PlusIcon, MinusIcon, SaveIcon, ArrowLeftIcon } from 'lucide-react';
import { useRecipeStore, Recipe } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto', 'Paleo', 'High Protein'];
const CreateRecipe: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    addRecipe
  } = useRecipeStore();
  const {
    user,
    isAuthenticated
  } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [cookingTime, setCookingTime] = useState(30);
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [dietaryInfo, setDietaryInfo] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };
  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  const handleDietaryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDietaryInfo(typeof value === 'string' ? value.split(',') : value);
  };
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Validate form
    if (!title || !description || !image) {
      setError('Please fill in all required fields');
      return;
    }
    if (ingredients.some(i => !i)) {
      setError('Please fill in all ingredients');
      return;
    }
    if (instructions.some(i => !i)) {
      setError('Please fill in all instructions');
      return;
    }
    const recipeData: Omit<Recipe, 'id' | 'createdAt'> = {
      title,
      description,
      image,
      cookingTime,
      servings,
      difficulty,
      ingredients: ingredients.filter(i => i),
      instructions: instructions.filter(i => i),
      author: {
        id: user?.id || 'unknown',
        username: user?.username || 'Anonymous'
      },
      rating: 0,
      tags,
      dietaryInfo
    };
    setIsSubmitting(true);
    try {
      const newRecipe = await addRecipe(recipeData);
      navigate(`/recipe/${newRecipe.id}`);
    } catch (err) {
      setError('Failed to create recipe. Please try again.');
      setIsSubmitting(false);
    }
  };
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  return (
    <Box className="min-h-screen" sx={{ bgcolor: 'background.default' }}>
      <Box className="max-w-3xl mx-auto px-4 py-8">
        <Button
          variant="text"
          color="inherit"
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeftIcon size={18} />}
          className="mb-6"
          sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
        >
          Back
        </Button>

        <Typography variant="h4" component="h1" sx={{ color: 'text.primary', mb: 4, fontSize: '2rem' }}>
          Create New Recipe
        </Typography>

        {error && (
          <Alert severity="error" className="mb-8">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Box className="space-y-4">
            <TextField
              label="Recipe Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
              }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              required
              value={image}
              onChange={e => setImage(e.target.value)}
              helperText="Enter a URL for your recipe image"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
                '& .MuiFormHelperText-root': {
                  color: 'text.secondary',
                },
              }}
            />
          </Box>

          {/* Recipe Details */}
          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              label="Cooking Time (minutes)"
              variant="outlined"
              fullWidth
              type="number"
              required
              value={cookingTime}
              onChange={e => setCookingTime(parseInt(e.target.value))}
              InputProps={{
                inputProps: { min: 1 }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
              }}
            />
            <TextField
              label="Servings"
              variant="outlined"
              fullWidth
              type="number"
              required
              value={servings}
              onChange={e => setServings(parseInt(e.target.value))}
              InputProps={{
                inputProps: { min: 1 }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
              }}
            />
            <FormControl fullWidth required>
              <InputLabel id="difficulty-label" sx={{ color: 'text.secondary' }}>
                Difficulty
              </InputLabel>
              <Select
                labelId="difficulty-label"
                value={difficulty}
                label="Difficulty"
                onChange={e => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                }}
              >
                {DIFFICULTY_OPTIONS.map(option => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Ingredients */}
          <Box className="space-y-4">
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Ingredients
            </Typography>
            <Box className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <Box key={index} className="flex items-center gap-2">
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={e => handleIngredientChange(index, e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
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
                  {ingredients.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveIngredient(index)}
                      sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                    >
                      <MinusIcon size={16} />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<PlusIcon size={18} />}
                onClick={handleAddIngredient}
                variant="text"
                color="primary"
              >
                Add Ingredient
              </Button>
            </Box>
          </Box>

          {/* Instructions */}
          <Box className="space-y-4">
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Instructions
            </Typography>
            <Box className="space-y-4">
              {instructions.map((instruction, index) => (
                <Box key={index} className="flex items-start gap-3">
                  <Box 
                    className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-2"
                    sx={{ 
                      bgcolor: 'action.hover',
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="body2">{index + 1}</Typography>
                  </Box>
                  <Box className="flex-grow">
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder={`Step ${index + 1}`}
                      value={instruction}
                      onChange={e => handleInstructionChange(index, e.target.value)}
                      multiline
                      rows={2}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'background.paper',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'text.secondary',
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
                  {instructions.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveInstruction(index)}
                      sx={{ 
                        color: 'text.secondary', 
                        '&:hover': { color: 'error.main' },
                        mt: 2
                      }}
                    >
                      <MinusIcon size={16} />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<PlusIcon size={18} />}
                onClick={handleAddInstruction}
                variant="text"
                color="primary"
              >
                Add Step
              </Button>
            </Box>
          </Box>

          {/* Dietary Information */}
          <Box className="space-y-4">
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Dietary Information
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="dietary-label" sx={{ color: 'text.secondary' }}>
                Dietary Information
              </InputLabel>
              <Select
                labelId="dietary-label"
                multiple
                value={dietaryInfo}
                onChange={handleDietaryChange}
                input={<OutlinedInput label="Dietary Information" />}
                renderValue={selected => (
                  <Box className="flex flex-wrap gap-1">
                    {selected.map(value => (
                      <Chip 
                        key={value} 
                        label={value} 
                        size="small"
                        sx={{
                          bgcolor: 'action.hover',
                          color: 'text.primary',
                        }}
                      />
                    ))}
                  </Box>
                )}
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                }}
              >
                {DIETARY_OPTIONS.map(option => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={dietaryInfo.indexOf(option) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Tags */}
          <Box className="space-y-4">
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Tags
            </Typography>
            <Box className="space-y-4">
              <Box className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{
                      bgcolor: 'action.hover',
                      color: 'text.primary',
                    }}
                  />
                ))}
              </Box>
              <Box className="flex gap-2">
                <TextField
                  variant="outlined"
                  placeholder="Add a tag (e.g., Italian, Dessert)"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-grow"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
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
                <Button
                  onClick={handleAddTag}
                  variant="contained"
                  disabled={!newTag}
                  color="primary"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Submit Button */}
          <Box className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon size={18} />}
            >
              {isSubmitting ? 'Saving...' : 'Save Recipe'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default CreateRecipe;