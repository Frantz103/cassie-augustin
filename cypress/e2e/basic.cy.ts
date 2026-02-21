describe('homepage smoke', () => {
  it('renders the homepage shell and key navigation', () => {
    cy.visit('/');

    cy.url().should('include', '/');
    cy.get('h1').should('be.visible').invoke('text').should('not.be.empty');
    cy.contains('a', 'Lookbook').should('have.attr', 'href', '/lookbook');
  });
});
