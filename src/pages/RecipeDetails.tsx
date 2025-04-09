import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Chip, Button, IconButton, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Rating, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Alert, useTheme } from '@mui/material';
import { ClockIcon, UsersIcon, ChefHatIcon, HeartIcon, EditIcon, TrashIcon, ShareIcon, CheckCircleIcon, TimerIcon, ArrowLeftIcon } from 'lucide-react';
import { useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';
import Timer from '../components/Timer';
import ShareButton from '../components/ShareButton';

const RecipeDetails: React.FC = () => {
  const theme = useTheme();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    getRecipeById,
    toggleFavorite,
    getUserFavorites,
    deleteRecipe
  } = useRecipeStore();
  const {
    isAuthenticated,
    user
  } = useAuthStore();
  const userFavorites = user ? getUserFavorites(user.id) : [];
  const [recipe, setRecipe] = useState(getRecipeById(id || ''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [timerDialogOpen, setTimerDialogOpen] = useState(false);
  const isFavorite = userFavorites.includes(id || '');
  const isAuthor = user?.id === recipe?.author.id;
  useEffect(() => {
    if (!recipe) {
      setError('Recipe not found');
    }
  }, [recipe]);
  const handleFavoriteToggle = () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    if (id) {
      toggleFavorite(user.id, id);
    }
  };
  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };
  const handleDeleteConfirm = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await deleteRecipe(id);
      setDeleteDialogOpen(false);
      navigate('/');
    } catch (err) {
      setError('Failed to delete recipe');
    } finally {
      setIsLoading(false);
    }
  };
  if (error) {
    return <Box className="py-8 px-4 text-center">
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => navigate('/')} startIcon={<ArrowLeftIcon size={18} />}>
          Back to Recipes
        </Button>
      </Box>;
  }
  if (!recipe) {
    return <Box className="flex justify-center items-center py-12">
        <CircularProgress />
      </Box>;
  }
  return <Box component="div">
      <Box className="mb-4">
        <Button variant="text" color="inherit" onClick={() => navigate('/')} startIcon={<ArrowLeftIcon size={18} />}>
          Back to Recipes
        </Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              position: 'relative',
              height: '288px', // Fixed height of 18rem (same as h-72)
              width: '100%',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: 1
            }}>
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
            <Box className="flex justify-between items-center mt-4">
              <Box className="flex items-center">
                <Rating value={recipe.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="textSecondary" className="ml-2">
                  ({recipe.rating})
                </Typography>
              </Box>
              <Box className="flex items-center space-x-2">
                <IconButton color={isFavorite ? 'primary' : 'default'} onClick={handleFavoriteToggle} className={isFavorite ? 'text-red-500' : ''}>
                  <HeartIcon size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                </IconButton>
                <ShareButton title={recipe.title} description={recipe.description} url={window.location.href} />
                {isAuthor && <>
                    <IconButton color="primary" onClick={handleEdit}>
                      <EditIcon size={24} />
                    </IconButton>
                    <IconButton color="error" onClick={() => setDeleteDialogOpen(true)}>
                      <TrashIcon size={24} />
                    </IconButton>
                  </>}
              </Box>
            </Box>
          </Grid>
          <Grid component="div" item xs={12} md={6}>
            <Typography variant="h4" component="h1" className="font-bold mb-2">
              {recipe.title}
            </Typography>
            <Typography variant="body1" className="mb-4 text-gray-700">
              {recipe.description}
            </Typography>
            <Box className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map(tag => <Chip key={tag} label={tag} className="bg-gray-100" />)}
            </Box>
            <Box className="flex flex-wrap gap-4 mb-6">
              <Paper className="flex items-center p-3 bg-gray-50">
                <ClockIcon size={20} className="mr-2 text-gray-600" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Cooking Time
                  </Typography>
                  <Typography variant="body1">
                    {recipe.cookingTime} min
                  </Typography>
                </Box>
              </Paper>
              <Paper className="flex items-center p-3 bg-gray-50">
                <UsersIcon size={20} className="mr-2 text-gray-600" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Servings
                  </Typography>
                  <Typography variant="body1">{recipe.servings}</Typography>
                </Box>
              </Paper>
              <Paper className="flex items-center p-3 bg-gray-50">
                <ChefHatIcon size={20} className="mr-2 text-gray-600" />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Difficulty
                  </Typography>
                  <Typography variant="body1" className="capitalize">
                    {recipe.difficulty}
                  </Typography>
                </Box>
              </Paper>
              <Button variant="outlined" color="secondary" startIcon={<TimerIcon size={18} />} onClick={() => setTimerDialogOpen(true)}>
                Start Timer
              </Button>
            </Box>
            <Box className="mb-6">
              <Typography variant="h6" className="font-bold mb-2">
                Dietary Information
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {recipe.dietaryInfo.map(info => <Chip key={info} label={info} color="primary" variant="outlined" />)}
              </Box>
            </Box>
            <Box className="flex items-center mb-4">
              <Typography variant="body2" color="textSecondary">
                Created by {recipe.author.username} on{' '}
                {new Date(recipe.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={6}>
          <Grid component="div" item xs={12} md={5}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Ingredients
            </Typography>
            <Paper sx={{ p: 2 }}>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                      <CheckCircleIcon size={18} className="text-green-500" />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid component="div" item xs={12} md={7}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Instructions
            </Typography>
            <Paper sx={{ p: 2 }}>
              <List>
                {recipe.instructions.map((step, index) => (
                  <ListItem key={index} alignItems="flex-start" className="mb-3">
                    <ListItemIcon className="mt-1">
                      <Box 
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: 1
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          {index + 1}
                        </Typography>
                      </Box>
                    </ListItemIcon>
                    <ListItemText 
                      primary={step} 
                      sx={{
                        '& .MuiTypography-root': {
                          color: 'text.primary'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      {recipe.substitutions && recipe.substitutions.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Grid container>
            <Grid component="div" item xs={12} md={5}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Ingredient Substitutions
              </Typography>
              <Paper sx={{ p: 2 }}>
                <List>
                  {recipe.substitutions.map((sub, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Instead of {sub.original}:
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {sub.alternatives.map((alt, i) => (
                          <Chip key={i} label={alt} size="small" color="secondary" variant="outlined" />
                        ))}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={timerDialogOpen} 
        onClose={() => setTimerDialogOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '400px',
            margin: '16px'
          }
        }}
      >
        <DialogTitle className='text-center font-bold'>Cooking Timer</DialogTitle>
        <DialogContent>
          <Timer initialMinutes={recipe.cookingTime} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTimerDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>;
};

export default RecipeDetails;