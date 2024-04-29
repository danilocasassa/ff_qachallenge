Feature: Careers

  Scenario: Should have a QA job listed on website
    Given I visit the "careers" page
    And I dismiss the cookie section if visible
    When I scroll until the 'new jobs' section
    Then I should see "QA" job listed