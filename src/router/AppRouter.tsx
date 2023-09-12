import { Redirect, useRoutes } from "raviger";
import { ErrorPage } from "../components/ErrorPage";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = React.lazy(() => import("../components/Home"));
const About = React.lazy(() => import("../components/About"));
const Form = React.lazy(() => import("../components/Form"));
const PreviewPage = React.lazy(() => import("../components/preview/PreviewPage"));


const routes = {
  "/": () => (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Home />
    </React.Suspense>
  ),
  "/login": () => <Redirect to="/" />,
  "/about": () => (
    <React.Suspense fallback={<LoadingSpinner />}>
      <About />
    </React.Suspense>
  ),
  "/forms/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Form id={Number(id)} />
    </React.Suspense>
  ),
  "/preview/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<LoadingSpinner />}>
      <PreviewPage id={Number(id)} />
    </React.Suspense>
  ),
};
export default function AppRouter() {
  const routeResult = useRoutes(routes) || <ErrorPage />;
  return routeResult;
}
