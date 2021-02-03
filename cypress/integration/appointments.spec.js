describe('Appointments', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    
    cy.visit('/');

    cy.contains('li', 'Monday').should('have.class', 'day-list__item--selected');
  });

  it('can book a new appointment', () => {
    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Jeff');
      
    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains('button', 'Save')
      .click();

    cy.contains('.appointment__card--show', 'Jeff');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('Can edit existing appointments', () => {
    cy.get('[alt=Edit]')
      .first()
      .click({ force: true });

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Jeff');

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains('button', 'Save')
      .click();

    cy.contains('.appointment__card--show', 'Jeff');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('Should cancel an interview', () => {
    cy.get('[alt=Delete]')
      .first()
      .click({ force: true });

    cy.contains('Confirm')
      .click();

    cy.contains('Deleting')
      .should('exist');

    cy.contains('Deleting')
      .should('not.exist');
  });
});