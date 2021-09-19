describe('Add Edit Client Component', () => {
  it('should display Add Client as title', function () {
    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.toolbar-title')
      .should('contain', 'Add Client')
  });

  it('should display validation errors in case of empty fields form submission', function () {
    setTimeout(() => {

    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.submit-client')
      .click()

    cy.get('.name')
      .should('contain', 'Name is missing')
    }, 2000)
  });

});


