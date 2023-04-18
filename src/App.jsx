import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/";
import ContentPost from "./Content/ContentPost";
import Content from "./Content/Content";
import UserProfile from "./User Page/Profile";
import NotFoundPage from "./404 Not Found/NotFoundPage";
import ContentByForum from "./Content/ContentByForum";
import ChangeEmail from "./User Page/Component/ChangeEmail";
import ChangePassword from "./User Page/Component/ChangePassword";
import Forum from "./Forums/Forum";
import Users from "./Users Tabel/Users";
import Applog from "./AppLog/Applog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<Login />} />

          {/* Route Profile */}
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/users/changeEmail/:id" element={<ChangeEmail />} />
          <Route
            path="/users/changePassword/:id"
            element={<ChangePassword />}
          />
          <Route path="/users" element={<Users />} />
          {/* End Route Profile */}

          {/* Route App Log */}
          <Route path="/applog" element={<Applog />} />
          {/* End Route App Log */}

          {/* Route Forum & Post */}
          <Route path="forum/show/:idForum" element={<ContentByForum />} />
          <Route
            path="forum/post/:idForum/showPost/:id"
            element={<ContentPost />}
          />
          <Route path="/forums" element={<Forum />} />
          {/* End Route Forum & Post */}

          {/* Page Not Found */}
          <Route path="forum/*/post/:id" element={<NotFoundPage />} />
          <Route path="forum/*/post/*" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* End Page Not Found */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
