context('Assertions Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('should name correct', () => {
    cy.get('.card.card-small.highlight-card').should('have.text', 'Angular app is running!');
  });
});
