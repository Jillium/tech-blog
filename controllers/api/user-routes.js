// user router
const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
// gets all users
router.get('/', (req, res) => {
    //access the user model and run .findAll()
    User.findAll({
        attributes: { exclude: ['password'] } 
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There has been an error' });
    });
});

//GET /api/users/1
// gets one user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There has been an error' });
    });

});

//POST /api/users
// adds a user
router.post('/', (req, res) => {
    // expects {username: 'Jillium', email: 'holmesjillanne@gmail.com', 'password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There has been an error' });
    });

});

// PUT /api/users/1
// updates a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.status(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There has been an error' });
    });

});

//Delete /api/users/1
// deletes a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json({ message: 'The user has been deleted!' });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'There has been an error' });
    });
});

module.exports = router;