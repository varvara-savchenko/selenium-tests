# Testing Login Functionality

  Scenario: Checking error message for invalid login
    Given user is on UltimateQA login webpage
    When user enters an email address with incorrect password
    And user clicks on the Sign in button
    Then an error message should be displayed stating "Invalid email or password."