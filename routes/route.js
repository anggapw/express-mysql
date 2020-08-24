// menggunakan express Routers
const router = require('express').Router()

const {
    getAllMovies,
    getAllUsers,
    getSubcription,
    getHistoryWatch,
    addMovie,
    addUser,
    userSubscription,
    addHistory
} = require('../controllers/controller')

router.get('/movies', getAllMovies);
router.get('/users', getAllUsers);
router.get('/subscription', getSubcription);
router.get('/historywatch', getHistoryWatch);

router.post('/movies/add_movie', addMovie);
router.post('/user/add_user', addUser);
router.post('/users/subscribe', userSubscription);
router.post('/add_history', addHistory);

module.exports = router