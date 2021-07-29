import { render, cleanup, screen, waitFor, fireEvent } from "@testing-library/react";
import axiosMock from '../__mocks__/axios';
import Home from '../../index';

describe('Home', () => {
    const files = ['image1.png', 'image2.png'];

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    test('Should render without crashing', async () => {
        render(<Home />)
        await waitFor(() => screen.getByTestId('home'));
        const imageContainer = screen.queryByTestId('image-container-0');
        expect(imageContainer).toBe(null);
    });

    test('Should render two images', async () => {
        axiosMock.get.mockResolvedValueOnce({data:{files}});
        render(<Home />);
        await waitFor(() => screen.getByTestId('home'));
        const imageContainer0 = screen.queryByTestId('image-container-0');
        expect(imageContainer0).not.toBe(null);
        const imageContainer1 = screen.queryByTestId('image-container-1');
        expect(imageContainer1).not.toBe(null);
    });

    test('Should filter to one image', async() => {
        axiosMock.get.mockResolvedValueOnce({data:{files}});
        render(<Home />);
        const filterInput = await waitFor(() => screen.getByTestId('filter-input'));

        fireEvent.change(filterInput, {target: {value: '2'}});
        const imageContainer0 = screen.queryByTestId('image-container-0');
        expect(imageContainer0).not.toBe(null);
        const imageContainer1 = screen.queryByTestId('image-container-1');
        expect(imageContainer1).toBe(null);
    });

    test('Should filter to zero images', async() => {
        axiosMock.get.mockResolvedValueOnce({data:{files}});
        render(<Home />);
        const filterInput = await waitFor(() => screen.getByTestId('filter-input'));

        fireEvent.change(filterInput, {target: {value: '3'}});
        const imageContainer0 = screen.queryByTestId('image-container-0');
        expect(imageContainer0).toBe(null);
        const imageContainer1 = screen.queryByTestId('image-container-1');
        expect(imageContainer1).toBe(null);
    });

    test('Should render Showing 2 of 2 Images', async() => {
        axiosMock.get.mockResolvedValueOnce({data:{files}});
        render(<Home />);
        const titleContainer = await waitFor(() => screen.getByTestId('title-container'));
        expect(titleContainer).toHaveTextContent('Showing 2 of 2 Images');
    });

    test('Should render Showing 1 of 2 Images', async() => {
        axiosMock.get.mockResolvedValueOnce({data:{files}});
        render(<Home />);
        const inputElement = await waitFor(() => screen.getByTestId('filter-input'));
        fireEvent.change(inputElement, {target: {value: '1'}});

        const titleContainer = screen.getByTestId('title-container');
        expect(titleContainer).toHaveTextContent('Showing 1 of 2 Images');
    });

    test('Should call getImages one time', async() => {
        render(<Home />);
        await waitFor(() => screen.getByTestId('home'));
        expect(axiosMock.get).toBeCalledTimes(1);
    });
});
