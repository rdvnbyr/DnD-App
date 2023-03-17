import { _uuid, _uuidByLength } from '../../lib/utils';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
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
          <Navbar.Brand href="/">
            <img alt="d&d" src={logo} width="30" height="30" className="d-inline-block align-top" /> Tsx-d&d
          </Navbar.Brand>
          <Nav>
            {navigation.map((item) => (
              <Nav.Link active={item.current} key={_uuid()} href={item.href}>
                {item.name}
              </Nav.Link>
            ))}
            {isAuthenticated ? (
              <Link className="btn btn-dark text-white" to="/logout">
                Logout
              </Link>
            ) : (
              <Link className="btn btn-dark text-white" to="/login">
                Login
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
