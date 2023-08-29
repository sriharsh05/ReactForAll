import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../components/AppContainer";
import Form from "../components/Form";
import { Home } from "../components/Home";
import PreviewPage from "../components/PreviewPage";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <PreviewPage formId={id} />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
