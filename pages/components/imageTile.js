import ImageTitle from '../styledComponents/h3';
import ImageContainer from '../styledComponents/imageContainer';

export default function ImageTile({ name, src }) {
    return (
        <div data-testid='image-tile'>
            <ImageTitle data-testid='image-title'>{name}</ImageTitle>
            <ImageContainer data-testid='image-container' src={src} />
        </div>
    );
}