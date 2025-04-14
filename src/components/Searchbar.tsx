import { useCallback, useRef, useState } from "react";

type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
    category?: string;
    setCategory: (value: string) => void;
};

export default function Searchbar({ query, setQuery, setCategory }: SearchBarProps) {
    const [localInput, setLocalInput] = useState(query);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedSetQuery = useCallback((value: string) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setQuery(value);
        }, 500);
    }, [setQuery]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalInput(value);       // aggiorna subito l'input visualizzato
        debouncedSetQuery(value);   // aggiorna query in ritardo
    };

    return (
        <div>
            <input
                type="text"
                className="form-control form-control-lg rounded-pill shadow-sm"
                placeholder="Cerca un gioco..."
                value={localInput}
                onChange={handleChange}
            />
            <select
                className="form-select w-50 m-2 rounded-pill shadow-sm"
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Tutte le categorie</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Adventure">Adventure</option>
                <option value="Racing">Racing</option>
                <option value="Simulation">Simulation</option>
                <option value="Horror">Horror</option>
                <option value="Sandbox">Sandbox</option>
            </select>
        </div>
    );
}
