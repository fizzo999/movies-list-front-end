# App Name: VideoFavoritesList-frontend

**Author**: Fizzo Pannosch
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)
**Deployed Site: https://favorite-movie-list.netlify.app/**

## Overview

Built with React/MERN - allows user to search movies and create a favorites list - remove from favorites list as well as add and update comments.

## Getting Started

<!-- Note: You will need an API key for the .env file from the TmDB API for your backend server.
<code><https://www.themoviedb.org/documentation/api></code>. -->

At this GitHub location <code><https://github.com/CoderMichelle/VideoFavoritesList-frontend></code> - click on the green Code button and chose the SSH tab (hopefully by now you have SSH setup on your GitHub account). Click on the copy button to the right and then go to your terminal on your local machine and type

```bash
$ git clone git@github.com:fizzo999/movies-list-front-end.git

$ cd movies-list-front-end

movies-list-front-end$ npm i

movies-list-front-end$ code .
```

Before you can start this react app, though, you will have to go to auth0, sign up (might have to verify your email address). Now login to auth0. Go to Applications on the left menu bar. Click on + Create Application (the blue button). Now chose SPA (single page app) and click create. Remember we are building this out for our SPA - React app. Click the settings tab. Now under Basic Information (the first card on the top) you want to copy paste the Domain and the Client ID variables into your .env file. Remember there is already a starter-kit sample.env file that will make it easier because it follows the rules of react-.env (like every variable has to start with REACT_APP_blahblahblah). Here you will also find that the REACT_APP_BACKEND_SERVER is already defined (kind of neat, right? All the work of deploying the server to Heroku and integrating it with a deployed MongoDB-Atlas database has already been done).

Now we are ready to start our front-end React App:

```bash
movies-list-front-end$ npm run start
```

## Architecture

First step when starting this app invites the user to authenticate their session with the leading third party authentication app - auth0. As it receives the token from auth0 it then stores that token and sets the user (user.name) into state to be added when adding movies to the db. This React app then reaches out via Axios to its own backend server. As mentioned above, this server is already deployed to Heroku and is connected to an online Atlas - MongoDB.
This server then reaches out to the tmDB (theMovieDataBase) API.

This app uses React on the frontend, with Bootstrap for styling and Axios for communicating with it's own backend server. After it receives the results from the user's query it displays these results using the movie poster from tmDB and a short description. It then allows the user to add their favorite movies to their own personal saved list. This selection gets communicated to its own backend server, which uses the information to save the new/updated list in CRUD modality to a database (create, read, update, delete). This database first used MongoDB locally and was later updated by using a deployed version using Atlas. This frontend app is also deployed on Netlify.

## Change Log

02-19-2023 reconnect Heroku on eco paid account - check and change Heroku variables for backend server and connect mongoDB for backend server on Heroku. change pictures over to Fizzo, file names, CSS, center image, manually test locally running react app connected to online heroku/mongoDB.

02-28-2022 5:59pm Update readme file - fix small errors like duplicate sample.env.

02-28-2022 4:59am Deploy to Heroku, deploy and setup DB to Atlas-MongoDB, deploy to Netlify, getting the variables right, adding CORS protocol to the server.

02-25-2022 4:59pm React frontend - keeping CRUD actions inside of StoredMovies component, fine tuning modals, stretch to the finish line.

02-24-2022 4:59pm React frontend - changing over from too many lines of code inside of App to componentizing it more - mindful of dataflow and props/state.

02-23-2022 4:59pm React frontend - test API button using auth0.

02-18-2022 4:59pm Server modularized and auth0 route protection fully implemented on localhost.

02-15-2022 4:59pm Server build out - CRUD routes.

02-14-2022 4:59pm Really proud of this one - allowing user to change comments by DOM manipulation. click on the field and it turns the button to a different class so it starts keyanimation for stark contrast visibility (you need to click to save your changes) - short lived though - had to totally re engineer this from the ground up using a modal for updating the data of each movie.

02-10-2022 4:59pm Implementing cards to show API results.

02-09-2022 4:59pm Axios call frontend to server to tmDB API. req, res, auth0.

02-08-2022 4:59pm Continue with own React solution. Scaffold and proof of life with frontend and backend.

02-07-2022 4:59pm Start with React app - create-react app not working, reinstall node.js.

02-05-2022 4:59pm Setting up GitHub repositories, cloning them to my local working environment, creating SSH Keys, setting up README file.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

Big shout out to Stackoverflow, W3 schools, Code Fellows (class material from my 301 I went over again), Google, the inspect tool in the browser.
