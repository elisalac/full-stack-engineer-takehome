# Overview

In this app, you will be able to create a user and log in. Once logged in, you can manage documents (create, edit, delete). When changing the title of a document, you do not need to press the save button, as it saves automatically. However, if you edit the content of the document, you will need to press the save button.

# Setup Instructions

## Installation 

- You need to run **npm i** in the root of the project and also at **/src/client**.
- PHP must be installed on your machine.

## Starting the Servers

1. First, run the following command:  
   `C:\php\php.exe -S localhost:3000`
   (Path for php.exe might differ depending on where PHP was installed)
   
2. In another terminal, run:  
   `npm start`  
   Answer **y** when asked: *Would you like to run the app on another port instead?*

3. In a third terminal, run:  
   `npx nodemon`  
   Answer **y** when asked again: *Would you like to run the app on another port instead?*

# Technology Stack

**Backend:**
- Language: PHP, Node.js
- Framework: Express

**Frontend:**
- Languages: React, TypeScript
- Libraries & Tools:
    - UI & Styling: Material UI, React Icons
    - State Management: Redux, React-Redux
    - Text Editors: Quill.js
    - Utilities: Lodash
    - Sockets: Socket.io
    - React Tools: React-dom, React-router-dom, React-scripts

**Development Tools:**
- Node.js Tools: Nodemon

# Features Implemented

**User Authentication**
- Login and logout functionality with validation during login.
- User registration and account creation.

**Document Management**
- Create new documents with unique IDs and custom names.
- Edit documents with rich text formatting (using Quill.js).
- Save and retrieve document content from the backend server.

**State Management**
- Efficient state management using Redux to handle user data, documents, and session states.

# Future Improvements

- Unique document management per user.
- Adding unit tests for the backend and E2E tests for the frontend.
- Adding a page to edit the user profile.
- Modifying the sidebar to allow it to collapse and resize.

# Faced Challenges

During this project, I faced multiple challenges, such as:
- Starting the frontend project.
- Relearning how to code in PHP.
- Connecting the frontend and backend.
- Data not refreshing correctly, requiring a forced page reload.