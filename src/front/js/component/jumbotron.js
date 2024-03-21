import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import libraryImage  from "../../img/library.jpg"

export const Jumbotron = () => {

    const headerStyles = {
        paddingLeft: 0,
        height: '600px',
        position: 'relative',
        backgroundImage: `url(${libraryImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const textStyles = {
        color: 'white'
    };

    return (
        <header style={headerStyles}>
            <Container style={textStyles} fluid={true} className='h-100'>
                <Row className="h-100 justify-content-center align-items-center text-center">
                    <Col
                        lg={8}
                        className="px-lg-5"
                        style={{
                            background: "rgba(125, 125, 125, 0.15)",
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <h1 className="mb-3">ReviewVerse</h1>
                        <h4 className="mb-3">
                            Aquí podras encontrar reviews de tus libros favoritos, de los que dudas si leer o de los que crees que odias, por supuesto también podrás crearte un perfil, para añadir tus propias reviews con la comunidad.
                            ¿Te interesa?
                        </h4>
                        <div>
                            <Link to="/signup">
                                <Button
                                    className="btn btn-outline-dark btn-lg"
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#8FBF9F',
                                        borderColor: '#5f5f5f',
                                        ':hover': {
                                            color: 'white',
                                            backgroundColor: '#68a67d',
                                            borderColor: '#F5ECD7',
                                        },
                                    }}
                                >
                                    Regístrate aquí
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}