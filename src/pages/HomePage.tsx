import { useEffect, useState } from "react"
import Searchbar from "../components/Searchbar"

type Game = {
    id?: number,
    readonly title: string;
    readonly category: string;
    platform?: string;
    rating?: number;
    price?: number;
    image?: string
}

function isGame(data: unknown): data is Game {
    if (
        data &&
        typeof data === "object" &&
        "title" in data &&
        typeof data.title === "string" &&
        "category" in data &&
        typeof data.category === "string"
    ) {
        return true
    }
    return false
}

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([])
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const [sortBy, setSortBy] = useState("title")
    const [sortOrder, setSortOrder] = useState("crescente")

    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch("http://localhost:3001/games")
                if (!res.ok) {
                    throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
                }
                const data: unknown = await res.json()
                if (Array.isArray(data) && data.every(isGame)) {
                    setGames(data);
                } else {
                    throw new Error("I dati ricevuti non sono nel formato corretto");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Errore durante il recupero dei dati", error.message)
                } else {
                    console.error("Errore sconosciuto");
                }
            }
        }
        fetchGames()
    }, [])

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === "" || game.category === category)
    )

    const sortedGames = filteredGames.sort((a, b) => {
        const aVal = a[sortBy as keyof Game] as string
        const bVal = b[sortBy as keyof Game] as string

        return sortOrder === "crescente"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
    })
    return (
        <>
            <div className="d-flex justify-content-between m-4">
                <h1>Home Page</h1>
                <Searchbar query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
            </div>
            <div className="d-flex gap-3 align-items-center mx-4 mb-3">
                <div>
                    <label className="me-2">Ordina per:</label>
                    <select className="form-select d-inline w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="title">Titolo</option>
                        <option value="category">Categoria</option>
                    </select>
                </div>
                <div>
                    <label className="me-2">Ordine:</label>
                    <select className="form-select d-inline w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="crescente">A - Z</option>
                        <option value="decrescente">Z - A</option>
                    </select>
                </div>
            </div>
            <div className="container">
                <div className="row ">
                    {sortedGames.map((game) => (
                        <div className="col-md-4" key={game.id}>
                            <div className="card m-1">
                                <img
                                    src="https://placehold.co/600x400/png"
                                    className="card-img-top"
                                    alt={game.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{game.title}</h5>
                                    <p className="card-text"><strong>Categoria: </strong>{game.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}