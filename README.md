# Chat Party

Chat Party is live chat application that allows users to create their own chat rooms and host group chats.

# Purpose
I was interested in creating an application that used some kind of socket framework. I have been reading about Socket IO and it's js library to understand how sockets work and if I could successfully implement it and send events from the front end to the back end. This was a fun journey that hit the project requirements and achieved all the stretch goals.

Note:
Socket IO USES websockets but it's not an implementation of websockets.

# Technologies Used:

CRUD(CREATE, READ, UPDATE, DELETE) using REST API, Node.js, Express, Live Chat using SocketIO, MongoDB, Mongoose, User Authentication with Express Session, Local Image Upload using Multer, HTML5, Bootstrap & JQuery.

# Features to Meet Requirements:

- Create Chat room
- View All Chat rooms
- Update Chat room
- Delete Chat room
- Create User Account
- Update User Account
- View User Account

# Stretch Goals:
- Integrate User Authentication & Authorization
- Integrate SocketIO
- Integrate Image Uploads
- Integrate Avatars and Usernames into live chat window

# Biggest Challenges
- Creating Authorization to specific to currentUser
- Creating new chat rooms with one .ejs render
- Sending avatars and usernames via sockets into chat rooms

# Workflow on Trello:
https://trello.com/invite/b/xeBeVRpr/d5075484bda28ab8f18efc44f4fa5860/sei-chat-party

# Wireframes

////// Main Index /////
![Screenshot](img/chat_party_index.png)

////// Create An Account /////
![Screenshot](img/chat_party_create_account.png)

////// Log In /////
![Screenshot](img/chat_party_login.png)

////// User Index /////
![Screenshot](img/chat_party_user_index.png)

////// View All Chat Rooms /////
![Screenshot](img/chat_party_view_all.png)

////// Chat Room /////
![Screenshot](img/chat_party_chat_index.png)

# Demo
https://chat-party.herokuapp.com
