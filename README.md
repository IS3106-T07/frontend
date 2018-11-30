## Frontend file structure

```Javascript
/
├── src
│   ├── _actions
│   │   ├── alert.actions.js
│   │   ├── canteen.actions.js
│   │   ├── index.js
│   │   └── user.actions.js
│   ├── _api_
│   │   ├── constants.js
│   │   ├── customers.js
│   │   └── vendors.js
│   ├── _commons
│   │   │   └── css
│   │   │       └── handling.css
│   │   ├── ErrorDialog.js
│   │   ├── InvalidationDialog.js
│   │   ├── Pagination.js
│   │   ├── SuccessDialog.js
│   │   └── WarningDialog.js
│   ├── _constants
│   │   ├── alert.constants.js
│   |   ├──	canteen.constants.js
│   │   ├── index.js
│   │   └── user.constants.js
│   ├── _helpers
│   │   ├── auth-header.js
│   │   ├── authorization.js
│   │   ├── history.js
│   │   ├── index.js
│   │   └── store.js
│   ├── _reducers
│   │   ├── addItem.reducer.js
│   │   ├── alert.reducer.js
│   │   ├── authentication.reducer.js
│   │   ├── canteens.js
│   │   ├── currentPage.js
│   │   ├── currentTitle.js
│   │   ├── index.js
│   │   ├── registration.reducer.js
│   │   ├── userProfile.reducer.js
│   │   ├── users.reducer.js
│   │   └── vendorOrders.reducer.js
│   ├── _services
│   │   ├── canteen.service.js
│   │   ├── cart.service.js
│   │   ├── customer.service.js
│   │   ├── index.js
│   │   ├── store.service.js
│   │   └── user.service.js
│   ├── App
│   │   ├── App.js
│   │   └── index.js
│   ├── HomePage
│   │   │   ├─ components
│   │   │   │   ├── BottomBar.js
│   │   │   │   ├── ProfileCard.js
│   │   │   │   ├── ProfileIcon.js
│   │   │   │   ├── TopBar.js
│   │   │   │   ├── VendorBottomBar.js
│   │   │   │   ├── VendorSwitch.js
│   │   │   │   └── VendorTopBar.js
│   │   │   └── css
│   │   │       └── HomePage.css
│   │   └── index.js
│   ├── LoginPage
│   │   ├── LoginPage.js
│   │   ├── UserTypePage.js
│   │   ├── login.css
│   │   └── index.js
│   ├── ProfilePage
│   │   ├── ProfileCard.js
│   │   └── ProfilePage.js
│   ├── RegisterPage
│   │   ├── RegisterPage.js
│   │   ├── RegisterVendorPage.js
│   │   └── index.js
│   ├── StudentPages
│   │   └── ...
│   ├── VendorPages
│   │   └── ...
│   ├── index.js
│   ├── index.html
│   └── Template.js
│
├── img
│   └── ...
│
├── .eslintrc.js
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
