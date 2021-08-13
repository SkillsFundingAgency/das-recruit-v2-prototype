/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

var moment = require('moment');
var locations = require('./locations.json')
var training = require('./training.json')
var training_full = require('./training-full.json')
var vacancies = require('./vacancies.json')
var employers = require('./employers.json')
var vacancies_new = require('./vacancies-new.json')
var providers = require('./providers.json')
var providers_full = require('./providers_full.json')
var profanities = require('./profanities.json')
module.exports = {

  // Insert values here
  // Set defaults if any session data is not set
  "user" :                    "employer",
  "today":                    moment().format('Do MMM YYYY'),
  "last7days":                moment().subtract(7,'d').format('Do MMM YYYY'),
  "force_notifcation_setup":  "yes",
  "has_notifications" :       "no",
  "notifications" :           [],
  "emailFrequency" :          [],
  "has_saved_training" :      "no", //for new favourite journey
  "has_selected_provider":    "no", //for employer to select training provider
  "employer_set" :            "no",
  "redirect" :                "dashboard-multiple",
  "orgName" :                 "ABC opticians",
  "providerName":             "PLUMPTON COLLEGE",
  "training_level":           "Business and Administration, Level: 3",
  "hasTradingName" :          "no",
  "numberOfPositions":        1,
  "NumberOfEntities" :        5,
  "employerAmount" :          8,
  "savedAddressCount":        1,
  "journey":                  "existing",
  "weeklyHours":              37,
  "workingDays":              291,
  "nationalMinWage":          3.90,
  "employerAdress1" :         "Cheylesmore House, 5 Quinton Rd, Coventry CV1 2WT",
  "employerAdress2" :         "Earlsdon Park, 53-55 Butts Road, Coventry CV1 3BH",
  "providerName" :            "Lifetime Training",
  "locations" :               locations,
  "vacanciesPerPage" :        25,
  "page" :                    1,
  "errorType" :               [],
  "dashboard" :               "dashboard1",
  "training"  :               training,
  "training_full":            training_full,
  "vacancies" :               vacancies,
  "employers" :               employers,
  "vacancies_new":            vacancies_new,
  "Website" :                 "http://www.example.com/",
  "providers" :               providers,
  "providers_full":           providers_full,
  "profanities":              profanities,
  "EmployerDescription":      "Founded in 2005, we have a long history of helping businesses become more efficient, saving time and money, and ultimately opening the door to greater productivity. Our process and products have evolved over our 13-year journey, but our mission has remained the same.",
  "dates":                    ['1 Mar 2019','23 Apr 2019','30 Apr 2019','9 May 2019','16 May 2019','24 Jun 2019','11 Jul 2019','12 Jul 2019','28 Aug 2019','13 Nov 2019'],
  // Redirects
  "commitment_redirect" :     "https://esfa-create-apprenticeship.herokuapp.com/reserve/sprint-10/research/employer/add--apprentice-details",
  "default_qualifications":   [ { 'ID': '0',
    'type': 'GCSE or equivalent',
    'subject': 'English ',
    'grade': '9-4',
    'weight': 'Essential' },
  { 'ID': 1,
    'type': 'GCSE or equivalent',
    'subject': 'Maths ',
    'grade': '9-4',
    'weight': 'Essential' } ],
    "bannedPhrases" : [
       "driving licence",
       "permanent",
       "under 16",
       "under sixteen",
       "car",
       "drive",
       "unpaid",
       "young people",
       "young person",
       "male",
       "female",
       "man",
       "woman",
       "lady",
       "hand",
       "eye",
       "foot",
       "kick",
       "run",
       "stand",
       "physically strong",
       "physically active",
       "young",
       "mature",
       "fingers",
       "head",
       "jump",
       "school",
       "schools"
   ]
  }
