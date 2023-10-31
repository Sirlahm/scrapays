import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Update from "./pages/Update";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Create />} />
      <Route path="update" element={<Update />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
