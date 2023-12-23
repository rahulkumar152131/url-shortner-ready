const express = require('express');
const router = express.Router();
// const { handleGenrateSortUrl } = require('../controller/url.controller');
const urlController = require('../controller/url.controller')
const passport = require('../config/localStatagey');


//to create a short id
router.post('/',
    passport.checkAuthentication,
    urlController.handleGenrateSortUrl);


// get the short id
router.get('/:shortId', urlController.redirectUrl)
module.exports = router;