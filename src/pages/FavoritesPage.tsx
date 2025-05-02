import { useFavorites } from "../context/GlobalContext"
import GameCard from "../components/GameCard"



export default function FavouritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="container">
            <h1 className="pt-2 pb-2 text-white" style={{ fontSize: "2.5rem" }}>Preferiti</h1>
            <div className="row">
                {favorites.length === 0 ? (
                    <p className="text-white" style={{ fontSize: "2rem" }}>Non hai ancora aggiunto nessun gioco ai preferiti.</p>
                ) : (
                    favorites.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            category={game.category}
                            isSelected={false}
                        />
                    ))
                )}
            </div>
        </div>
    )
}