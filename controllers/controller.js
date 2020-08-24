const connection = require('../config/database');
const bcrypt = require('bcrypt')

module.exports = {
    //getallMovie
    getAllMovies: (req, res) => {
        // query sql
        const myQuery = 'SELECT * from movies'
        // menjalankan query yang kita buat
        connection.query(myQuery, (error, result) => {
            if (error) {
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'get all movie data',
                    status: 200,
                    result
                })
            }
        })
    },
    //getAllUser
    getAllUsers: (req, res) => {
        // query sql
        const myQuery = 'SELECT * from users'
        // menjalankan query yang kita buat
        connection.query(myQuery, (error, result) => {
            if (error) {
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'get all user data',
                    status: 200,
                    result
                })
            }
        })
    },
    //getSubscription
    getSubcription: (req, res) => {
        // query sql
        const myQuery = 'SELECT subscriptions.id_subscription, subscriptions.id_user, users.fullname, users.username, subscriptions.status FROM subscriptions INNER JOIN users ON subscriptions.id_user = users.id_user'
        // menjalankan query yang kita buat
        connection.query(myQuery, (error, result) => {
            if (error) {
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'get subscripton data',
                    status: 200,
                    result
                })
            }
        })
    },
    //getHistoryWatch
    getHistoryWatch: (req, res) => {
        // query sql
        const myQuery = `SELECT history_watch.id_history, history_watch.id_subscription, history_watch.id_user, users.fullname, history_watch.id_movie, movies.title 
        FROM history_watch
        INNER JOIN users ON history_watch.id_user = users.id_user
        INNER JOIN movies ON history_watch.id_movie = movies.id_movie 
        INNER JOIN subscriptions ON history_watch.id_subscription = subscriptions.id_subscription
        WHERE subscriptions.status = true`;
        // menjalankan query yang kita buat
        connection.query(myQuery, (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'get subscription data',
                    status: 200,
                    result
                })
            }
        })
    },
    //getOne
    // getOne: (req, res) => {
    //     // mengambil ID dari parameter
    //     const { id } = req.params
    //     // query GET ONE
    //     const myQuery = `SELECT * FROM users WHERE id=${id}`
    //     // jalankan query mysql
    //     connection.query(myQuery, (error, result) => {
    //         if (error) {
    //             res.send({
    //                 message: 'error',
    //                 status: 500
    //             })
    //         } else {
    //             res.send({
    //                 message: 'get one data',
    //                 status: 200,
    //                 result
    //             })
    //         }
    //     })
    // },
    //addMovie
    addMovie: (req, res) => {
        // mendapatkan data dari form body / input
        const { title, year, genre, description, url_trailer } = req.body
        // query insert
        const myQuery = `INSERT INTO movies(title,year,genre,description,url_trailer) VALUES("${title}", "${year}", "${genre}", "${description}", "${url_trailer}")`;
        // eksekusi query
        connection.query(myQuery, (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'add movie data',
                    status: 200,
                    result
                })
            }
        })
    },
    //addUser
    addUser: (req, res) => {
        // mendapatkan data dari form body / input
        const { fullname, username, email, password, address } = req.body
        // hash password input sebagai random number/string
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if (error) {
                res.send({
                    message: "password invalid"
                })
            } else {
                // query insert
                const myQuery = `INSERT INTO users(fullname, username, email, password, address) VALUES("${fullname}", "${username}", "${email}", "${hashedPassword}", "${address}")`;
                // eksekusi query
                connection.query(myQuery, (error, result) => {
                    if (error) {
                        console.log(error)
                        res.send({
                            message: 'error',
                            status: 500
                        })
                    } else {
                        res.send({
                            message: 'add user data',
                            status: 200,
                            result
                        })
                    }
                })

            }
        })
    },
    userSubscription: (req, res) => {
        // mendapatkan data dari form body / input
        const { id_user, status } = req.body
        // query insert
        const myQuery = `INSERT INTO subscriptions(id_user, status) VALUES("${id_user}", "${status}")`;
        // eksekusi query
        connection.query(myQuery, (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    message: 'error',
                    status: 500
                })
            } else {
                res.send({
                    message: 'subscribe successfully',
                    status: 200,
                    result
                })
            }
        })
    },
    addHistory: (req, res) => {
        // mendapatkan data dari form body / input
        const { id_user, id_movie, id_subscription } = req.body
        // query insert
        const myQuery = `INSERT INTO history_watch(id_movie, id_user, id_subscription) VALUES("${id_movie}", "${id_user}", "${id_subscription}")`;
        // eksekusi query
        connection.query(myQuery, (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    message: 'you have not subscribed yet',
                    status: 500
                })
            } else {
                res.send({
                    message: 'subscribe successfully',
                    status: 200,
                    result
                })
            }
        })
    }
}