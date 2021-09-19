
const randomEmail = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';
  for(let ii=0; ii<14; ii++){
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + '@gmail.com'
}

describe('Client Resource', () => {
  it('Creating a New Client if the client does not exist', () => {

    cy.visit('/')

    cy.get('.add-client')
      .click()

    cy.get('.name')
      .type('Cypress Test')

    cy.get('.email')
      .type(randomEmail())

    cy.get('.phone')
      .type('8175698906')

    cy.get('.checkbox')
      .first().click()

    cy.get('.checkbox')
      .last().click()

    cy.get('.submit-client')
      .click()

    setTimeout(() => {
      cy.get('.table').should('contain', 'Cypress Test')
    }, 4000)

  })
})
