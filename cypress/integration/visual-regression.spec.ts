context('Visual Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  it('should screenshot', () => {
    cy.compareSnapshot('home', 0.3);
  });
});
