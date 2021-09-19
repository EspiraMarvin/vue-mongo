describe('Client Resource', () => {
  it('Creating a New Client if the client does not exist', () => {

    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.name')
      .type('Cypress Test')

    cy.get('.email')
      .type('cypresstest@gmail.com')

    cy.get('.phone')
      .type('8175698906')

    cy.get('.checkbox-two')
      .first().click()

    cy.get('.checkbox-two')
      .last().click()

    cy.get('.submit-client')
      .click()

    setTimeout(() => {
      cy.get('.table').should('contain', 'cypresstest@gmail.com')
    }, 4000)

  })
})
