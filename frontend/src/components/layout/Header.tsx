import { _uuid } from '../../lib/utils';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/react.svg';

const navigation = [
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

interface HeaderProps {
  isAuthenticated: boolean;
}
export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-link">
              <img alt="d&d" src={logo} width="30" height="30" className="d-inline-block align-top" /> Tsx-d&d
            </NavLink>
          </Navbar.Brand>
          <Nav>
            {navigation.map((item) => (
              <NavLink
                key={_uuid()}
                to={item.href}
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : '',
                })}
              >
                {item.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="nav-link"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : '',
                })}
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
