import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
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
import LeaveTeamPage from "./pages/LeaveTeamPage";

function App() {
  return (
    <div className="">
      <TopBar />
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
        <Route path="/teams/:id/leave" element={<LeaveTeamPage />} />
        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* User Routes */}
        <Route path="/profile/:id" element={<UserProfilePage />} />
        <Route path="/profile/:id/edit" element={<OnboardingPage />} />
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
