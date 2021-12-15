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

module.exports = router;