const shortid = require('shortid');

const URL = require('../model/url.model');

// generating short Url

module.exports.handleGenrateSortUrl = async (req, res) => {
    try {
        const body = req.body;
        if (!body.url) {
            return res.status(400).json({ error: "url is required" })
        }
        const shortID = shortid()
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,

        })
        return res.json({ id: shortID });
    } catch (err) {
        console.log("Error in generating short url", err);
        res.status(500).send("Something went wrong");
    }
}

// getting short url

module.exports.redirectUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({
            shortId
        })
        if (!entry) {
            return res.status(400).send("Url not found");
        }
        res.redirect(entry.redirectUrl);
    } catch (err) {
        console.log("Error in getting short url", err);
        res.status(500).send("Something went wrong");
    }
}
