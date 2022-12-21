import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { getItemById } from '../Services/userService';
import Search from './Search';
import styles from '../Styles/Navbar.module.css'

function OffcanvasExample() {
  const { signOut, currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState();

  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut();
    navigate('/login');
  };

  //   const handleLogin = () => {
  //     navigate('/peliculas');
  //   };

  //Esta funcion trae el user completo con el UID que trae de la base de datos
  useEffect(() => {
    getItemById(currentUser.uid).then((result) => {
      setUserName(result.userNombre);
      setLoading(false);
      // console.log(result.userNombre);
    });
  }, []);

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar variant="dark" key={expand} expand={expand} className="mb-3">
          <Container
            fluid
            className="d-flex align-items-center border-2 flex-nowrap"
          >
            {/* logo de pelispedia */}
            <Navbar.Brand className="d-flex">
              <img
                src="./logo-pelispedia.png"
                alt="Logo Pelispedia"
                height={80}
                width={80}
                className="d-inline-block align-top"
              />
              <Nav.Link href="/" className="align-self-center">
                <div className="text-white">
                  <h1>Pelispedia</h1>
                  <p className='text-white-50'> La enciclopedia de tus películas</p>
                </div>
              </Nav.Link>
            </Navbar.Brand>
            {currentUser && (
              <>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  className=' text-white bg-dark'
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                    >
                      Pelispedia : La enciclopedia de tus películas
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3 ">
                      <Link to="/peliculas" className="text-white">
                        Peliculas
                      </Link>
                      <Link to="/favoritos" className="text-white">
                        Favoritos
                      </Link>
                      <NavDropdown
                      
                        title="Perfil"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item>
                          {!loading && (
                            <Link to="/profile" className="text-black">
                              {userName}
                            </Link>
                          )}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogOut}>
                          Log out <FiLogOut />
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                   
                    <Search />
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </>
            )}
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
