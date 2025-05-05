import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Game = {
    image: string;
    category: string;
    id: number;
    title: string;
};

type GlobalContextType = {
    favorites: Game[];
    addFavorite: (game: Game) => void;
    removeFavorite: (gameId: number) => void;
    isFavorite: (gameId: number) => boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Game[]>([]);

    // Carica i preferiti dal localStorage quando il componente viene montato
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);


    const addFavorite = (game: Game) => {
        if (!favorites.find(f => f.id === game.id)) {
            const updatedFavorites = [...favorites, game];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    // Rimuovi un preferito e aggiorna il localStorage
    const removeFavorite = (gameId: number) => {
        const updatedFavorites = favorites.filter(f => f.id !== gameId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    // Verifica se un gioco è nei preferiti
    const isFavorite = (gameId: number) => {
        return favorites.some(f => f.id === gameId);
    };

    return (
        <GlobalContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useFavorites deve essere usato dentro GlobalContextProvider");
    }
    return context;
};
