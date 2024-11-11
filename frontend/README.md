## What this project is about?

This project is about a chat bot that gives pre-defined responses to users.

We have 2 components, chat window which displays the chat history, and chat input which lets the users type a message and send it to the backend.

Some things i have kept in mind while developing were testing, usability, and accessibility :)

Testing - Created unit tests for components
Usability - Kept simple and intuitive design
Accessibility - Used semantic HTML and correct ARIA tags.

## How to run the project

Before you can run this project, you need the following:

1. `npm install`, this will install all the packages required to run the app.
2. Create an `.env` file with `REACT_APP_BASE_API_URL="https://collective-case-study-be.vercel.app/api"` var to connect to the backend.

Now you are ready to run the project locally.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## How to run tests

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
