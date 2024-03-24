# Book Archive

## Description:
### What this webapp does:
A lightweight display for a book archive setup using Vite and styled with Tailwind. Utilizes MongoDB, Express along with Axios, React and NodeJS. Can create, edit and delete entries to a mongoDB database. Elements from the database can be displayed in a table or card style. Could be scaled into a store, for instance, or modified to document something besides books.

## -*A note about config.js*-
The config.js was not included, and must be created in the backend folder. It needs to export the variables 'PORT' and 'mongoDBURL' which correspond to the port used by the backend and the mongoDB connection.

Ex:
export const PORT = ####
export const mongoDBURL = url

### Backend:
Uses express, mongoose and cors to set up routes to the mongoDB database.

The routes are contained in single file in their own folder.

### Frontend:
The components folder has the logic for displaying the information from the database as either a series of cards or a table.
Additionally contains the logic for a back button and spinner.

For the pages folder, it contains the React logic for rendering how to create, edit, delete and display the books from the database, including storing feedback for completed actions upon being redirected to the homepage.

The App itself leverages Routes from the React-Router to neatly set up navigation.