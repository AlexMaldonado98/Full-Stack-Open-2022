describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST','http://localhost:3006/api/testing/reset');
        cy.visit('http://localhost:3000');
    });
    it('Login form is shown',() => {
        cy.contains('log in to application');
        cy.contains('Username');
        cy.contains('Password');
    });
});