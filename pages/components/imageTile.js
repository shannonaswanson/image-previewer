import ImageTitle from '../styledComponents/h3';
import ImageContainer from '../styledComponents/imageContainer';

export default function ImageTile({ name, src }) {
    return (
        <div>
            <ImageTitle>{name}</ImageTitle>
            <ImageContainer src={src} />
        </div>
    );
}