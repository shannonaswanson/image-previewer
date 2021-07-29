import { screen, render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import ImageTiles from '../imageTiles';

describe('ImageTiles', () => {
    const images = ['hello', 'world'];
    const sourceDirectory = '/source/directory';

    afterEach(() => cleanup());

    test('should render without crashing', () => {
        render(<ImageTiles />);
    });

    test('should match snap shot', () => {
        const jsonTree = renderer.create(<ImageTiles images={images} sourceDirectory={sourceDirectory} />).toJSON();
        expect(jsonTree).toMatchSnapshot();
    });

    test('should render 2 images', () => {
        render(<ImageTiles images={images} sourceDirectory={sourceDirectory} />);
        const imageContainerElement1 = screen.getByTestId('image-container-0');
        expect(imageContainerElement1).toBeInTheDocument();

        const imageContainerElement2 = screen.getByTestId('image-container-1');
        expect(imageContainerElement2).toBeInTheDocument();
    })
});