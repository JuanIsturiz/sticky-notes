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
import UserContextProvider from "./contexts/user-context";
import { Toaster } from "react-hot-toast";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import OnboardingPage from "./pages/OnboardingPage";
import TeamPage from "./pages/TeamPage";
import JoinTeamPage from "./pages/JoinTeamPage";

function App() {
  const { pathname } = useLocation();
  const sideBarCondition =
    pathname !== "/" &&
    pathname !== "/sign-in" &&
    pathname !== "/sign-up" &&
    pathname !== "/onboarding";
  return (
    <div className="">
      <TopBar />
      {/* {sideBarCondition && <SideBar />} */}
      <Routes>
        {/* Root Routes */}
        <Route index path="/" element={<HomePage />} />
        {/* Note Routes */}
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NoteWizardPage />} />
        <Route path="/notes/new" element={<NoteWizardPage />} />
        {/* Team Routes */}
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/new" element={<CreateTeamPage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/teams/:id/update" element={<CreateTeamPage />} />
        <Route path="/teams/:id/join" element={<JoinTeamPage />} />
        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* User Routes */}
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Router>
  );
};

export default AppWrapper;
