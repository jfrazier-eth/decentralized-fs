# decentralized-fs

## Decentralized File Storage App POC Requirements
* Users can upload files from their device
* Files stored publicly on IPFS or Arweave
* List of all file names uploaded via app tracked server-side
* Users can view list of all previously uploaded public files
* Users can download previously uploaded public files

### Implementation
The user uploads a file in the UI. The uploaded file is then sent to the server that pays for the transaction and uploads the file to the arweave network. The server stores the transaction id, name of the file, and user that uploaded the file so that the user can view a list of files they have uploaded and download their files from the arweave network.

## Running Locally
* `yarn` - install dependencies
* `docker-compose up` - start the postgres instance
* Create a .env file with a `DATABASE_URL` and `ARWEAVE_KEY`
    * `DATABASE_URL` - if you're using the docker postgres instance you can set it to `postgresql://postgres:password@127.0.0.1:5432/postgres?schema=public`.
    * `ARWEAVE_KEY` - base64 encoded arweave jwt. In order to upload files the key needs to have funds.
* `yarn be:dev` - start the server (it will automatically run migrations on your postgres database)
* `yarn web:dev` - start the NextJS server
* Visit [http://localhost:3000](http://localhost:3000) to view the UI
