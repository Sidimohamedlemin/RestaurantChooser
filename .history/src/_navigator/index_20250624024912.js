import { createSwitchNavigator, createAppContainer } from "react-navigation";

// Switch Nav
import SplashScreen from "../screens/Splash";
import TableNumScreen from "../screens/TableNum";
import FinishedScreen from "../screens/Finished";
import HomeScreen from "../screens/Main/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantScreen from '../../screens/RestaurantScreen';
import AddRestaurantScreen from '../../screens/AddRestaurantScreen';
import PeopleScreen from '../../screens/PeopleScreen';

const RootNav = createSwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  TableNum: {
    screen: TableNumScreen
  },
  Main: {
    screen: HomeScreen
  },
  Finished: {
    screen: FinishedScreen
  }
}, {
  initialRouteName: 'Splash',
});

export default createAppContainer(RootNav);

