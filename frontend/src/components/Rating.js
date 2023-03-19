import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Rating = ({ caption, rating, numReviews }) => {
    return (
        <div className="rating">
            <span>
                {rating >= 1 ? (
                    <FontAwesomeIcon icon={faStarSolid} />
                ) : rating < 0.5 ? (
                    <FontAwesomeIcon icon={faStarRegular} />
                ) : (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                )}
            </span>
            <span>
                {rating >= 2 ? (
                    <FontAwesomeIcon icon={faStarSolid} />
                ) : rating >= 1.5 ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStarRegular} />
                )}
            </span>
            <span>
                {rating >= 3 ? (
                    <FontAwesomeIcon icon={faStarSolid} />
                ) : rating >= 2.5 ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStarRegular} />
                )}
            </span>
            <span>
                {rating >= 4 ? (
                    <FontAwesomeIcon icon={faStarSolid} />
                ) : rating >= 3.5 ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStarRegular} />
                )}
            </span>
            <span>
                {rating >= 5 ? (
                    <FontAwesomeIcon icon={faStarSolid} />
                ) : rating >= 4.5 ? (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                ) : (
                    <FontAwesomeIcon icon={faStarRegular} />
                )}
            </span>
            {caption && <span>{caption}</span>}
            {numReviews && <span>&emsp;{numReviews} reviews</span>}
        </div>
    );
};
