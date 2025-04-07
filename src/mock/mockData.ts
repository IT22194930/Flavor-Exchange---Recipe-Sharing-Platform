import { Recipe } from '../store/recipeStore';
export const mockRecipes: Recipe[] = [{
  id: "1",
  title: "Classic Margherita Pizza",
  description: "A simple yet delicious traditional Italian pizza with fresh basil and mozzarella.",
  image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  cookingTime: 25,
  servings: 4,
  difficulty: "easy",
  ingredients: ["1 pizza dough ball", "3 tbsp tomato sauce", "125g fresh mozzarella", "Fresh basil leaves", "2 tbsp olive oil", "Salt and pepper to taste"],
  instructions: ["Preheat oven to 475°F (245°C) with a pizza stone if available.", "Roll out the pizza dough on a floured surface.", "Spread tomato sauce evenly over the dough, leaving a small border.", "Tear mozzarella into pieces and distribute over the sauce.", "Bake for 10-12 minutes until crust is golden and cheese is bubbly.", "Remove from oven, top with fresh basil leaves, drizzle with olive oil, and season with salt and pepper."],
  author: {
    id: "user1",
    username: "ItalianChef"
  },
  createdAt: "2023-09-15T14:30:00Z",
  rating: 4.8,
  tags: ["Italian", "Pizza", "Vegetarian", "Quick"],
  dietaryInfo: ["Vegetarian"],
  substitutions: [{
    original: "Fresh mozzarella",
    alternatives: ["Vegan mozzarella", "Cashew cheese", "Dairy-free cheese"]
  }, {
    original: "Pizza dough",
    alternatives: ["Cauliflower crust", "Gluten-free dough", "Whole wheat dough"]
  }]
}, {
  id: "2",
  title: "Spicy Thai Basil Chicken (Pad Krapow Gai)",
  description: "A flavorful and spicy Thai street food dish that's quick to make and packed with flavor.",
  image: "https://www.yourhomebasedmom.com/wp-content/uploads/2017/11/Spicy-Thai-Basil-Chicken_0004.jpg",
  cookingTime: 20,
  servings: 2,
  difficulty: "medium",
  ingredients: ["1 lb ground chicken", "4 cloves garlic, minced", "3-4 Thai chili peppers, finely chopped", "1 small onion, thinly sliced", "2 cups Thai holy basil leaves", "2 tbsp vegetable oil", "1 tbsp oyster sauce", "1 tbsp soy sauce", "2 tsp fish sauce", "1 tsp sugar", "Steamed rice for serving"],
  instructions: ["Heat oil in a wok or large skillet over high heat.", "Add garlic and chilies, stir-fry for 30 seconds until fragrant.", "Add ground chicken, breaking it up with a spatula, and cook until no longer pink.", "Add sliced onions and continue cooking for another minute.", "Add oyster sauce, soy sauce, fish sauce, and sugar. Stir to combine.", "Once chicken is fully cooked, turn off heat and fold in the basil leaves until wilted.", "Serve immediately over steamed rice, optionally topped with a fried egg."],
  author: {
    id: "user2",
    username: "ThaiCookingMaster"
  },
  createdAt: "2023-09-10T18:45:00Z",
  rating: 4.7,
  tags: ["Thai", "Spicy", "Quick Dinner", "Asian"],
  dietaryInfo: ["High Protein"]
}, {
  id: "3",
  title: "Creamy Vegan Mushroom Risotto",
  description: "A rich and creamy risotto that's completely plant-based but doesn't compromise on flavor.",
  image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  cookingTime: 35,
  servings: 4,
  difficulty: "medium",
  ingredients: ["1 1/2 cups arborio rice", "6 cups vegetable broth, kept warm", "8 oz mixed mushrooms, sliced", "1 small onion, finely diced", "3 cloves garlic, minced", "1/2 cup dry white wine (optional)", "2 tbsp olive oil", "2 tbsp nutritional yeast", "1 tbsp vegan butter", "1 tsp dried thyme", "Fresh parsley, chopped", "Salt and pepper to taste"],
  instructions: ["In a large pan, heat olive oil over medium heat. Add onions and cook until translucent.", "Add garlic and mushrooms, cooking until mushrooms release their moisture and begin to brown.", "Add arborio rice and stir for 1-2 minutes until grains are coated and slightly toasted.", "Pour in white wine (if using) and stir until absorbed.", "Begin adding warm vegetable broth one ladle at a time, stirring frequently and allowing liquid to absorb before adding more.", "Continue this process for about 20-25 minutes until rice is creamy and al dente.", "Stir in nutritional yeast, vegan butter, and thyme.", "Season with salt and pepper to taste, and garnish with fresh parsley before serving."],
  author: {
    id: "user3",
    username: "PlantBasedChef"
  },
  createdAt: "2023-09-05T19:30:00Z",
  rating: 4.6,
  tags: ["Italian", "Vegan", "Comfort Food", "Dinner"],
  dietaryInfo: ["Vegan", "Dairy-Free"],
  substitutions: [{
    original: "Arborio rice",
    alternatives: ["Carnaroli rice", "Short-grain brown rice", "Quinoa"]
  }, {
    original: "Nutritional yeast",
    alternatives: ["Vegan parmesan", "Miso paste"]
  }, {
    original: "Mixed mushrooms",
    alternatives: ["Button mushrooms", "Portobello mushrooms", "Dried mushrooms"]
  }]
}, {
  id: "4",
  title: "Maple Glazed Salmon with Roasted Vegetables",
  description: "Perfectly cooked salmon with a sweet maple glaze, served with colorful roasted vegetables.",
  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  cookingTime: 30,
  servings: 2,
  difficulty: "easy",
  ingredients: ["2 salmon fillets (6 oz each)", "3 tbsp maple syrup", "2 tbsp soy sauce", "1 tbsp Dijon mustard", "1 garlic clove, minced", "1 cup broccoli florets", "1 cup cherry tomatoes", "1 bell pepper, sliced", "1 small red onion, cut into wedges", "2 tbsp olive oil", "Salt and pepper to taste", "Fresh dill for garnish"],
  instructions: ["Preheat oven to 400°F (200°C).", "In a small bowl, mix maple syrup, soy sauce, Dijon mustard, and garlic to create the glaze.", "Place salmon fillets on a parchment-lined baking sheet and brush generously with the glaze.", "In a separate bowl, toss vegetables with olive oil, salt, and pepper.", "Arrange vegetables around the salmon on the baking sheet.", "Bake for 15-20 minutes until salmon is cooked through and vegetables are tender.", "Drizzle remaining glaze over the salmon and garnish with fresh dill before serving."],
  author: {
    id: "user4",
    username: "SeafoodLover"
  },
  createdAt: "2023-08-28T12:15:00Z",
  rating: 4.9,
  tags: ["Seafood", "Healthy", "Dinner", "Quick"],
  dietaryInfo: ["Gluten-Free", "High Protein"]
}, {
  id: "5",
  title: "Ultimate Chocolate Chip Cookies",
  description: "Soft, chewy chocolate chip cookies with crispy edges and a gooey center.",
  image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  cookingTime: 25,
  servings: 24,
  difficulty: "easy",
  ingredients: ["2 1/4 cups all-purpose flour", "1 tsp baking soda", "1 tsp salt", "1 cup unsalted butter, softened", "3/4 cup granulated sugar", "3/4 cup packed brown sugar", "2 large eggs", "2 tsp vanilla extract", "2 cups semi-sweet chocolate chips", "1 cup chopped walnuts (optional)"],
  instructions: ["Preheat oven to 375°F (190°C).", "In a small bowl, whisk together flour, baking soda, and salt.", "In a large bowl, beat butter and both sugars until creamy.", "Add eggs one at a time, then stir in vanilla.", "Gradually blend in the dry ingredients.", "Fold in chocolate chips and walnuts if using.", "Drop rounded tablespoons of dough onto ungreased baking sheets.", "Bake for 9-11 minutes until golden brown.", "Allow cookies to cool on baking sheet for 2 minutes before transferring to wire racks."],
  author: {
    id: "user5",
    username: "BakingQueen"
  },
  createdAt: "2023-09-01T10:00:00Z",
  rating: 4.9,
  tags: ["Dessert", "Baking", "Cookies", "Chocolate"],
  dietaryInfo: ["Vegetarian"]
}, {
  id: "6",
  title: "Fresh Summer Gazpacho",
  description: "A refreshing cold soup perfect for hot summer days, packed with garden vegetables.",
  image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  cookingTime: 15,
  servings: 6,
  difficulty: "easy",
  ingredients: ["6 ripe tomatoes, chopped", "1 cucumber, peeled and chopped", "1 red bell pepper, seeded and chopped", "1/2 red onion, chopped", "3 garlic cloves, minced", "1/4 cup olive oil", "2 tbsp red wine vinegar", "2 cups tomato juice", "Salt and pepper to taste", "Fresh herbs for garnish (basil or parsley)"],
  instructions: ["Reserve 1/4 cup each of chopped tomatoes, cucumber, and bell pepper for garnish.", "In a blender or food processor, combine remaining vegetables and garlic.", "Pulse until finely chopped but not pureed.", "Add olive oil, vinegar, and tomato juice. Pulse briefly to combine.", "Season with salt and pepper to taste.", "Refrigerate for at least 2 hours before serving.", "Serve cold, garnished with reserved vegetables and fresh herbs."],
  author: {
    id: "user3",
    username: "PlantBasedChef"
  },
  createdAt: "2023-08-15T16:20:00Z",
  rating: 4.5,
  tags: ["Soup", "Summer", "Spanish", "No-Cook"],
  dietaryInfo: ["Vegan", "Gluten-Free", "Raw"]
}];
export const mockUsers = [{
  id: "user1",
  username: "ItalianChef",
  email: "italian@example.com",
  password: "password123",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
}, {
  id: "user2",
  username: "ThaiCookingMaster",
  email: "thai@example.com",
  password: "password123",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
}, {
  id: "user3",
  username: "PlantBasedChef",
  email: "vegan@example.com",
  password: "password123",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg"
}, {
  id: "user4",
  username: "SeafoodLover",
  email: "seafood@example.com",
  password: "password123",
  avatar: "https://randomuser.me/api/portraits/men/75.jpg"
}, {
  id: "user5",
  username: "BakingQueen",
  email: "baker@example.com",
  password: "password123",
  avatar: "https://randomuser.me/api/portraits/women/89.jpg"
}];