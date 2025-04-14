

type SearchBarProps = {
    query: string,
    setQuery: (value: string) => void,
    category?: string
    setCategory: (value: string) => void
}

export default function Searchbar({ query, setQuery, setCategory }: SearchBarProps) {



    return (
        <>
            <div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    placeholder="Cerca un gioco..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select
                    className="form-select w-50 m-2 rounded-pill shadow-sm"
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Tutte le categorie</option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Racing">Racing</option>
                    <option value="Simulation">Simulation</option>
                    <option value=" Horror"> Horror</option>
                    <option value="Sandbox">Sandbox</option>
                </select>
            </div>
        </>
    )
}