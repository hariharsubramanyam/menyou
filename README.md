Menyou
======
Ryan Chipman, Danielle Man, Harihar Subramanyam, Tawanda Zimuto
**NOTE: If you are looking for the reflection, you can find it in [`doc/Reflection.pdf`](https://github.com/6170-fa14/hsubrama_rchipman_daniman_tzimuto1_finalProj/blob/master/doc/Reflection.pdf?raw=true)


# Overview

A menu for you.

Menyou is an app that lets you build a profile reflecting your unique taste in food. Then, it will recommend dishes from nearby restaurants with foods that fit your tastes.

# Usage

The app can be accessed at [104.236.61.65:8080](http://104.236.61.65:8080).

To run locally, please do the following:

1. (in separate terminal) `sudo mongod`
1. Clone the repo
2. `npm install`
3. `gulp` (if you don't have `gulp`, run `sudo npm install -g gulp`)
4. Navigate to [localhost:8080](http://localhost:8080)

This will bring you the **main page**. Register for an account. Then, build your taste profile (i.e. the ingredients you like, the ingredients you dislike, and any allergies). When you're done, click the button to get recommended dishes. This may take some time, as the menu API (Locu) that we use is quite slow (they give you better speed if you pay for API access - we are using the free plan).

# Tests

We do **server** side testing with [mocha](http://mochajs.org/). To run the server tests, do this:

1. Install mocha (`sudo npm install -g mocha`)
2. Navigate to `server/app`
3. Run `mocha`

We do **client** side testing with [qunit](http://qunitjs.com/). To run the client tets, do this:

1. Open `client/source/assets/js/tests.js`
2. Set `Menyou.shouldTest = true` in the first line. 
3. Launch the app (see the **Usage** section of this README)
4. Now instead of displaying the app, the client side tests are run and the results are displayed.

# Security

See the [`security_notes.txt`](https://github.com/6170-fa14/hsubrama_rchipman_daniman_tzimuto1_finalProj/blob/master/security_notes.txt).

# API Documentation

The API documentation is accessed at the following link:

https://docs.google.com/document/d/1DDVklyfrSfcfKjzs5Morc1ZGB5zDgEWIZnuiFBhSTxg/edit

##Directory Structure

The meat of the app is divided into two parts, the client and the server, each in the correspondingly named folders.

## Server

- **app/** - The key server-side code
  - **config/** - Configurations for the server, db, etc.
  - **controllers/** - Controllers for the routes
  - **helpers/** - Helpers for complex logic (ex. recommendation)
  - **models/** - Database models
  - **test/** - Mocha tests
  - **app.js** - Main file for express app

- **bin/** - Scripts/executables that may need to be run externally
  - **www** - Node code for starting the server. 'node server/bin/www' will start the server

## Client

- **build/** - Compiled styles, templates, and scripts (will be created after running `gulp`)
- **source/** - Source code
  - **assets/** - JavaScript, styles, and additional useful data
    - **js/** - JavaScript
      - **controllers/** - Logic for each page
      - **helpers/** - Helpers for complex logic (ex. interacting with API)
      - **vendor/** - 3rd party libraries
    - **style/** - CSS styles
    - **txt/** - Useful text files
  - **index.html/** - Entry point for the SPA
  - **templates/** - Handlebars templates

## Documentation

Documentation can be found in the **/doc/** directory.

- **meetings/** - the folder containing project meetings.
- **DesignDoc.pdf** - the design document of the application.
- **MenyouPitch.pdf** - the document used to pitch the application.
- **TeamContract.pdf** - the document detailing the contract agreed by the team.
- **TeamworkPlan.pdf** - the document detailing the teamwork plan.
