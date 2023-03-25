# Notepad
This project is based on REST API endpoints for creating, editing, and deleting notes. It uses HTTP requests to communicate between the client-side and server-side, allowing users to interact with the application in a seamless and efficient manner. The application also includes user authentication, which means users can create their own accounts and securely access their notes.

## Setup

- Clone this repo
- Open the file and start:

  ```bash
  cd notepad
  ```
  First install all npm package in server folder and run it: 
  ```bash
  cd server
  npm install
  npm run server
  ```
  Second install all npm package in client folder and run it:
  ```bash
  cd client
  npm install
  npm run client
  ```
  
- Create ```.env``` file with the following variables:
  ```
    PORT
    MONGODB_URI
    SESSION_SECRET
  ```

## File Structure

```
notepad
 ┣ client
 ┃   ┣ node_modules
 ┃   ┃  ┗ ...
 ┃   ┣ public
 ┃   ┃  ┣ index.html
 ┃   ┃  ┗ ...
 ┃   ┣ .gitignore
 ┃   ┣ package.json
 ┃   ┣ tsconfig.json
 ┃   ┗ src
 ┃      ┣ App.tsx
 ┃      ┣ index.tsx
 ┃      ┣ utils
 ┃      ┃     ┗ formatDate.ts
 ┃      ┣ components
 ┃      ┃     ┣ forms
 ┃      ┃     ┃   ┗ TextInputField.tsx
 ┃      ┃     ┣ NavBar.tsx
 ┃      ┃     ┣ SignUpModal.tsx
 ┃      ┃     ┣ LogInModal.tsx
 ┃      ┃     ┣ NavBarLoggedInView.tsx
 ┃      ┃     ┣ NavBarLoggedOutView.tsx
 ┃      ┃     ┣ Note.tsx
 ┃      ┃     ┣ AddEditNoteDialog.tsx
 ┃      ┃     ┣ NotesPageLoggedInView.tsx
 ┃      ┃     ┗ NotesPageLoggedOutView.tsx
 ┃      ┣ pages
 ┃      ┃     ┣ NotesPage.tsx
 ┃      ┃     ┗ NotFoundPage.tsx
 ┃      ┣ network
 ┃      ┃     ┣ utils
 ┃      ┃     ┃   ┗ fetchData.ts
 ┃      ┃     ┣ note_API.ts
 ┃      ┃     ┗ user_API.ts
 ┃      ┣ models
 ┃      ┃     ┣ note.ts
 ┃      ┃     ┗ user.ts
 ┃      ┣ errors
 ┃      ┃     ┗ http_errors.ts
 ┃      ┣ styles
 ┃      ┃     ┣ global.css
 ┃      ┃     ┣ App.module.css
 ┃      ┃     ┣ NotesPage.module.css
 ┃      ┃     ┣ Note.module.css
 ┃      ┃     ┗ utils.module.css
 ┣ server
 ┃   ┣ node_modules
 ┃   ┃  ┗ ...
 ┃   ┣ @types
 ┃   ┃  ┗ session.d.ts
 ┃   ┣ controllers
 ┃   ┃     ┣ notes.ts
 ┃   ┃     ┗ users.ts
 ┃   ┣ models
 ┃   ┃     ┣ notes.ts
 ┃   ┃     ┗ users.ts
 ┃   ┣ routes
 ┃   ┃     ┣ notes.ts
 ┃   ┃     ┗ users.ts
 ┃   ┣ middleware
 ┃   ┃     ┗ auth.ts
 ┃   ┣ utils
 ┃   ┃     ┣ assertIsDefined.ts
 ┃   ┃     ┗ validateEnv.ts
 ┃   ┣ app.ts
 ┃   ┣ server.ts
 ┃   ┣ .env
 ┃   ┣ .eslintrc.js
 ┃   ┣ .gitignore
 ┃   ┣ package.json
 ┃   ┗ tsconfig.json
 ┣ .gitignore
 ┗ README.md
 ```

## NPM Packages


### Client
- Performant, flexible and extensible forms library for React Hooks - [react-hook-form](https://www.npmjs.com/package/react-hook-form)@7.43.5
- React typeahead with Bootstrap styling - [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)@2.7.2
- Declarative routing for React web applications - [react-router-dom](https://github.com/remix-run/react-router)@6.9.0

### Server
- Optimized bcrypt in plain JavaScript with zero dependencies - [bcrypt](https://www.npmjs.com/package/bcrypt)@5.1.0
- TypeScript execution environment and REPL for node.js, with source map support - [ts-node](https://www.npmjs.com/package/ts-node)@10.9.1
- Validation for your environment variables - [envalid](https://www.npmjs.com/package/ts-node)@7.3.1
- Simple session middleware for Express - [express-session](https://www.npmjs.com/package/express-session)@1.17.3
- Create HTTP error objects - [http-errors](https://www.npmjs.com/package/http-errors)@2.0.0

## Stack 

- Frontend: React / TypeScript
- Backend: Express / Node
- Database: MongoDB 

## 
Now you have it&nbsp;&nbsp;&nbsp;🎉 <br>
Thank you for reading and happy coding &nbsp;💚
