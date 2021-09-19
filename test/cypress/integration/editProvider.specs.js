describe('Add Providers Component', () => {
  it('should have a provider value in the provider component to be editted', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.edit-provider')
      .first().click()

    cy.get('.provider-edit-input')
      .invoke('val')
      .then(value => assert.isTrue(!value));

  });
});
