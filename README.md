## Project Files 
This is our basic file structure, including `build/`, `public/` and `src/`. 
```
/   
├── build
│   └── ...generated static resources: css, js, media
│
├── public
│   └── ...favicon.ico, index.html, manifest.json
│
├── src
│   └── ...development files
│
├── .gitignore
├── package.json (dependencies, scripts, configuration)
└── README.md
```
## Development
For development, `src/` contains the main assets. There are `components/`, `resources/`, redux-based `actions/`, `constants/`, `reducers/` and `services/`.

**Note**: each folder contains a file called `index.js`. This helps to shorten import statements, and the decision to include these is for convenience.

```
/ ...
└── src
    ├── actions
    │   ├── ...actions.js
    │   └── index.js
    ├── components
    │   ├── css
    │   │   └── ...example.module.css
    │   ├── App.js
    │   ├── PrivateRoute.js
    │   └── ...PageComponents.js
    ├── constants
    │   ├── ...constants.js
    │   └── index.js
    ├── reducers
    │   ├── ...reducer.js
    │   └── index.js
    ├── resources
    │   └── (images)
    ├── services
    │   ├── ...service.js
    │   └── index.js
    └ ...
```

And `helpers/`, `index.html` and `index.js`. 
```
    ...
    ├── helpers
    │   ├── auth-header.js
    │   ├── fake-backend.js
    │   ├── history.js
    │   ├── index.js
    │   ├── serviceWorker.js
    │   └── store.js
    ├── index.html
    └── index.js
```

## Using this project
The development server runs on `PORT 8000`.  See *scripts* in `package.json` to change.  
Configure *apiUrl* at `src/index.js`. Default value: http://localhost:3000.  

**Note**: `HTTPS` is required for service workers.  
  
Run in **development**
```
npm install 
npm start
HTTPS=true npm start                    // Linux, macOS (bash)
set HTTPS=true&&npm start               // Windows (cmd.exe)
($env:HTTPS = $true) -and (npm start)   // Windows (powershell)
```
Run in **production**
```
npm install
npm run build
serve -s build
```
Run **tests**
```
npm build
npm run test
```

## Creating a component
```
// todo Guide
```

This brings us to the end of project-specific documentation.