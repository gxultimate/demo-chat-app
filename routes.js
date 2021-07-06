var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
const { reset } = require('nodemon');
// var { account, message } = require('./db');
var path = require('path')
// var Datastore = require('nedb-promises')
var account = new Datastore({ filename: path.join(__dirname + '/db/account.db'), autoload: true });
var message = new Datastore({ filename: path.join(__dirname + '/db/message.db'), autoload: true });

router.post('/register', (req, res, next) => {
    try {
        if (req.body) {
            let doc = {
                username: req.body.username,
                password: req.body.password,
                contacts: [],
                isOnline: false
            }
            account.findOne({ username: req.body.username }, (err, newDoc) => {
                if (newDoc === null) {

                    account.insert(doc, (err, ndoc) => {
                        res.send(ndoc)
                    })

                }
                else {
                    res.send(false)
                }
            })

        }
    }
    catch (err) {
        next(err)
    }


})


router.post('/login', async (req, res, next) => {
    try {
        await account.findOne({ username: req.body.username, password: req.body.password }, function(err, newDoc) {
            if(newDoc !== null) {
                res.send(newDoc)
            }
            else{
                res.send(false)
            }
        })
    }
    catch (err) {
        next(err)
    }


})





router.post('/online', async (req, res, next) => {
    try {
        await account.update({ _id: req.body._id }, { $set: { isOnline: req.body.isOnline } }, function () { })
        res.send(true)
    } catch (err) {
        next(err)
    }

})


router.patch('/account/:id', async (req, res, next) => {
    try {
        await account.update({ _id: req.params.id }, { $set:  req.body }, function () { })
        res.send(true)
    } catch (err) {
        next(err)
    }

})


router.get('/contact/:id', async (req, res, next) => {
    try {
        await account.findOne({ _id: req.params.id }, (err, newDoc) => res.send(newDoc))

    } catch (err) {
        next(err)
    }
})

router.post('/contact', async (req, res, next) => {
    try {
        await account.update({ _id: req.body._id }, { $push: { contacts: req.body.contact } }, {}, function () {
        })
        res.json({ sucess: true })
    }
    catch (err) {
        next(err)
    }


})

router.get('/contact/:id', async (req, res, next) => {
    try {
        await account.findOne({ _id: req.params.id }, (err, newDoc) => res.send(newDoc))
    }
    catch (err) {
        next(err)
    }
})


router.post('/message', async (req, res, next) => {
    
    try {
        let doc = {
            createdAt: req.body.createdAt,
            message: req.body.message,
            recipient: req.body.recipient,
            sender: req.body.sender,
            receiver: req.body.receiver,
            sent: true
    
        }
        await message.insert(doc, function (err, newDocs) {
            res.send(newDocs)
          })
    }
    catch (err) {
        next(err)
    }

})


router.get('/message/:sender/:recipient', async (req, res, next) => {
    try {
        await message.find({
            $or: [{ sender: req.params.sender, recipient: req.params.recipient }, { sender: req.params.recipient, recipient: req.params.sender }]

        }).sort({ createdAt: 1 }).exec(function (err, docs) {
            res.send(docs)
        })
    } catch (err) {
        next(err)
    }

})


module.exports = router;
