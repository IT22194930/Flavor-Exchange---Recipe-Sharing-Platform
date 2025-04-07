import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Box, Chip, Rating, Tooltip } from '@mui/material';
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
  return <Card className="h-full flex flex-col transition-transform duration-200 hover:shadow-lg cursor-pointer" onClick={handleCardClick}>
      <CardMedia component="img" height="200" image={recipe.image} alt={recipe.title} className="h-48 object-cover" />
      <CardContent className="flex-grow">
        <Box className="flex justify-between items-start mb-2">
          <Typography variant="h6" component="h2" className="font-bold">
            {recipe.title}
          </Typography>
          <Box className="flex">
            {showEditButton && isAuthor && <Tooltip title="Edit Recipe">
                <IconButton size="small" onClick={handleEditClick} className="mr-1">
                  <EditIcon size={20} />
                </IconButton>
              </Tooltip>}
            <IconButton size="small" onClick={handleFavoriteClick} className={isFavorite ? 'text-red-500' : ''}>
              <HeartIcon size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" className="mb-3 line-clamp-2" style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
          {recipe.description}
        </Typography>
        <Box className="flex items-center mb-2">
          <Rating value={recipe.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="textSecondary" className="ml-1">
            ({recipe.rating})
          </Typography>
        </Box>
        <Box className="flex flex-wrap gap-1 mt-3">
          {/* {recipe.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" className="bg-gray-100" />)} */}
          {(recipe.tags || []).slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" className="bg-gray-100" />)}
        </Box>
      </CardContent>
      <CardActions className="bg-gray-50 px-4 py-2">
        <Box className="flex items-center text-gray-600 mr-4">
          <ClockIcon size={16} className="mr-1" />
          <Typography variant="body2">{recipe.cookingTime} min</Typography>
        </Box>
        <Box className="flex items-center text-gray-600">
          <UsersIcon size={16} className="mr-1" />
          <Typography variant="body2">{recipe.servings} servings</Typography>
        </Box>
      </CardActions>
    </Card>;
};
export default RecipeCard;