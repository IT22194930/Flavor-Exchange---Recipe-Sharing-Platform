import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Box, Chip, Rating, Tooltip, useTheme } from '@mui/material';
import { HeartIcon, ClockIcon, UsersIcon, EditIcon } from 'lucide-react';
import { Recipe, useRecipeStore } from '../store/recipeStore';
import { useAuthStore } from '../store/authStore';

interface RecipeCardProps {
  recipe: Recipe;
  showEditButton?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  showEditButton
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    toggleFavorite,
    getUserFavorites
  } = useRecipeStore();
  const {
    isAuthenticated,
    user
  } = useAuthStore();
  const userFavorites = user ? getUserFavorites(user.id) : [];
  const isFavorite = userFavorites.includes(recipe.id);
  const isAuthor = user?.id === recipe?.author?.id;

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated && user) {
      toggleFavorite(user.id, recipe.id);
    } else {
      navigate('/login');
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-recipe/${recipe.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        bgcolor: 'background.paper',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <Box sx={{ 
        position: 'relative',
        height: '288px', // Fixed height of 18rem (same as h-72)
        width: '100%'
      }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {recipe.title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {showEditButton && isAuthor && (
              <Tooltip title="Edit Recipe">
                <IconButton 
                  size="small" 
                  onClick={handleEditClick} 
                  sx={{ 
                    mr: 1,
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <EditIcon size={20} />
                </IconButton>
              </Tooltip>
            )}
            <IconButton 
              size="small" 
              onClick={handleFavoriteClick} 
              sx={{ 
                color: isFavorite ? 'error.main' : 'text.secondary',
                '&:hover': { color: 'error.main' }
              }}
            >
              <HeartIcon size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </IconButton>
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          sx={{
            mb: 3,
            color: 'text.secondary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {recipe.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={recipe.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
            ({recipe.rating})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 3 }}>
          {(recipe.tags || []).slice(0, 3).map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              sx={{
                bgcolor: 'action.hover',
                color: 'text.primary'
              }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ 
        bgcolor: 'action.hover',
        px: 2,
        py: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mr: 2 }}>
          <ClockIcon size={16} style={{ marginRight: '4px' }} />
          <Typography variant="body2">{recipe.cookingTime} min</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <UsersIcon size={16} style={{ marginRight: '4px' }} />
          <Typography variant="body2">{recipe.servings} servings</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;