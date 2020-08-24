// menggunakan express Routers
const router = require('express').Router()

const {
    getAllMovies,
    getAllUsers,
    getSubcription,
    getHistory,
    addMovie,
    addUser,
    userSubscription,
    addHistory,
    updateMovie,
    updateUser,
    deleteMovie,
    deleteUser,
    deleteHistory
} = require('../controllers/controller')

router.get('/movies', getAllMovies);
router.get('/users', getAllUsers);
router.get('/subscription', getSubcription);
router.get('/history', getHistory);

router.post('/movie/add', addMovie);
router.post('/user/add', addUser);
router.post('/subscription/add', userSubscription);
router.post('/history/add', addHistory);

router.put('/movie/:id', updateMovie);
router.put('/user/:id', updateUser);

router.delete('/movie/:id', deleteMovie);
router.delete('/user/:id', deleteUser);
router.delete('/subscription/:id', deleteHistory);

module.exports = router