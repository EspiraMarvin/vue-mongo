describe('Add Providers Component', () => {
  it('should have a provider value in the provider component to be editted', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.edit-provider')
      .last().click()

    cy.get('.provider-edit-input')
      .invoke('val')
      .then(value => assert.isTrue(!value));

    cy.get('.provider-edit-input')
      .clear()

    cy.get('.provider-edit-input')
      .type('provider 07')

    cy.get('.update-provider')
      .click()

    setTimeout(() => {
      cy.get('.providers-list')
        .should('contain', 'provider 07')
    }, 3000)

  });
});
