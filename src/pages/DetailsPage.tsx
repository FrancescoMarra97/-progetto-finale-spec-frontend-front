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
        return <div className="container"><p className="text-center text-white pt-2" style={{ fontSize: "2rem" }}>Nessun Gioco trovato</p></div>
    }

    return (
        <>
            <div className="container text-white">
                <img src={"https://picsum.photos/600/400"} className="img-fluid mt-3 mb-3" alt={game.title} />
                <h1>{game.title}</h1>
                <p><strong>Categoria:</strong> {game.category}</p>
                <p><strong>Piattaforma:</strong> {game.platform}</p>
                <p><strong>Prezzo:</strong> €{game.price}</p>
                <p><strong>Rating:</strong> {game.rating}</p>
            </div>
        </>
    )
}