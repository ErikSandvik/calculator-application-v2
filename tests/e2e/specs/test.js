// https://docs.cypress.io/api/table-of-contents

describe('Vue App End-To-End Tests', () => {
  it('Visits the app root url and checks for header', () => {
    cy.visit('http://localhost:8080/')
    cy.contains('header', 'Calculator Application')
  })

  it('Types into calculator', () => {
    cy.visit('http://localhost:8080/');
    cy.get('#one').click();
    cy.get('#plus').click();
    cy.get('#two').click();
    cy.get('#equals').click();

    cy.get('#currentNumber').should('have.text', '3');

  })

  it('Opens the log and checks value', () => {
    cy.get('#logButton').click();

    cy.get('#logWindow').contains('li', "1 + 2 = 3");
  })

  it('Goes to contact forms', () => {
    cy.get('.reviewButton img').click();

    cy.contains('label', "Name:");
  })


  it('Types in invalid input and submit button is disabled', () => {
    cy.get('.nameInputField').type("John Doe");
    cy.get('.emailInputField').type("johndoegmailcom");
    cy.get('.messageInputField').type("Hello world");

    cy.get('.submit button').should('be.disabled');
  })

  it('Submits form', () => {
    cy.get('.emailInputField').type("johndoe@gmail.com");


    cy.get('.submit button').click();

    cy.get('div.submissionStatus').should('exist');
  })

  it('Goes back', () => {
    cy.get('.backButton').click();

    cy.contains('header', 'Calculator Application');
  })



})
