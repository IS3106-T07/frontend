##Project Structure

src/
├── App
│   ├── App.jsx
│   └── index.js
├── HomePage
│   ├── HomePage.jsx
│   └── index.js
├── LoginPage
│   ├── LoginPage.jsx
│   └── index.js
├── RegisterPage
│   ├── RegisterPage.jsx
│   └── index.js
├── _actions
│   ├── alert.actions.js
│   ├── index.js
│   └── user.actions.js
├── _components
│   ├── PrivateRoute.jsx
│   └── index.js
├── _constants
│   ├── alert.constants.js
│   ├── index.js
│   └── user.constants.js
├── _helpers
│   ├── auth-header.js
│   ├── fake-backend.js
│   ├── history.js
│   ├── index.js
│   └── store.js
├── _reducers
│   ├── alert.reducer.js
│   ├── authentication.reducer.js
│   ├── index.js
│   ├── registration.reducer.js
│   └── users.reducer.js
├── _services
│   ├── index.js
│   └── user.service.js
├── index.html
└── index.jsx

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Directory
    .
    ├── create-react-app        # For installing dependencies, you can delete after install
    └── frontend                # Actual development environment
         ├── other files...     # Stores App.js, components/, etc..
         └── (to be updated)

### Install Create-React-App (only for dependencies)
Link: https://github.com/IS3106-T07/create-react-app  

    git clone https://github.com/IS3106-T07/create-react-app  
    cd create-react-app  
    npm install  

### Install Frontend
Link: Current Page

    cd ..
    git clone https://github.com/IS3106-T07/frontend
    cd frontend
    npm install

### Testing
    npm test

### Run
    npm start

Running at http://localhost:3003 (and at specified IP network address, e.g. 192.168.1.40:3003)

# FAQ
> Frequently asked questions.

### Q. I'm stuck at registry config, on install. How to proceed?
Set config manually.

    npm config set registry="http://registry.npmjs.org"

### Q. Where is the PWA Setup Guide?
See MANUAL.md.