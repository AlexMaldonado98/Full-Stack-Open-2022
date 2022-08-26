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

    describe.only('When logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'alextest',
                passwordHash: 'alexpass'
            };
            cy.login(user);
            cy.addBlog({ title:'I\'m a new blog', author:'Alex Maldonado', url:'www.test.com' });
        });

        it('A blog can be created',() => {
            cy.contains('Title: I\'m a new blog Author: Alex Maldonado' );
        });

        it('pressing the like button 2 times', () => {
            cy.contains('Title: I\'m a new blog Author: Alex Maldonado' );
            cy.contains('show').click();
            cy.get('.button-like').click();
            cy.wait(500);
            cy.get('.button-like').click();
            cy.contains('Likes: 2');
        });

        it('the user deletes his blog', () => {
            cy.contains('show').click();
            cy.contains('Delete').click();
            cy.get('html').should('not.contain', 'Title: I\'m a new blog Author: Alex Maldonado' );
        });

        describe.only('ordered by the number of likes', () => {
            it('from highest to lowest',() => {
                //Adding two more blogs/there are totally tree blogs
                cy.addBlog({ title: 'second blog',author:'second', url: 'www.second.com' });
                cy.addBlog({ title: 'third blog',author:'third', url: 'www.third.com' });
                cy.contains('third blog');

                //ADDING LIKES

                //TWO LIKES. TITLE: I'm a new blog Author
                cy.get('.container-blog').eq(0).find('button').click();
                cy.contains('like').click().wait(500).click().parent().parent().contains('hide').click();

                //ONE LIKE. TITLE: second blog
                cy.get('.container-blog').eq(1).find('button').click();
                cy.contains('like').click().parent().parent().contains('hide').click();

                //TREE LIKES TITLE: third blog
                cy.get('.container-blog').eq(2).find('button').click();
                cy.contains('like').click().wait(500).click().wait(500).click().parent().parent().contains('hide').click();

                //expect
                cy.get('.container-blog').eq(0).contains('third blog');

                cy.get('.container-blog').eq(1).contains('I\'m a new blog');

                cy.get('.container-blog').eq(2).contains('second blog');

            });
        });
    });
});