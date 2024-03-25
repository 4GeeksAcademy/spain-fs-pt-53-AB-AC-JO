import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import libraryImage from "../../img/library.jpg"
import { TextEffects } from "./textEffect";

export const JumbotronAbout = () => {
    const { store, actions } = useContext(Context);

    const headerStyles = {
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
        color: 'white',
        width: '100%',
        height: 'auto',
        display: '',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };
    const textEffectsContainer = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        <>
            <header style={headerStyles}>
                <Container style={textStyles} fluid={true} className='h-100'>
                    <Row className="h-100 justify-content-center align-items-center text-center">
                        <Col
                            lg={12}
                            className="px-lg-5"
                            style={{
                                background: "rgba(0, 0, 0, 0.65)",
                                position: 'abolute',
                                zIndex: 1
                            }}
                        >
                            <h1 className="mb-3">Acerca de nosotros:</h1>
                        </Col>
                        < Col
                            lg={12}
                            className="px-lg-5"
                            style={{
                                background: "rgba(0, 0, 0, 0.65)",
                                position: 'abolute',
                                zIndex: 1
                            }}>
                            <h4 className="mb-3"><TextEffects></TextEffects></h4>
                        </Col>
                    </Row>
                </Container>
            </header>

        </>
    );
}