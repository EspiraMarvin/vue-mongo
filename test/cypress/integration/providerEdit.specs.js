describe('Add Providers Component', () => {
  it('should have a provider value in the provider component to be editted', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.edit-provider')
      .last().click()

    cy.get('.provider-edit-input')
      .not('')
  });

  it('should edit last provider to be "provider 07', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.edit-provider')
      .last().click()

    cy.get('.provider-edit-input')
      .clear()

    cy.get('.provider-edit-input')
      .type('provider 08')

    cy.get('.update-provider')
      .click()

    setTimeout(() => {
      cy.get('.providers-list')
        .should('contain', 'provider 08')
    }, 3000)

  });
});
