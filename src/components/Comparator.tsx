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
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // stato per tracciare la card selezionata

    useEffect(() => {
        if (!selectedGame1Id || !selectedGame2Id) {
            setGame1(null);
            setGame2(null);
            return;
        }

        async function fetchGames() {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(`http://localhost:3001/games/${selectedGame1Id}`),
                    fetch(`http://localhost:3001/games/${selectedGame2Id}`),
                ]);

                if (!res1.ok || !res2.ok) {
                    console.error("Errore nel recupero dei dati");
                    return;
                }

                const data1 = await res1.json();
                const data2 = await res2.json();

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

    useEffect(() => {
        if (selectedGame1Id && selectedGame2Id && selectedGame1Id === selectedGame2Id) {
            alert("Non puoi confrontare lo stesso gioco!");
        }
    }, [selectedGame1Id, selectedGame2Id]);

    if (!selectedGame1Id || !selectedGame2Id) {
        return <p className="text-center text-white">Seleziona due giochi per confrontarli.</p>;
    }

    if (selectedGame1Id === selectedGame2Id) {
        alert("Non puoi confrontare lo stesso gioco");
        return null;
    }



    if (!game1 || !game2) {
        return <p className="text-center text-white">Caricamento giochi...</p>;
    }


    const getCardClass = (gameId: number) => {
        return gameId === selectedCardId ? "card-selected" : "";
    };

    return (
        <div className="row mt-5">
            <h2 className="mb-4 text-center text-white">Record Comparati</h2>
            {[game1, game2].map((game, id) => (
                <div key={id} className="col-md-6">
                    <div
                        className={`card h-100 shadow ${getCardClass(game.id)}`}
                        style={{
                            width: "400px"
                        }}
                        onClick={() => setSelectedCardId(game.id)}
                    >
                        <img
                            src={game.game.image || "https://picsum.photos/200/300"}
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
