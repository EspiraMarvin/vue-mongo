describe('Providers List', () => {

  it('should have provider list component', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.providers-list')
  });

  it('should have edit and delete buttons', function () {
      cy.visit('/')

      cy.get('.add-client')
        .click()

      cy.get('.edit-provider')

      cy.get('.delete-provider')

  });

});
