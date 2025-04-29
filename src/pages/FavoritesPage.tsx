import { useFavorites } from "../context/GlobalContext"
import GameCard from "../components/GameCard"



export default function FavouritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="container">
            <h1>Preferiti</h1>
            <div className="row">
                {favorites.length === 0 ? (
                    <p>Non hai ancora aggiunto nessun gioco ai preferiti.</p>
                ) : (
                    favorites.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            title={game.title}
                            category={game.category}
                            image={game.image}
                            onCompare={() => { }}
                        />
                    ))
                )}
            </div>
        </div>
    )
}