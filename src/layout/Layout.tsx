import { Outlet, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function Layout() {

    return (
        <>
            <header className="text-white shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <nav className="d-flex align-items-center">
                        <Link
                            className="text-white me-4 text-decoration-none fs-5 fw-bold hover-underline "
                            to="/"
                        >
                            <img src="/public/img/logo2.png" style={{ width: "150px" }} alt="" />
                        </Link>
                    </nav>
                    <nav className="d-flex align-items-center">
                        <Link to="/favorites" className="d-flex align-items-center text-decoration-none">
                            <FontAwesomeIcon
                                icon={faHeartSolid}
                                className="text-danger"
                                style={{ fontSize: '1.75rem', transition: 'color 0.3s ease' }}
                            />
                        </Link>
                    </nav>
                </div>
            </header>



            <main>
                <div className="container min-vh-100 ">
                    <Outlet />
                </div>
            </main>

            <footer className="shadow-sm text-white">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="footer-links">
                        <ul className="list-unstyled d-flex">
                            <li className="me-3">
                                <Link to="/" className="text-white text-decoration-none">About Us</Link>
                            </li>
                            <li className="me-3">
                                <Link to="/" className="text-white text-decoration-none">Contatti</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-social-icons">
                        <ul className="list-unstyled d-flex">
                            <li className="me-3">
                                <a href="https://twitter.com" className="text-white">
                                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                                </a>
                            </li>
                            <li className="me-3">
                                <a href="https://instagram.com" className="text-white">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                </a>
                            </li>
                            <li className="me-3">
                                <a href="https://facebook.com" className="text-white">
                                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}