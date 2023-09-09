import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import { PreviewPage } from "../components/preview/PreviewPage";
import { ErrorPage } from "../components/ErrorPage";
import { Home } from "../components/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Redirect to="/" />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <PreviewPage id={Number(id)} />,
};
export default function AppRouter() {
  const routeResult = useRoutes(routes) || <ErrorPage />;
  return routeResult;
}
