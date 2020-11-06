# Production 

In Heroku, click New / Create new app. 

Name your app. 

## Set up automatic deployment

From your Heroku dashboard, click on your app. 

Click "Deploy". 

Under "deployment method", select GitHub. 

Under "automatic deploys", enable automatic deploys from the main branch. 

## Add Datastore Add-on

From your Heroku dashboard, click on your app. 

Click "Resources". 

Click "Find more add-ons". 

Add Heroku Postgres (free hobby dev option).

![Heroku Add-on](./HerokuAddon.PNG)

## Verify Datastore

From your Heroku dashboard, click on your app. 

Click "Settings".

Click "Reveal Config Vars".

Verify you have a "DATABASE_URL" variable that starts with "postgres://..." as shown below. 

![Heroku Config Variables](./HerokuConfigVars.PNG)

