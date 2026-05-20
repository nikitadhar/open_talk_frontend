import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';
import PrimarySearchAppBar from './screens';
import SignIn from './screens/SignIn';
import SignUp from './screens/signup';
import AppTheme from "./components/shared-theme/AppTheme"
import { SnackbarProvider } from './modules/context/SnackbarProvider';
import { useAuth } from './modules/context/AuthContext';
import axios from "axios";
import { Toaster } from 'react-hot-toast';
// axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.baseURL = "https://open-talk-backend.onrender.com/api/v1";
axios.defaults.withCredentials = true;
function App(props) {
  const auth = useAuth();

  return (
    <AppTheme {...props}>
       <Toaster position="top-right" />
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                auth?.isLoggedIn && auth.user ? (
                  <PrimarySearchAppBar />
                ) : (
                  <Navigate to="/signIn" />
                )
              }
            />

            <Route
              path="/signIn"
              element={
                auth?.isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <SignIn />
                )
              }
            />

            <Route
              path="/signUp"
              element={
                auth?.isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <SignUp />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </AppTheme>

  );
}

export default App;
