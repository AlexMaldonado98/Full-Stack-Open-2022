describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3006/api/testing/reset');
        cy.request('POST', 'http://localhost:3006/api/users', {
            username: 'alextest',
            name: 'alex',
            passwordHash: 'alexpass'
        });
        cy.visit('http://localhost:3000');
    });
    it('Login form is shown', () => {
        cy.contains('log in to application');
        cy.contains('Username');
        cy.contains('Password');
    });

    describe('login', () => {
        it('succeeds with correct credentials', () => {
            cy.get('input[name=Username]').type('alextest');
            cy.get('input[name=Password]').type('alexpass');
            cy.get('#login-button').click();
            cy.contains('user: alextest logged in');
        });

        it('succeeds with incorrect credentials', () => {
            cy.get('input[name=Username]').type('alextest');
            cy.get('input[name=Password]').type('badpassword');
            cy.get('#login-button').click();
            cy.contains('the username or password is incorrect.');
        });
    });

    describe('When logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'alextest',
                passwordHash: 'alexpass'
            };
            cy.login(user);
        });

        it('A blog can be created',() => {
            cy.contains('New Blog').click();
            cy.get('input[name=title]').type('I\'m a new blog');
            cy.get('input[name=author]').type('Alex Maldonado');
            cy.get('input[name=url]').type('www.test.com');
            cy.contains('create blog').click();
            cy.contains('Title: I\'m a new blog Author: Alex Maldonado' );
        });
    });
});