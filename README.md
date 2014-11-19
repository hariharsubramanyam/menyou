Menyou
======

# Authors

Ryan Chipman, Danielle Man, Harihar Subramanyam, Tawanda Zimuto

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

# Limitations of the MVP

Keep in mind that this is an MVP, so some features are missing. For instance:

1. Clicking recommended dishes does nothing. In the final version, this will locate the restaurant on the map and pop up its information
2. The allergies are few in number. In the final version, we allow you to select more "forbidden foods" (and enter your own).
3. The recommendation is not stellar. In the final version, our recommendation algorithm will be more refined.
4. The restaurants on the map do not show much information when clicked. In the final version, they will show the restaurant name, address, etc.
5. There is no way to search, sort, filter, or get more recommendations. In the final version, we will support these operations.
6. There are no in-app questions to build your taste profile (see our Design Doc). In the final version, we will include questions.

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
