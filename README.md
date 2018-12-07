# Event Manager - RESTful API

This is an express-based REST API containing routes and different endpoints such as CRUD.
* Uses Oauth 2.0 using google strat and passportJs for authentication and authorization. Data is stored on mlab's MongoDb cloud hosting.

# Live Project 

http://eventmanager-web.herokuapp.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* You need to setup mlab database.
* Register your app to google's API developer console
* Environment variables [mentioned below in snippet]
```
MONGO_USER_ID
MONGO_USER_PW
COOKIE_SESSION_KEY
GOOGLE_API_CLIENT_ID
GOOGLE_API_CLIENT_SECRET
ALL_USER_DATA_ROUTE_PASSWORD (This is needed for accessing protected routes)
```

### Installing

package.json looks like this

``` "
scripts": {"start": "node app.js"},
  "dependencies": {
    "axios": "^0.18.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "cookie-session": "^2.0.0-beta.3",
    "cors": "^2.8.5",
    "dotenv": "^6.1.0",
    "es6-promise": "^4.2.5",
    "express": "^4.16.4",
    "isomorphic-fetch": "^2.2.1",
    "mongoose": "^5.3.11",
    "passport": "^0.4.0",
    "passport-google-oauth20": "^1.0.0"
  }
  ```
 Run `npm i` or `npm install`

 Wait for the dependencies to install.
 
 ## Now if you configured everything successfully you should be able to do `npm start`.
 
 ![npm start](https://raw.githubusercontent.com/SaudTauqeer/eventReminder-RestApi/master/serverRunningAt.png)
 
 ## You can further go to the PORT you have started the API and you should see this:
 
 ![Api test](https://raw.githubusercontent.com/SaudTauqeer/eventReminder-RestApi/master/notUser.png)
 
## Authors

* **Saud Tauqeer** - (https://github.com/SaudTauqeer)


## License

This project is licensed under the MIT License.

