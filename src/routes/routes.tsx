import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AuthenticatedRoute } from "./autheticated"
import { Login } from "@/layout/login";
import { privateRoutes } from "./private.routes";
import { Layout } from "@/layout/layout";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
          {privateRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}