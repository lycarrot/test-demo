import { useRoutes } from "react-router-dom";
import Home from '@/views/Home'

 const rootRouter = [
	{
		path: "/",
		element: <Home/>
	},
	// {
	// 	path: "/home",
  //   element: <Home />
	// },

];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
