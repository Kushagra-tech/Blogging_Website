import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import LoginForm from "./components/LoginForm";
import Registration from "./components/Registration";

const HomePage = lazy(() => import("./pages/HomePage"));
const MyBlogs = lazy(() => import("./pages/MyBlogs"));
const CreateBlog = lazy(() => import("./components/CreateBlog"));

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<Loading />}>
                <MyBlogs />
              </Suspense>
            }
          />
          <Route
            path="/addblog"
            element={
              <Suspense fallback={<Loading />}>
                <CreateBlog />
              </Suspense>
            }
          />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
