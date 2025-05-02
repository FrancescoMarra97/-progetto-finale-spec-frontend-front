import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';  // Cuore vuoto
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';  // Cuore pieno
import { Link } from 'react-router-dom';

import { useFavorites } from "../context/GlobalContext";

type GameCardProps = {
    id: number;
    title: string;
    category: string;
    image?: string;
    onCompare: (id: number) => void;
    isSelected: boolean;
};

export default function GameCard({ id, title, category, image, onCompare, isSelected }: GameCardProps) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    // Verifica se il gioco è nei preferiti
    const favorite = isFavorite(id);

    // Funzione per aggiungere o rimuovere dai preferiti
    const toggleFavorite = () => {
        favorite ? removeFavorite(id) : addFavorite({ id, title, category, image });
    };

    return (
        <div className="col-md-4 mb-4">
            <div className={`card h-100 shadow ${isSelected ? "card-selected" : ""}`}>
                <div className="position-relative">
                    <FontAwesomeIcon
                        icon={favorite ? faHeartSolid : faHeartRegular}
                        className={`position-absolute top-0 end-0 p-2 ${favorite ? 'text-danger' : 'trasparent'}`}
                        onClick={toggleFavorite}
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    />
                    <Link to={`/games/${id}`}>
                        <img
                            src={image || "https://picsum.photos/200/300"}
                            className="card-img-top"
                            alt={title}
                            style={{ objectFit: "cover", height: "200px" }}
                        />
                    </Link>
                </div>
                <Link to={`/games/${id}`} className='text-decoration-none' style={{ color: "inherit" }}>
                    <div className="card-body ">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text mt-1"><strong>Categoria:</strong> {category}</p>
                    </div>
                </Link>
                <div className="m-3">
                    {onCompare && <button className="btn btn-primary" onClick={() => onCompare(id)}>
                        Confronta
                    </button>
                    }
                </div>

            </div>
        </div >
    );
}
