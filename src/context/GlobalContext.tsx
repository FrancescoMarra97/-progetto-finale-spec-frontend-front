import { createContext, useContext, useState, ReactNode } from "react";

type Game = {
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

    const addFavorite = (game: Game) => {
        if (!favorites.find(f => f.id === game.id)) {
            setFavorites([...favorites, game]);
        }
    };

    const removeFavorite = (gameId: number) => {
        setFavorites(favorites.filter(f => f.id !== gameId));
    };

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
