import { Fragment, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import ProtectedRoute from "./components/ProtectedRoute";

import { APP_ROUTES } from "./constants/routes";
import { Spin } from "antd";

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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={() => <div>Something wrong</div>}
      onError={(error) => console.log(error)}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<Spin />} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
