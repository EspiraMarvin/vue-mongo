/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'Quasar');
  });

  // it('should have list of clients as title', function () {
  //   cy.title().should('include', 'List of clients')
  // });
  // it('.should() - assert that <div> is correct', () => {
  //   cy.title().should('include', ' List of clients');
  // });
});

describe('Client Resource', () => {
  it('Creating a New Client', () => {
    cy.visit('/')

    // cy.get('.name') // 2.
    //   .type('My First Post') // 3.
    //
    // cy.get('input.post-body') // 4.
    //   .type('Hello, world!') // 5.

    cy.get('.submit')
      .click()

    cy.get('.name')
      .type('My First Post')

    cy.get('.email')
      .type('morgan@gmail.com')

    cy.get('.phone')
      .type('8175698906')

    // cy.contains('submit') // 6.
    //   .click() // 7.

    // cy.url() // 8.
    //   .should('include', '/posts/my-first-post')
    //
    // cy.get('h1') // 9.
    //   .should('contain', 'My First Post')
  })
})

// ** The following code is an example to show you how to write some tests for your home page **
//
// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('has pretty background', () => {
//     cy.dataCy('landing-wrapper')
//       .should('have.css', 'background').and('match', /(".+(\/img\/background).+\.png)/);
//   });
//   it('has pretty logo', () => {
//     cy.dataCy('landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/);
//   });
//   it('has very important information', () => {
//     cy.dataCy('instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD');
//   });
// });
