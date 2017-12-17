const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

// Create Router
const router = express.Router();

// Pull in the models as "db"
const db = require('../models');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/scrape/:sub', (req, res) => {
    const target = `http://www.reddit.com/r/${req.params.sub}`;

    request.get(target, (err, resRaw, resHTML) => {
        if (err) {
            console.log(err);
            res.status(402).send('Sub not found or could not load');
        } else {
            const $ = cheerio.load(resHTML);

            $("a.title").each((each, element) => {
                const title = $(element).text();
                const link = $(element).attr("href");

                const thisArticle = {
                        "subreddit": req.params.sub,
                        "title": title,
                        "link": link
                    };


                db.Article
                    .create(thisArticle)
                    .then( () => {
                        console.log(`Added ${thisArticle} to DB`);
                    })
                    .catch( (err) => res.json(err) );
            });

            res.status(200).send('Scaping and Saving done');
        }
    });
});

router.get('/retrieve', (req, res) => {
    db.Article.find({})
        .then( (articles) => res.status(200).json(articles) )
        .catch( (err) => res.status(500).json(err) );
});

module.exports = router;