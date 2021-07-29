import {render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import ImageTile from '../imageTile';

describe('ImageTile ', () => {
    const name = 'hello';
    const src = 'world';
    afterEach(() => cleanup());

    test('should render without crashing', () => {
        render(<ImageTile />);
    });

    test('should match snapshot', () => {
        const jsonTree = renderer.create(<ImageTile name={name} src={src} />).toJSON();
        expect(jsonTree).toMatchSnapshot();
    });

    test('should render with name and src attribute', () => {
        render(<ImageTile name={name} src={src} />);
        const imageTileElement = screen.getByTestId('image-tile');
        expect(imageTileElement).toHaveTextContent(name);

        const imageContainer = screen.getByTestId('image-container');
        expect(imageContainer).toHaveAttribute('src', src);
    });
});