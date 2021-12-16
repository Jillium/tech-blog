const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (rez, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'

        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'There has been an error' });
        });

});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// route for cookies
router.get('/', (req, res) => {
    console.log(req.session);
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


// route for session/cookies
router.get('/', (req, res) => {
    console.log(req.session);

    // other logic...
});

//route for single post page
router.get('/post/:id', (req, res) => {
    const post = {
      id: 1,
      title: 'Handlebars Docs',
      content: 'How to use handlebars',
      created_at: new Date(),
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    };
  
    res.render('single-post', { post });
  });

module.exports = router;