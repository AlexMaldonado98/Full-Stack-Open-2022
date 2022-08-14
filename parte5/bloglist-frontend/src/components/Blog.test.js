import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';
import { loginUser } from '../services/login';


describe('Component Blog',() => {
    let user = null;
    beforeAll(async () => {
        const dataUser = {username:'alexuser', passwordHash: 'alexpass'};
        user = await loginUser(dataUser);
    });


    test('show only title and author for default',() => {
        const blogToShow = {
            title: 'React is easy',
            author: 'alex maldonado',
            url: 'www.google.com',
            likes: 0
        };

        const component = render(
            <Blog blog={blogToShow} user={user}/>
        );

        expect(component.container.querySelector('.container-blog')).toHaveTextContent('Title: React is easy');
        expect(component.container.querySelector('.container-blog')).toHaveTextContent('Author: alex maldonado');
        expect(component.container.querySelector('.container-blog')).not.toHaveTextContent('www.google.com');

    });
});