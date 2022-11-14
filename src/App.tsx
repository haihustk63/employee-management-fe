import { Fragment, ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { APP_ROUTES } from "./constants/routes";

const createRouter = (routes: any): { path: string; element: ReactNode }[] => {
  const createRoute = (route: any) => {
    const Layout = route?.layout || Fragment;
    const Element = route?.element || null;
    return {
      path: route?.path,
      element: (
        <ProtectedRoute route={route}>
          <Layout>
            <Element />
          </Layout>
        </ProtectedRoute>
      ),
    };
  };

  return routes.map((route: any) => {
    const children = route?.children ? route?.children.map(createRoute) : null;

    return {
      ...createRoute(route),
      children,
    };
  });
};

const router = createBrowserRouter(createRouter(APP_ROUTES));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
