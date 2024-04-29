// data
const { urls } = require('../../../fixtures/data/common')

// locators
const { cookiePolicy } = require('../../../fixtures/locators/common')

function visitPage(page) {
    const url = `${urls.base}${urls[page.toLowerCase()]}`
    cy.visit(url, { timeout: 10000 })
}

function cookiePolicyIsVisible() {
    return cy.get(cookiePolicy.settings).should(($element) => {
        const isVisible = $element.is(':visible');
        console.log(isVisible)
        return isVisible;
      });
}

function dismissCookiePolicy() {
    if (cookiePolicyIsVisible()) {
        cy.get(cookiePolicy.accept).click();
    }
    cy.get(cookiePolicy).should('not.be.visible')
}

function setFocusOn(element) {
    cy.get(element).scrollIntoView().should('be.visible');
}

module.exports = {
    visitPage,
    dismissCookiePolicy,
    setFocusOn
}