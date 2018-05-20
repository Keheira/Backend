var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
//connect to db
mongoose.connect('mongodb://demo:test@ds255258.mlab.com:55258/todo-redux')
var Note = require('./models/note')

//confire bodyParser to get data
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

//API routes
var router = express.Router()

//middleware for request
router.use(function(req, res, next){
  console.log('Things are happening')
  //go to next route
  next()
})

router.get('/', function(req, res){
  res.json({message: 'Welcome to the api!'})
})

router.route('/notes')
  .post(function(req, res){
    var note = new Note();
    note.name = req.body.name

    //save object and check for error
    note.save(function(err){
      if(err) res.send(err)
      res.json({message: 'Note created!'})
    })
  })
  .get(function(req, res){
    Note.find(function(err, notes){
      if(err) res.send(err)
      res.json(notes)
    })
  })
router.route('/notes/:note_id')
  .get(function(req, res){
    Note.findById(req.params.note_id, function(err, note){
      if(err) res.send(err)
      res.json(note)
    })
  })
  .put(function(req, res){
    Note.findById(req.params.note_id, function(err, note){
      if(err) res.send(err)
      note.name = req.body.name
      note.save(function(err){
        if(err) res.send(err)
        res.json({message: 'Note updated!'})
      })
    })
  })
  .delete(function(req, res){
    Note.remove({
      _id: req.params.note_id
    }, function(err, note){
      if(err) res.send(err)
      res.json({message: 'Delete Success!'})
    })
  })

//routes prefixed with first argument
app.use('/api', router)

//start server
app.listen(port)
console.log('Working on port ' + port)
