import { Outlet, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';  // Cuore pieno


export default function Layout() {

    return (
        <>
            <header className="bg-primary text-white p-3 shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <nav className="d-flex align-items-center">
                        <Link
                            className="text-white me-4 text-decoration-none fs-5 fw-bold hover-underline "
                            to="/"
                        >
                            Home
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



            <main className="container mt-4 min-vh-100 ">
                <Outlet />
            </main>

            <footer className="bg-primary  text-white p-3 mt-4">

            </footer>
        </>
    )
}