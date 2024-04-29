const assert = require('chai').assert
const Teamtailor = require('../support/teamtailor');
const { jobsReference } = require('../../fixtures/data/carrers')

let teamtailor;
let response;

describe('Verify Job by Teamtailor API', function () {

    before(() =>{
        teamtailor = new Teamtailor();
    })

    it('Get all jobs listed on API', async function() {
        response = await teamtailor.listJobs();
    });

    describe("Check the QA job is listed and opened", function() {


        it("Verify if the response status is 200", function() {
            assert.equal(response.status, 200, `Response status should be 200`);
        })

        it("Check if there's any QA job listed and open", async function() {
            const jobs = []
            for (const job of response.data.data) {
                jobs.push({
                    title: job.attributes.title,
                    status: job.attributes.status
                })
            }
            const jobRef = jobsReference.find(job => job.job = 'qa');
            for (const job of jobs) {
                for (const keyword of jobRef.keywords) {
                    if (job.title.toLowerCase().includes(keyword.toLowerCase())) {
                        assert.equal(job.status.toLowerCase(), 'open',
                            `Job "${job.title}" was found, but the status is "${job.status}" and should be "open"`)
                    }
                }
            }
        })
    })

    describe("It's not possible change the job title using the website token", function() {

        let jobId, jobTitle, patchResponse

        it('Getting the QA job id', async function() {
            const qaJob = response.data.data.find(job => job.attributes.title.toLowerCase().includes('quality assurance'));
            jobId = qaJob.id;
            jobTitle = qaJob.attributes.title;
        });

        it("Send a request to change the job title", async function() {
            patchResponse = await teamtailor.changeJobTitle(jobId, jobTitle);
        });

        it("Response status should be 403", function() {
            assert.equal(patchResponse.status, 403, `Response status should be 403`);
        });

        it("Check the job keep with the same title", async function() {
            const jobData = await teamtailor.getJob(jobId);
            const currentTitle = jobData.data.data.attributes.title
            assert.equal(currentTitle, jobTitle, `The job title is not the same!`)
        })
    })
});