import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


type Game = {
    id?: number,
    readonly title: string;
    readonly category: string;
    platform?: string;
    rating?: number;
    price?: number;
    image?: string
}
export default function DetailsPage() {
    const [game, setGame] = useState<Game | null>(null)
    const { id } = useParams()

    console.log(game);

    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch(`http://localhost:3001/games/${id}`)
                if (!res.ok) {
                    throw new Error(`Errore HTTP ${res.status}: ${res.statusText}`);
                }
                const data = await res.json()
                setGame(data.game)
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Errore durante il recupero dei dati", error.message)
                } else {
                    console.error("Errore sconosciuto");
                }
            }
        }
        fetchGames()
    }, [id])

    if (!game) {
        return <div className="container mt-5"><p className="text-center" style={{ fontSize: "1.5rem" }}>Nessun Gioco trovato</p></div>
    }

    return (
        <>
            <div className="container mt-5">
                <img src={"https://placehold.co/600x400/png"} className="img-fluid mb-3" alt={game.title} />
                <h1>{game.title}</h1>
                <p><strong>Categoria:</strong> {game.category}</p>
                <p><strong>Piattaforma:</strong> {game.platform}</p>
                <p><strong>Prezzo:</strong> €{game.price}</p>
                <p><strong>Rating:</strong> {game.rating}</p>
            </div>
        </>
    )
}