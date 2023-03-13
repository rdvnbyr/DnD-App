import { Routes, Route } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from './assets/styles/styled-theme';
// components
import Home from './pages/Home';
import { Login } from './modules/auth/Login';
import { Register } from './modules/auth/Register';
import { Workspace } from './modules/workspace/Workspace';
// Routes
import { AuthRoutes } from './router/AuthRoutes';
import { ProtectedRoutes } from './router/ProtectedRoutes';
import { PublicRoutes } from './router/PublicRoutes';
import MissingRoutePage from './pages/MissingRoutePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { Dashboard } from './pages/Dashboard';
import Kanban from './modules/workspace/components/Kanban';
import { Logout } from './modules/auth/Logout';

function App() {
  return (
    <ThemeProvider theme={styledTheme}>
      <ProSidebarProvider>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route path="/about" element={<div>About</div>} />
            <Route path="/contact" element={<div>Contact</div>} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ws/:wsId" element={<Workspace />}>
              <Route path="b/:boardId" element={<Kanban />} />
            </Route>

            <Route path="/profile" element={<div>Dashboard</div>} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* 404 Page Route */}
          <Route path="error-404" element={<MissingRoutePage />} />
          {/* Catch missing route */}
          <Route path="*" element={<MissingRoutePage />} />
        </Routes>
      </ProSidebarProvider>
    </ThemeProvider>
  );
}

export default App;
