import { render, screen, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import UploadButton from "../uploadButton";

describe('UploadButton', () => {
    const accept = '*.png';
    afterEach(() => cleanup());

    test('Should render without crashing', () => {
        render(<UploadButton />);
    });

    test('Should match snapshot', () => {
        const jsonTree = renderer.create(<UploadButton accept={accept} />).toJSON();
        expect(jsonTree).toMatchSnapshot();
    });

    test('Should have accept attibute', () => {
        render(<UploadButton accept={accept} />);
        const uploadButtonElement = screen.getByTestId('upload-input');
        expect(uploadButtonElement).toHaveAttribute('accept', accept);
    })
});