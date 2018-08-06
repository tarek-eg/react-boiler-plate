import Home from "./views/home/Home.container";
import Auth from "./views/auth/Auth.container";

const routes = [
  {
    exact: true,
    url: "/",
    title: "Home",
    routeComponent: Home
  },
  {
    exact: false,
    url: "/user",
    title: "Auth",
    routeComponent: Auth
  }
];

export default routes;
