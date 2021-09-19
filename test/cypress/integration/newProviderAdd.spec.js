describe('Add Providers Component', () => {
  it('should have add provider to list of providers if the provider does not exists', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.provider-add-input')
      .type('provider 40')

    cy.get('.add-provider')
      .click()

    setTimeout(() => {
      cy.get('.providers-list')
      .should('contain', 'Provider 40')
    }, 3000)

  });
});
