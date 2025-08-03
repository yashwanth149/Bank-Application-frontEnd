describe('Angular Material Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });

  it('should successfully log in with valid credentials', () => {
    cy.fixture('users').then((users) => {
      // Using data-cy selectors from your form
      cy.get('[data-cy="username"]').type(users.validUser.userId);
      cy.get('[data-cy="password"]').type(users.validUser.password);
      cy.get('[data-cy="login-button"]').click();
      
      cy.url().should('include', '/dash');
    });
  });

  it('should show error for invalid credentials', () => {
    cy.fixture('users').then((users) => {
      cy.get('[data-cy="username"]').type(users.invalidUser.userId);
      cy.get('[data-cy="password"]').type(users.invalidUser.password);
      cy.get('[data-cy="login-button"]').click();
      
    });
  });

  it('should disable login button when form is invalid', () => {
    cy.get('[data-cy="login-button"]').should('be.disabled');
    
    cy.get('[data-cy="username"]').type('test');
    cy.get('[data-cy="login-button"]').should('be.disabled');
  });
});
