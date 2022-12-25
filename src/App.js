import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { useUserState } from "./context/UserContext";
import Dashboard from "./pages/dashboard";
import Food from "./pages/food";
import NotFound from "./pages/404";
import Layout from "./components/Layout";

const App = () => {
  const { isAuthenticated } = useUserState();
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={`/app/dashboard`} />} />
      <Route path="app" element={<Navigate replace to={`/app/dashboard`} />} />
      <Route path={`/app`} element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="food" element={<Food />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  function PrivateRoute() {
    return isAuthenticated ? <Layout /> : <Navigate replace to="/login" />;
  }
};
export default App;
