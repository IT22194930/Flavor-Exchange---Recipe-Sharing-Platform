import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, ListItemText, Checkbox, SelectChangeEvent, IconButton, Alert, CircularProgress } from '@mui/material';
import { PlusIcon, MinusIcon, SaveIcon, ArrowLeftIcon } from 'lucide-react';
import { useRecipeStore, Recipe } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto', 'Paleo', 'High Protein'];
const CreateRecipe: React.FC = () => {
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
  return <Box>
      <Box className="mb-4">
        <Button variant="text" color="inherit" onClick={() => navigate(-1)} startIcon={<ArrowLeftIcon size={18} />}>
          Back
        </Button>
      </Box>
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Create New Recipe
      </Typography>
      {error && <Alert severity="error" className="mb-4">
          {error}
        </Alert>}
      <Paper className="p-6">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField label="Recipe Title" variant="outlined" fullWidth required value={title} onChange={e => setTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" variant="outlined" fullWidth multiline rows={3} required value={description} onChange={e => setDescription(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Image URL" variant="outlined" fullWidth required value={image} onChange={e => setImage(e.target.value)} helperText="Enter a URL for your recipe image" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Cooking Time (minutes)" variant="outlined" fullWidth type="number" required value={cookingTime} onChange={e => setCookingTime(parseInt(e.target.value))} InputProps={{
              inputProps: {
                min: 1
              }
            }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Servings" variant="outlined" fullWidth type="number" required value={servings} onChange={e => setServings(parseInt(e.target.value))} InputProps={{
              inputProps: {
                min: 1
              }
            }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select labelId="difficulty-label" value={difficulty} label="Difficulty" onChange={e => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
                  {DIFFICULTY_OPTIONS.map(option => <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-2">
                Ingredients
              </Typography>
              {ingredients.map((ingredient, index) => <Box key={index} className="flex items-center mb-2">
                  <TextField variant="outlined" fullWidth placeholder={`Ingredient ${index + 1}`} value={ingredient} onChange={e => handleIngredientChange(index, e.target.value)} required />
                  <IconButton color="error" onClick={() => handleRemoveIngredient(index)} disabled={ingredients.length <= 1}>
                    <MinusIcon size={20} />
                  </IconButton>
                </Box>)}
              <Button startIcon={<PlusIcon size={18} />} onClick={handleAddIngredient} variant="outlined" className="mt-2">
                Add Ingredient
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-2">
                Instructions
              </Typography>
              {instructions.map((instruction, index) => <Box key={index} className="flex items-start mb-3">
                  <Box className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mt-2 mr-2">
                    <Typography variant="body2">{index + 1}</Typography>
                  </Box>
                  <TextField variant="outlined" fullWidth placeholder={`Step ${index + 1}`} value={instruction} onChange={e => handleInstructionChange(index, e.target.value)} multiline rows={2} required />
                  <IconButton color="error" onClick={() => handleRemoveInstruction(index)} disabled={instructions.length <= 1}>
                    <MinusIcon size={20} />
                  </IconButton>
                </Box>)}
              <Button startIcon={<PlusIcon size={18} />} onClick={handleAddInstruction} variant="outlined" className="mt-2">
                Add Step
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="dietary-label">Dietary Information</InputLabel>
                <Select labelId="dietary-label" multiple value={dietaryInfo} onChange={handleDietaryChange} input={<OutlinedInput label="Dietary Information" />} renderValue={selected => <Box className="flex flex-wrap gap-1">
                      {selected.map(value => <Chip key={value} label={value} size="small" />)}
                    </Box>}>
                  {DIETARY_OPTIONS.map(option => <MenuItem key={option} value={option}>
                      <Checkbox checked={dietaryInfo.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-2">
                Tags
              </Typography>
              <Box className="flex flex-wrap gap-2 mb-3">
                {tags.map(tag => <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />)}
              </Box>
              <Box className="flex">
                <TextField variant="outlined" placeholder="Add a tag (e.g., Italian, Dessert)" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }} className="flex-grow" />
                <Button onClick={handleAddTag} variant="contained" disabled={!newTag} className="ml-2">
                  Add
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} className="flex justify-end">
              <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting} startIcon={<SaveIcon size={18} />}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Save Recipe'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>;
};
export default CreateRecipe;