# Full Fabrics - Senior QA Engineer

The results of the challenge for QA Position.

## Test cases

### E2E
#### TC.1 - Open the Careers Page and Check if exist a QA job listed
1. Open the Careers webpage `https://www.fullfabric.com/company/careers`
2. Close the cookie policy if shown
3. Navigate until the New Jobs section
4. Check if there's any QA Job listed


### API
#### TC.1 - Get all jobs from teamtailor API and check if exist a QA job listed and Open
##### Pre-requirements:
1. API token from the Careers webpage

##### Steps:
1. Do a request `GET` to teamtailor api to list all jobs `https://api.teamtailor.com/v1/jobs`
2. Check if the response is 200
3. Validate that there's any job for QA position
4. The job status should be `open`

#### TC.2 - Try change the job title using the API key from Careers webpage
##### Pre-requirements:
1. API Token from the Careers webpage

##### Steps:
1. Get the job id and title from the api
2. Do a request `PATCH` to teamtailor api to change the job title
- requestURL: `https://api.teamtailor.com/v1/jobs/{JOB_ID}`
- method: `PATCH`
- data: 
```sh
{
    "data": {
        "id": "{JOB_ID}",
        "attributes": {
            "title": "{NEW_JOB_TITLE}"
        },
        "type": "jobs"
    }
}
```
3. Check that the response code is `403`
4. Check the job title was not changed.
## Configuration

You have to install all dependencies first.
```sh
npm install
```

To setup the environment to run the API scenarios have to run the setup first:
```sh
npm run test:api:setup
```

This setup will navigate using selenium webdriver and mochajs to navigate until the Careers page and get the api token exposed there.
Will save a `.env` file on `./api` directory following the structure below:
```
TOKEN={TOKEN_API}
BASE_URL={TEAM_TAILOR_API}
```
## Running the Tests

### CYPRESS + CUCUMBER - E2E Scenario

To run the Cypress + Cucumber E2E test, you have to execute the following command:
```sh
npm run test:cypress
```

This command will run the E2E test on browser `Chrome` in `headless` mode (without open the browser view)
Will generate a report of the execution on terminal like below:
```
(Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  careers.feature                          00:05        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:05        1        1        -        -        -  

```
And will generate a HTML report on directory `./cypress/e2e/reports/cucumber-htmlreport.html/index.html`
Where is possible to see all steps executed on Gherkin structure like below:

<img width="439" alt="Screenshot 2024-04-29 at 12 43 27" src="https://github.com/danilocasassa/ff_qachallenge/assets/22626541/7b703023-2fa5-48e1-b063-e2206945ac69">


There are other ways to run the tests like other browser or without headless mode activated.

to run on `chrome` browser in `headed` mode:
```sh
npm run test:cypress:headed
```

To run on `edge` browser in `headless` mode:
```sh
npm run test:cypress:edge
```

to run on `chrome` browser in `headed` mode:
```sh
npm run test:cypress:headed:edge
```

All the results will follow the same logic, generating terminal results and the HTML file to better viewer.


### MOCHA-JS - API Scenarios

P.s.: just remembering the `step 2` on `Configuration` section:
> To setup the environment to run the API scenarios have to run the setup first:
> ```sh
> npm run test:api:setup
> ```

To run the API tests, you have to execute the following command:
```sh
npm run test:api
```

This command will run the API Test using the `Mocha JS` and `Axios` to do the requests in Javascript.
```
  Verify Job by Teamtailor API
    ✔ Get all jobs listed on API (817ms)
    Check the QA job is listed and opened
      ✔ Verify if the response status is 200
      ✔ Check if there's any QA job listed and open
    It's not possible change the job title using the website token
      ✔ Getting the QA job id
      ✔ Send a request to change the job title (138ms)
      ✔ Response status should be 403
      ✔ Check the job keep with the same title (251ms)


  7 passing (1s)
```

After that will generate a report file in HTML format to better viewer. 
This report will be created on `api/mochawesome-report` and the view is like below:

<img width="1151" alt="Screenshot 2024-04-29 at 13 13 12" src="https://github.com/danilocasassa/ff_qachallenge/assets/22626541/ba935a97-5361-4cd9-b8f4-5a88b365a1c2">



## THANK YOU
I'm so glad to participate on this challenge and any doubts or concern please, let me know.

Best regards,

DANILO CASASSA :) 
