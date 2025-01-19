# Structure

- We are setting the barebones for the socket server for you and the structure looks like this:

  - **index.ts** is what initialize the project; It contains the instantiation of the http server as well as the call for the socket server instantiation;
  - **SocketServer.ts** is what instantiate the socket server and set one listener for whenever a connection starts; We are setting it up using socket.io(https://socket.io/docs/v4/);
  - **tests** you can keep your tests in here;
  - **src** you can keep your source code files in here.
---
**Feel free to change whatever you see fit** in the project, the structure and the way the code were written are not set on stone and were just added to help lead you straight on solving the challenge.

# Instructions

***Objective:***
Build a simplified real-time collaborative note-taking application that allows multiple users to edit a note simultaneously with live updates.

***Expect development time:***  2 hours

**Project Description:**

Create a web application where users can:

- Create an Edit Notes:

  - Utilize a WYSIWYG editor to format text (e.g., bold, italic, underline).

  - Implement live preview of the formatted text.

- Real-Time Collaboration

  - Use WebSockets to handle live updates and data synchronization.

- Basic Backend Integration:

  - Implement basic user authentication to manage different user sessions.

**Technical Requirements:**
- Frontend:

  - Framework: React with TypeScript

  - Suggested WYSIWYG Editor packages 
    - CKEditor5
    - Froala
    - TipTap
    - QuillJS
    - or your own choice.

  - State management other than local states

  - Real-Time Updates: Integrate WebSocket
    
  - Bonus: Create a modal to appear when the WebSocket connection is disconnected.

- Backend:

  - Language: Node.js with Express or PHP (based on your stack)

  - Real-Time Communication: Set up WebSocket server to broadcast updates to connected clients

- Database:

  - Use an in-memory data store (like a simple JavaScript object) for simplicity, given the time constraint.

**Submission Guidelines:**
- Repository:

  - Create a public GitHub repository containing your code.

  - Ensure clear commit messages and a logical commit history.

- README File:

  - Project Overview: Brief description of the project.

  - Setup Instructions: Step-by-step guide to run the application locally.

  - Technology Stack: List the technologies and libraries used.

  - Features Implemented: Highlight the key features you’ve built.

  - Future Improvements: Mention any additional features or improvements you would implement given more time.

- Running the Project:

  - Provide clear instructions to install dependencies and start both frontend and backend servers.

  - Ensure that the application runs without issues.
