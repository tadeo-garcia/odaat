# Flask React Project

This is the backend for the Flask React project.

## Getting started

1. Clone this repository
2. Create a **.env** file based on the example with proper settings for your development environment
3. Follow instructions in the [`backend/README.md`](./backend/README.md) to setup your development Back-End.
4. Follow instructions in the [`client/README.md`](./client/README.md) to set up your development Front-End.

## Deploy to Heroku

1. Create a new project
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run `$ heroku login`
5. Login to the heroku container registry `$ heroku container:login`
6. CD into `backend` and push your backend docker container to heroku (this will build the Flask dockerfile, and push) `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
7. CD into `client` and push your backend docker container to heroku (this will build the Flask dockerfile, and push) `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
8. Release your docker container to heroku `$ heroku container:release web -a {NAME_OF_HEROKU_APP}`
9. set up your database:

```bash
    $ heroku run -a {NAME_OF_HEROKU_APP} python -m database
```

10. profit

# Flask React Project

## Getting started

1. Clone this repository
2. Create a **.env** file based on the example with proper settings for your development environment
3. Follow instructions in the [`starter_app/README.md`](./starter_app/README.md) to setup your development Back-End.
4. Follow instructions in the [`client/README.md`](./client/README.md) to set up your development Front-End.

## Deploying to Heroku

### Prepping Your Heroku Project

5. Create a new project on your Heroku Dashboard.
6. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".
7. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) if you haven't already.
8. Add any Config Vars to your heroku app, either on the Heroku CLI, or on the heroku-app dashboard's Settings tab.

### Prepping Your React App:

9. Move .env.local to desktop
10. Run `npm run build` in your React app root folder.

- This will build the static files for your React app.
- The `postbuild` script from your `package.json` will _automatically_ move them into the `/static` directory in your flask files.

11. Move .env.local back to react app

### Prepping your Flask App:

12. Enter your pipenv: `pipenv shell`
13. Update your requirements.txt with all of the packages installed in the environemt: `pip freeze > requirements.txt`

### Pushing your container

14. Login to heroku: `$ heroku login`
15. Login to the heroku container registry: `$ heroku container:login`
16. CD into `starter_app` and push your `Dockerfile` to heroku (this will build the Flask Dockerfile, and push): `$ heroku container:push web -a {NAME_OF_HEROKU_APP}`
17. Release your docker container to heroku: `$ heroku container:release web -a {NAME_OF_HEROKU_APP}`
18. Set up your database: `heroku run -a {NAME_OF_HEROKU_APP} python -m database {your_migration_script_here}`
19. Profit.
