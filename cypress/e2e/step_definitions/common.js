import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

//steps
const common = require('../steps/common.js')
const carrers = require('../steps/carrers.js')

Given('I visit the {string} page', (page) => {
    common.visitPage(page)
});

Given('I dismiss the cookie section if visible', () => {
    common.dismissCookiePolicy()
});

When('I scroll until the {string} section', (section) => {
    switch (section.toLowerCase()) {
        case 'new jobs':
            carrers.setFocusOnNewJobsSection()
            break;
        default:
            throw new Error(`Section "${section}" is not configured yet.`)
    }
});

Then("I should see {string} job listed", (job) =>  {
    carrers.isThereJobListed(job)
})