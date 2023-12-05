# decentralized-fs

## Decentralized File Storage App POC Requirements
* Users can upload files from their device
* Files stored publicly on IPFS or Arweave
* List of all file names uploaded via app tracked server-side
* Users can view list of all previously uploaded public files
* Users can download previously uploaded public files

## Running Locally
* `yarn` - install dependencies
* `docker-compose up` - start the postgres instance
* Create a .env file with a `DATABASE_URL` and `ARWEAVE_KEY`
    * `DATABASE_URL` - if you're using the docker postgres instance you can set it to `postgresql://postgres:password@127.0.0.1:5432/postgres?schema=public`.
    * `ARWEAVE_KEY` - base64 encoded arweave jwt. In order to upload files the key needs to have funds.
* `yarn be:dev` - start the server (it will automatically run migrations on your postgres database)
* `yarn web:dev` - start the NextJS server
* Visit [http://localhost:3000](http://localhost:3000) to view the UI
