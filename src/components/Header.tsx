import { Link } from "@tanstack/react-router";

export default function Header() {
    return (
        // coffee themed header
        <header className="p-4 bg-yellow-800 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">Brew Log</h1>
            <nav>
                <Link to="/" className="mr-4 hover:underline">
                    Home
                </Link>
                <Link to="/beans" className="hover:underline">
                    My Beans
                </Link>
            </nav>
        </header>
    )
}