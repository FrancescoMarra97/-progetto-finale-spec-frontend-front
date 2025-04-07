import { useEffect, useState } from "react"

type Game = {
    id?: number,
    readonly title: string;
    readonly category: string;
    platform?: string;
    rating?: number;
    price?: number;
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

    console.log(games);

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
    return (
        <>
            <h1>Home Page</h1>
            <div className="container">
                <div className="row ">
                    {games.map((game) => (
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