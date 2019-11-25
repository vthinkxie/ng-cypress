context('Assertions Regression', () => {
  beforeEach(() => {
    cy.visit('https://www.baidu.com');
  });
  it('should name correct', () => {
    cy.get('.soutu-btn').should('be.visible');
  });
});
