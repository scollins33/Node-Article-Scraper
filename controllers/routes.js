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

            res.status(200).send('saved');
        }
    });
});

router.get('/saved', (req, res) => {
    db.Article.find({})
        .populate('note')
        .limit(50)
        .then( (articles) => res.status(200).render('index', { articles }) )
        .catch( (err) => res.status(500).json(err) );
});

router.delete('/:id', (req, res) => {
    console.log(`got request to delete ${req.params.id}`);

    db.Article.remove({ _id: req.params.id }, (err) => console.log(err) )
        .then(res.status(200).send('saved'));
});

router.post('/notes/:id', (req, res) => {
    console.log(`got request to create note for ${req.params.id}`);

    console.log(req.body);

    db.Note
        .create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id },
                { $push: { note: dbNote._id } },
                { new: true });
        })
        .then( (dbArticle) => {
            console.log(`Added Note to ${dbArticle}`);
            res.status(200).end();
        })
        .catch((err) => res.json(err) );
});

router.delete('/notes/:id', (req, res) => {
    console.log(`got request to delete ${req.params.id}`);

    db.Note.remove({ _id: req.params.id }, (err) => console.log(err) )
        .then(res.status(200).send('deleted'));
});

module.exports = router;