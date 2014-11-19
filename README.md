Menyou
======

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

# Authors

Ryan Chipman, Danielle Man, Harihar Subramanyam, Tawanda Zimuto

# API Documentation

The API documentation is accessed at the following link:

https://docs.google.com/document/d/1DDVklyfrSfcfKjzs5Morc1ZGB5zDgEWIZnuiFBhSTxg/edit

##Directory Structure

The meat of the app is divided into two parts, the client and the server, each in the correspondingly named folders.

## Server

- **app/** - the folder containing the key server-side code
  - **config/** - the folder containing configurations for the server, db, etc.
  - **controllers/** - the folder containing the controllers
  - **helpers/** - the folder containing the helpers
  - **models/** - the folder containing the models
  - **test/** - the folder containing all tests for the server/API
  - **app.js** - the main file for the express app

- **bin/** - the folder for scripts/executables that may need to be run externally
  - **www** - node code for starting the server. 'node server/bin/www' will start the server

## Client

- **app/** - the folder containing the angular app's key components
  - **/shared** - the folder containing directives that will be reused throughout the app
  - **components/** - the folder containing the sections of the angular app, each section with its own views, controllers, and services. each component is like a little mini angular app in and of itself.
  - **app.module.js** - file handling the setup of the app, loading Angular dependencies, etc.
  - **app.routes.js** - file handling angular routes & route configurations
- **assets/** - folder containing all static assets used for front-end purposes
  - **js/** - folder containing javascript files not related to Angular code. This could be transitions, animations, etc.
  - **style/** - folder containing stylesheets
    - **stylus/** - folder containing the stylus sheets
      - **style.styl** - the main stylus file that will be compiled into css. Any other stylus files written outside of here should be imported into this.
    - **css/** - folder containing the css compiled from the stylus sheets
      - **style.css** - the compiled css version of style.styl
  - **img/** - folder containing images & other graphics
- **index.html** - the main file that gets rendered to display the angular app. primarily just loads in all the other angular elements that make up the app.

## Documentation

Documentation can be found in the **/doc/** directory.

- **meetings/** - the folder containing project meetings.
- **DesignDoc.pdf** - the design document of the application.
- **MenyouPitch.pdf** - the document used to pitch the application.
- **TeamContract.pdf** - the document detailing the contract agreed by the team.
- **TeamworkPlan.pdf** - the document detailing the teamwork plan.
