import { createStackNavigator, createAppContainer } from "react-navigation";

// createStackNavigator is like <Route /> in Reactjs

import { createStackNavigator } from "react-navigation";
import Home from "./Home";
import Friends from "./Friends";

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends }
});

export default AppNavigator;
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Favorites: FavoriteScreen,
    Friends: FriendsReviews,
    Profile: UserProfile,
    NewReview: NewReviewForm
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
