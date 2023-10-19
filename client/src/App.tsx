import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import HomePage from "./pages/HomePage";
import NoteWizardPage from "./pages/NoteWizardPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import TeamsPage from "./pages/TeamsPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotesPage from "./pages/NotesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { pathname } = useLocation();
  const sideBarCondition =
    pathname !== "/" && pathname !== "/sign-in" && pathname !== "/sign-up";
  return (
    <div className="">
      <TopBar />
      {sideBarCondition && <SideBar />}
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/note/:id" element={<NoteWizardPage />} />
        <Route path="/teams/new" element={<CreateTeamPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
