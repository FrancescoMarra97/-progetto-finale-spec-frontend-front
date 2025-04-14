import { useEffect, useState } from "react";

type Game = {
    id: number;
    readonly title: string;
    readonly category: string;
    platform?: string;
    rating?: number;
    price?: number;
    image?: string;
};

type ComparatorProps = {
    selectedGame1Id: number | null;
    selectedGame2Id: number | null;
};

export default function Comparator({
    selectedGame1Id,
    selectedGame2Id,
}: ComparatorProps) {
    const [game1, setGame1] = useState<Game | null>(null);
    const [game2, setGame2] = useState<Game | null>(null);

    useEffect(() => {
        // Verifica se gli ID sono corretti
        console.log("selectedGame1Id:", selectedGame1Id);
        console.log("selectedGame2Id:", selectedGame2Id);

        // Se manca uno degli ID o sono uguali, non fare fetch
        if (!selectedGame1Id || !selectedGame2Id || selectedGame1Id === selectedGame2Id) {
            setGame1(null);
            setGame2(null);
            return;
        }

        async function fetchGames() {
            try {
                // Fetch per entrambi i giochi
                const [res1, res2] = await Promise.all([
                    fetch(`http://localhost:3001/games/${selectedGame1Id}`),
                    fetch(`http://localhost:3001/games/${selectedGame2Id}`),
                ]);

                // Verifica se le risposte sono ok
                if (!res1.ok || !res2.ok) {
                    console.error("Errore nel recupero dei dati");
                    return;
                }

                const data1 = await res1.json();
                const data2 = await res2.json();

                // Log per il debugging
                console.log("Data gioco 1:", data1);
                console.log("Data gioco 2:", data2);

                // Imposta i giochi nel state
                setGame1(data1);
                setGame2(data2);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Errore durante il recupero dei dati", error.message);
                } else {
                    console.error("Errore sconosciuto");
                }
            }
        }

        fetchGames();
    }, [selectedGame1Id, selectedGame2Id]);

    // Verifica che gli ID siano impostati
    if (!selectedGame1Id || !selectedGame2Id) {
        return <p className="text-center mt-4">Seleziona due giochi per confrontarli.</p>;
    }

    if (selectedGame1Id === selectedGame2Id) {
        return <div className="alert alert-warning">Non puoi confrontare lo stesso gioco.</div>;
    }

    // Verifica se i giochi sono caricati
    if (!game1 || !game2) {
        return <p className="text-center mt-4">Caricamento giochi...</p>;
    }


    return (
        <div className="row mt-5">
            <h2 className="mb-2 text-center">Rerord Comparati</h2>
            {[game1, game2].map((game, id) => (
                <div key={id} className="col-md-6">
                    <div className="card h-100 shadow" style={{ width: "400px" }}>
                        <img
                            src={game.image || "https://picsum.photos/200/300"}
                            className="card-img-top"
                            alt={game.game.title}
                            style={{ objectFit: "cover", height: "200px" }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{game.game.title}</h5>
                            <p className="card-text"><strong>Categoria:</strong> {game.game.category}</p>
                            <p className="card-text"><strong>Piattaforma:</strong> {game.game.platform}</p>
                            <p className="card-text"><strong>Rating:</strong> {game.game.rating}</p>
                            <p className="card-text"><strong>Prezzo:</strong> €{game.game.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
