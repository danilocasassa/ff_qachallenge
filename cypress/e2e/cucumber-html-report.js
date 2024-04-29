const report = require("multiple-cucumber-html-reporter"); 

report.generate({
    jsonDir: "cypress/e2e/reports/cucumber-json", 
    reportPath: "cypress/e2e/reports/cucumber-htmlreport.html"
});