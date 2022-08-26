import '@testing-library/jest-dom/extend-expect';
import { BlogForm } from './BlogForm';
import { render,fireEvent } from '@testing-library/react';

describe('Component Blog',() => {
    test('Creating a new blog and verifing the form data', () => {
        const mockhandler = jest.fn();

        const { container } = render(
            <BlogForm handleNewBlog={mockhandler} />
        );

        const titleInput = container.querySelector('input[name=title]');
        const authorInput = container.querySelector('input[name=author]');
        const urlInput = container.querySelector('input[name=url]');
        const button = container.querySelector('button');

        fireEvent.change(titleInput,{
            target: { value: 'Nuevo Blog' }
        });
        fireEvent.change(authorInput,{
            target: { value: 'Alex Maldonado' }
        });
        fireEvent.change(urlInput,{
            target: { value: 'www.google.com' }
        });
        fireEvent.click(button);

        expect(mockhandler.mock.calls).toHaveLength(1);

        expect(mockhandler.mock.calls[0][0]).toBe('Nuevo Blog');
        expect(mockhandler.mock.calls[0][1]).toBe('Alex Maldonado');
        expect(mockhandler.mock.calls[0][2]).toBe('www.google.com');
    });
});