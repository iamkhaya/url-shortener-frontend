# url shortener frontend

## Run the service locally
The frontend will be served on port 3006

```bash
cd url-shortener-frontend
npm start
```


## Deployment

For container orchestration, we use [docker-compose](https://docs.docker.com/compose/install/).

run the following command in your favorite terminal

```bash
docker-compose build
docker-compose up
```

This frontend should be run with the corresponding backend, so be sure to start the backend as well.

** Notes **
Ideally, the frontend and backend can be combined in the same docker-compose file, but I avoided that
because it would require hosting the images somewhere.

## Bugs
* I would like to serve the application on the "/" path, but had trouble doing so (not sure whats breaking as yet), so currently, you start interacting with application on "/shorten"
* This is not thoroughly tested. Only the "happy path". If required I can take a look into proper error handling.
