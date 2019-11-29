context('Visual Regression', () => {
  beforeEach(() => {
    cy.viewport(1440, 900, {log: true});
    cy.visit('http://localhost:4200');
  });
  it('should screenshot', () => {
    cy.compareSnapshot('home', 0);
  });
});
