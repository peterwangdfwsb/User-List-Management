const express = require('express'); 
const router = express.Router();        
const app = express(); 
const mongoose = require('mongoose');
const cors = require('cors');                

// base
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;    

// allows CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resource-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "*");
    console.log("requst url = " + req.url);
	next();
})

//Test for Postman
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });   
});

// routes - REST API
app.use('/api', router);

// get all
router.get('/users', (req, res) => {
    getAll(req, res);
});

// create user
router.post('/users', (req, res) => {
    createOne(req, res);
});

//update one
router.put('/users/:user_id', (req, res) => {
    editOne(req, res, req.params.user_id);
});

//delete one
router.delete('/users/:user_id', (req, res) => {
    deleteOne(req, res, req.params.user_id);
})

app.listen(port, () => {
    console.log('Magic happens on port ' + port)}
);


//Monogodb Data Part
// connect
mongoose.connect('mongodb+srv://peter:abc@ustsvdemo.t5qj9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
					{useNewUrlParser: true, useUnifiedTopology: true});

// get all
const Users = require('./users');
let getAll = (req, res) => {
    Users.find((err, users) => {
        if (err) {
            console.log(err);
            res.status(501).send(err);
        }
        else {
            console.log(users);
            res.status(200).json(users);
        }

        //mongoose.disconnect();
    });
}


// create user
let createOne = (req, res) => {
    let newUser = new Users();
    if (req.body) {
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.age = req.body.age;
        newUser.sex = req.body.sex;
        newUser.password = req.body.password;
        newUser.repeat = req.body.repeat;
    }
    newUser.save()
    .then(obj=>{
		console.log("object created: ", obj.toString());
		res.json(obj)
	})
	/*.then(() => {
		mongoose.disconnect();
	})*/
	.catch(err => res.status(501).send(err))
}

// update one
let editOne = (req, res, id) => {
    var new_id = Number(id);
     Users.find()
     .then(users=>{
         id = users[new_id]._id;
         let user = users[new_id];
         console.log("user to be updated", user.toString());
         user.firstname = req.body.firstname;
         user.lastname = req.body.lastname;
         user.age = req.body.age;
         user.sex = req.body.sex;
         user.password = req.body.password;
         user.repeat = req.body.repeat;
         return user.save();
     })
     .then(()=>{
         console.log("user updated");
         return Users.findById(id);
     })
     .then(new_user=>{
         console.log('new user', new_user.toString());
         res.json({updateData: new_user})
         //mongoose.disconnect();
     })
     .catch(err => res.status(501).send(err));

}


let deleteOne = (req, res, id) => {
    var new_id = Number(id);
    Users.find(function(err, users){
        if (err) {
            console.log(err);
            res.status(501).send(err);
        } 
        else {
            let id = users[new_id]._id;
            console.log('_id=', id);
            res.json(id);
            Users.deleteOne({_id: id}, function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(`User ${id} deleted`);
                    /*Users.findById(id, function(err, user) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log('user is deleted:', user);
                            res.json(user);
                            //mongoose.disconnect();
                        }
                    })*/
                }
            })
        }
    })
}


