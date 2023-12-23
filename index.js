const express = require('express');
const bodyParser = require('body-parser')
const cookeiParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const swagger = require('swagger-ui-express');

const apiDocs = require('./swagger3.0.json');
const urlRouter = require('./router/url.router');
const userRouter = require('./router/user.router')
const { conectToMongo } = require('./config/mongodb');


const app = express();
const PORT = 8000;

//for swagger ui
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));


app.use(cookeiParser());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    name: "ninjas",
    secret: "rigerikgerqetirkty",
    saveUninitialized: false,
    resave: false,
    Cookie: {
        maxAge: (5000)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/sort-url-pk',
            autoRemove: "disabled"
        },
    )
}));

// for passport

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//connecting to mongoDB

const url = 'mongodb://127.0.0.1:27017/sort-url-pk';
conectToMongo(url)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => {
        console.log("Error connecting to mongoDB", err);
    });


//routes

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use('/url', urlRouter);
app.use('api/user', userRouter)


//running to port

app.listen(PORT, () => {
    console.log(`server is running port :: ${PORT}`)
})