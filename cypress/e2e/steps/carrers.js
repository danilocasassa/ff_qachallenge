import { expect } from 'chai';

const common = require('./common')

// data
const { jobsReference } = require('../../../fixtures/data/carrers');

// locators
const { newJobs } = require('../../../fixtures/locators/carrers');

function setFocusOnNewJobsSection() {
    common.setFocusOn(newJobs.container);
}

function isThereJobListed(jobReference) {
    let matchedJob
    jobsReference.forEach((jobRef) => {
        const matchedKeyword = jobRef.keywords.find(keyword => keyword.toLowerCase().includes(jobReference.toLowerCase()));

        if (matchedKeyword) {
            matchedJob = jobRef.job.toLowerCase();
        }
    });
    const message = `Any jobs match with "${jobReference}" reference.`
    expect(matchedJob, message).to.not.be.undefined;
}

module.exports = {
    setFocusOnNewJobsSection,
    isThereJobListed
}