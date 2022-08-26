import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import { loginUser } from '../services/login';
import jwt from 'jwt-decode';

describe('Component Blog',() => {
    let user = null;
    let tokenInfo = null;
    beforeAll(async () => {
        const dataUser = { username:'alexuser', passwordHash: 'alexpass' };
        user = await loginUser(dataUser);
        tokenInfo = jwt(user.token);
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

    test('show url and likes for default',() => {
        const blogToShow = {
            title: 'React is easy',
            author: 'alex maldonado',
            url: 'www.google.com',
            likes: 999,
            userOfBlog: tokenInfo.id
        };

        const component = render(
            <Blog blog={blogToShow} user={user}/>
        );

        const button = component.container.querySelector('button');
        fireEvent.click(button);

        expect(component.container.querySelector('.container-blog')).toHaveTextContent('URL: www.google.com');
        expect(component.container.querySelector('.container-blog')).toHaveTextContent('Likes: 999');
        expect(button).not.toHaveTextContent('show');

    });

    test('doing two click in button like',() => {
        const mockHandler = jest.fn();
        const blogToShow = {
            title: 'React is easy',
            author: 'alex maldonado',
            url: 'www.google.com',
            likes: 999,
            userOfBlog: tokenInfo.id
        };

        const component = render(
            <Blog blog={blogToShow} user={user} updateLikes={mockHandler}/>
        );

        const button = component.container.querySelector('button');
        fireEvent.click(button);


        const buttonLike = component.container.querySelector('.button-like');
        fireEvent.click(buttonLike);
        fireEvent.click(buttonLike);

        expect(mockHandler.mock.calls).toHaveLength(2);
    });
});