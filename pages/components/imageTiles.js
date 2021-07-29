import ImageTile from './imageTile';

export default function ImageTiles({images = [], sourceDirectory}) {
    return images.map((image, index) => {
        return (
            <div key={index} data-testid={`image-container-${index}`}>
                <ImageTile name={image} src={`${sourceDirectory}/${image}`} />
            </div>
        );
    });
}
