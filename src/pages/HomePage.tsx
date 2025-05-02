import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import GameCard from "../components/GameCard";
import Comparator from "../components/Comparator";

type Game = {
    id: number;
    readonly title: string;
    readonly category: string;
    platform?: string;
    rating?: number;
    price?: number;
    image?: string;
};

function isGame(data: unknown): data is Game {
    if (
        data &&
        typeof data === "object" &&
        "title" in data &&
        typeof data.title === "string" &&
        "category" in data &&
        typeof data.category === "string"
    ) {
        return true;
    }
    return false;
}

export default function HomePage() {
    const [games, setGames] = useState<Game[]>([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("crescente");
    const [selectedGame1Id, setSelectedGame1Id] = useState<number | null>(null);
    const [selectedGame2Id, setSelectedGame2Id] = useState<number | null>(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                const res = await fetch("http://localhost:3001/games");
                const data: Game = await res.json();
                if (Array.isArray(data) && data.every(isGame)) {
                    setGames(data);
                }
            } catch (err) {
                console.error("Errore nel fetch dei giochi");
            }
        }

        fetchGames();
    }, []);

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(query.trimEnd().toLowerCase()) &&
        (category === "" || game.category === category)
    );

    const sortedGames = filteredGames.sort((a, b) => {
        const aVal = a[sortBy as keyof Game] as string;
        const bVal = b[sortBy as keyof Game] as string;
        return sortOrder === "crescente"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
    });

    const handleCompare = (id: number) => {
        if (selectedGame1Id === id || selectedGame2Id === id) return alert("Oops! Sembra che tu abbia selezionato lo stesso gioco per il confronto. Scegli due titoli diversi per confrontare le loro caratteristiche!"); // già selezionato
        if (!selectedGame1Id) setSelectedGame1Id(id);
        else if (!selectedGame2Id) setSelectedGame2Id(id);
    };



    return (
        <>
            <div className="d-flex justify-content-end">

                <Searchbar
                    query={query}
                    setQuery={setQuery}
                    category={category}
                    setCategory={setCategory}
                />
            </div>

            <div className="d-flex gap-3 align-items-center mx-4 mb-3">
                <div>
                    <label className="me-2">Ordina per:</label>
                    <select
                        className="form-select d-inline w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="title">Titolo</option>
                        <option value="category">Categoria</option>
                    </select>
                </div>
                <div>
                    <label className="me-2">Ordine:</label>
                    <select
                        className="form-select d-inline w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="crescente">A - Z</option>
                        <option value="decrescente">Z - A</option>
                    </select>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {sortedGames.length > 0 ? sortedGames.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            category={game.category}
                            image={game.image}
                            onCompare={handleCompare}
                            isSelected={game.id === selectedGame1Id || game.id === selectedGame2Id}
                        />
                    )) : <p className="text-center text-white pt-2" style={{ fontSize: "2rem" }}>Nessun gioco Trovato</p>}
                </div>

                {(selectedGame1Id || selectedGame2Id) && (
                    <div className="d-flex justify-content-center">
                        <Comparator
                            selectedGame1Id={selectedGame1Id}
                            selectedGame2Id={selectedGame2Id}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
