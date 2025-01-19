# Text Summarizer Project

Generate Text summaries from pdf and image files.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Local MongoDB or [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)

## Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/SouravRana007/textSummarizer.git

```

### Step 2: Install Dependencies for client and server folder

```bash
# In project root folder, run below commands
cd client
npm install

cd ..

cd server
npm install

```

### Step 3: Prepare .env file for nodejs server app

Create .env file from example env and fill the values.

Note: If you change the PORT_NUMBER in .env, then change client vite.config.js to point to correct server app url.

```bash
# In folder textSummarizer/server, run below command
cp .env.example .env

```

### Step 4: For run in dev mode

use command `npm run dev` in both client and server directory.

## To Run Build

### Step 1: Build client files

use command `npm run build` in both client which will generate directory named `dist` containing index.html and other css, js files.

### Step 2: Copy dist directory to server folder

Run command `npm start` in server.

Also you can use `pm2` npm package in case you want automatic restarts of nodejs app.
