import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, Divider } from '@mui/material';
import { MenuIcon, HomeIcon, HeartIcon, PlusCircleIcon, LogInIcon, UserIcon, LogOutIcon, ChefHatIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    logout
  } = useAuthStore();
  const {
    isDarkMode,
    toggleTheme
  } = useThemeStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };
  const menuItems = [{
    text: 'Home',
    icon: <HomeIcon size={20} />,
    path: '/'
  }, {
    text: 'My Recipes',
    icon: <ChefHatIcon size={20} />,
    path: '/my-recipes',
    requireAuth: true
  }, {
    text: 'Favorites',
    icon: <HeartIcon size={20} />,
    path: '/favorites',
    requireAuth: true
  }, {
    text: 'Add Recipe',
    icon: <PlusCircleIcon size={20} />,
    path: '/create-recipe',
    requireAuth: true
  }];
  const drawer = <div className="w-64">
      <Box className="p-4 flex items-center justify-between">
        <Typography variant="h6" className="font-bold text-primary">
          Flavor Exchange
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map(item => (!item.requireAuth || isAuthenticated) && <ListItem button key={item.text} component={RouterLink} to={item.path} onClick={handleDrawerToggle} className="hover:bg-gray-100">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>)}
        {!isAuthenticated ? <>
            <ListItem button component={RouterLink} to="/login" onClick={handleDrawerToggle} className="hover:bg-gray-100">
              <ListItemIcon>
                <LogInIcon size={20} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={RouterLink} to="/register" onClick={handleDrawerToggle} className="hover:bg-gray-100">
              <ListItemIcon>
                <UserIcon size={20} />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </> : <ListItem button onClick={() => {
        handleLogout();
        handleDrawerToggle();
      }} className="hover:bg-gray-100">
            <ListItemIcon>
              <LogOutIcon size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>}
      </List>
    </div>;
  return <Box className="flex flex-col min-h-screen">
      <AppBar position="sticky" color="default" elevation={1} className="bg-white dark:bg-gray-900">
        <Toolbar className="container mx-auto px-4">
          {isMobile && <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} className="mr-2">
              <MenuIcon />
            </IconButton>}
          <Typography variant="h6" component={RouterLink} to="/" className="text-primary font-bold no-underline flex-grow">
            Flavor Exchange
          </Typography>
          {!isMobile && <Box className="flex items-center space-x-4">
              <Button component={RouterLink} to="/" color="inherit" startIcon={<HomeIcon size={18} />}>
                Home
              </Button>
              {isAuthenticated && <>
                  <Button component={RouterLink} to="/my-recipes" color="inherit" startIcon={<ChefHatIcon size={18} />}>
                    My Recipes
                  </Button>
                  <Button component={RouterLink} to="/favorites" color="inherit" startIcon={<HeartIcon size={18} />}>
                    Favorites
                  </Button>
                  <Button component={RouterLink} to="/create-recipe" color="primary" variant="contained" startIcon={<PlusCircleIcon size={18} />}>
                    Add Recipe
                  </Button>
                </>}
            </Box>}
          {!isAuthenticated ? !isMobile && <Box className="flex items-center space-x-2">
                <Button component={RouterLink} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={RouterLink} to="/register" color="primary" variant="outlined">
                  Register
                </Button>
              </Box> : <Box>
              <IconButton onClick={toggleTheme} color="inherit" size="large">
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </IconButton>
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar alt={user?.username} src={user?.avatar || undefined} className="bg-primary">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }} transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
                <MenuItem disabled>
                  <Typography variant="body2">
                    Signed in as <strong>{user?.username}</strong>
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>}
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={handleDrawerToggle} ModalProps={{
      keepMounted: true
    }}>
        {drawer}
      </Drawer>
      <Container maxWidth="lg" className="flex-grow py-6">
        {children}
      </Container>
      <Box component="footer" className="py-6 px-4 mt-auto bg-gray-50 dark:bg-gray-900">
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()} Flavor Exchange. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>;
};
export default Layout;