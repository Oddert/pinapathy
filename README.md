# PinApathy

A Pinterest clone created for the FreeCodeCamp challenge. Allows authenticated users to collate links and images on boards and repost, comment, and like other's posts. Displays content in a masonry style layout/

Front end built with React, backend built with express, MongoDB / Mongoose for storage, passport JS for local authentication, Oath for 3rd party auth.

## Installation
You will need to setup a mongodb server and connect it via an .env file
```
$ git clone https://github.com/Oddert/pinapathy.git
$ cd pinapathy/client
$ npm i
$ cd ..
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm run build
$ npm start
```

<!-- ## Live Demo -->
<!-- [https://oddert-chess-game-1.glitch.me/](https://oddert-chess-game-1.glitch.me/) -->

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| client-install | cd client && npm install | runs the install script on the client dev environment |
| start  | node app.js                                    | runs the server                                |
| server | nodemon app.js                                 | runs the server with auto restart              |
| client | cd client && npm start                         | starts the development server for the client   |
| dev    | concurrently "npm run server" "npm run client" | run both the client and server for development |
| build    | rm -rf production_build && cd client && npm run build && npm run production | create a production build for the client |