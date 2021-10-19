/** @format */

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../Screens/LoginScreen";
import RentalAppInfo from "../Screens/RentalAppInfo";
import ViewProperties from "../Screens/ViewProperties";
import Maintinence from "../Screens/Maintinence";
import SubmitApplication from "../Screens/SubmitApplication";
import ViewApplications from "../Screens/ViewApplications";
import TenantPay from "../Screens/TenantPay";

const screens = {
  Login: {
    screen: LoginScreen,
  },
  ViewProperties: {
    screen: ViewProperties,
  },
  RentalAppInfo: {
    screen: RentalAppInfo,
  },
  Maintinence: {
    screen: Maintinence,
  },
  SubmitApplication: {
    screen: SubmitApplication,
  },
  ViewApplications: {
    screen: ViewApplications,
  },
  TenantPay: {
    screen: TenantPay,
  },
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
