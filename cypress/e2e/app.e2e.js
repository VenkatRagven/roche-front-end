describe('App', function () {
  const rowsToDisplay = 6
  const userDataMinValues = {
    'vuejs': [31, 34000],
    'Facebook': [31, 101000],
    'Evan You': [31, 200],
    'John Papa': [31, 25000],
    'Todd Motto': [31, 14000],
    'Angular': [31, 129000]
  }

  before(() => {
    cy.visit('http://localhost:8080')
    cy.wait(5000)
  })

  it('should display a table', () => {
    cy.get('table.user-list__table')
      .should('be.visible')
  })

  it('should display a table header', () => {
    cy.get('table.user-list__table')
      .find('> thead')
      .should('be.visible')
  })

  it('should display a table body', () => {
    cy.get('table.user-list__table')
      .find('> tbody')
      .should('be.visible')
  })

  it(`should display a table body with ${rowsToDisplay} rows`, () => {
    cy.get('table.user-list__table')
      .find('> tbody')
      .children('tr')
      .should('have.length', rowsToDisplay)
  })

  for (const userName in userDataMinValues) {
    it(`should display a table row with '${userName}' user name and appropriate values`, () => {
      cy.get('table.user-list__table')
        .find('> tbody')
        .children('tr')
        .contains(userName)
        .nextAll()
        .each(($element, userDataColumnIndex) => {
          expect($element.text()).to.gte(userDataMinValues[userName][userDataColumnIndex])
        })
    })
  }
})
