import { Outlet, Link } from "react-router-dom"

/* type LayoutProps = {} */


export default function Layout() {

    return (
        <>
            <header className="bg-primary text-white p-3">
                <div className="container d-flex justify-content-center align-items-center">
                    <nav>
                        <Link className="text-white me-3 text-decoration-none" to="/">Home</Link>
                    </nav>
                </div>
            </header>

            <main className="container mt-4">
                <Outlet />
            </main>

            <footer className="bg-primary text-white p-3 mt-4">

            </footer>
        </>
    )
}