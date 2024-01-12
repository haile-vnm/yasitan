# YASITAN - Your GPT Assistant Application

Welcome to **YASITAN**, a GPT Assistant application where users can ask about anything in the world.

Check out our [Demo](https://youtu.be/IlPzuUBEqHs).

## Solutions
### System Overview

![Overview Diagram](assets/diagrams/overview.png)
*System Overview Diagram*

This application is designed using a microservices architecture and consists of the following services:

- **Webapp Service**: This is where users interact with our application.
- **API Service**: Responsible for authentication and management of conversations and message logic.
- **MongoDB**: The database used to store all data in our application.

### Database

![Database Diagram](assets/diagrams/database.png)
*Database Diagram*

The database consists of the following collections:

- **Users Collection**: Stores all user information.
- **LocalUsers Collection**: Stores user credential information separately from the main Users Collection.
- **Conversations Collection**: Stores conversation data.
- **Messages Collection**: Stores message data. The `metadata` field contains additional data for the message, such as the `secondaryId` used to link interactions between the Frontend and Backend, as shown in the flow chart below.

### Authentication & User Diagrams

![Register New Account](assets/diagrams/features/sign-up.png)
*Register New Account*
<br>
<br>

![Sign In](assets/diagrams/features/sign-in.png)
*Sign In*
<br>
<br>

![Revisit App](assets/diagrams/features/revisit-app.png)
*Revisit App*
<br>
<br>

### Chat with GPT chatbot Diagrams

![Chat with GPT chatbot](assets/diagrams/features/chat.png)
*Chat with GPT chatbot*
<br>
<br>

**Block Explanation:**
- **Update message by secondary_id:** We will base on this id for matching the message that is just sending right before. That's used to avoid duplicating when receiving message from websocket via Socket.io

## Installation

### 1️⃣ Clone the devenv repository

```shell
git clone git@github.com:haile-yasitan/devenv.git yasitan
```

### 2️⃣ Download all related repositories

Navigate to the `yasitan` folder created by the previous command.

```shell
cd yasitan
```

Load all sub-repositories inside the `yasitan` repository using the following commands:

```shell
git submodule init
git submodule update
```

All the required service code will be downloaded to the `yasitan` folder.

### 3️⃣ Set up Environment

- Create a `.env` file from `.env.example`.
- Modify the values in the `.env` file according to your preferences (not recommended, as values are set for test running).

### 4️⃣ Build and run Docker containers

```shell
docker compose up -d
```

Running this command starts all required services.

## Test the app 🚀

After successfully building the mentioned services, you can access the following endpoints:

- Webapp Endpoint: [http://localhost:3000](http://localhost:3000)
- API Endpoint: [http://localhost:3100](http://localhost:3100)

### Import Endpoints

Use the Thunder Client VS extension to import the following files:

- Endpoints file: `./thunder-requests_yasitan.json`
- Environment file: `./thunder-environment_yasitan-dev.json`

Enjoy every moment! 💃🕺

Thank you! 🥳🥳🥳
