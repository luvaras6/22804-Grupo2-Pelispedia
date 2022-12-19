import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

import Search from "./Search";

import styles from "../Styles/Navbar.module.css";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import logo from "../Styles/logo-pelispedia.png";

function NavBar() {
  const { signOut, currentUser } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/peliculas");
  };

  return (
    <>
      <Navbar.Brand>
        <img
          src={logo}
          alt="Logo Pelispedia"
          height={80}
          width={80}
          className="d-inline-block align-top"
        />
        <Nav.Link href="/" className="align-self-center">
          <h1>Pelispedia: La enciclopedia de tus películas</h1>
        </Nav.Link>
      </Navbar.Brand>
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Stack direction="horizontal" gap={5} className="w-100">
            {currentUser && (
              <>
                <Navbar.Toggle aria-controls="collapse-navbar-nav" />
                <Navbar.Collapse id="collapse-navbar-nav">
                  <button type="button">
                    <Nav.Link href="/peliculas">
                      <h3>Películas</h3>
                    </Nav.Link>
                  </button>
                  <button type="button">
                    <Nav.Link href="/favoritos">
                      <h3>Favoritos</h3>
                    </Nav.Link>
                  </button>
                  <button type="button" onClick={handleLogOut}>
                    <Nav.Link>
                      <h3>Log out</h3>
                    </Nav.Link>
                  </button>
                </Navbar.Collapse>
                <Container
                  className={`${styles.search} ms-auto justify-content-between`}
                >
                  <Navbar.Text className="align-items-center">
                    <h2>Bienvenido!!</h2>
                  </Navbar.Text>
                  <Navbar.Text>
                    <h3>
                      <Search></Search>
                    </h3>
                  </Navbar.Text>
                </Container>
              </>
            )}
          </Stack>
        </Container>
        <Nav className="login">
          {!currentUser && (
            <button type="button" onClick={handleLogin}>
              <h3>Log in</h3>
            </button>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
