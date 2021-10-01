var express = require('express');
var router = express.Router();
var lisP = require('../models/parking');
const multer = require('multer');
var user = require('../models/superAdmin');
var Reservation=require('../models/reservation')
var SimpleUser = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var Place= require('../models/place');
const e = require('express');
const place = require('../models/place');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `FunOfHeuristic_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.post('/list/listParkingwithId',function(req,res){

    console.log("userIdTofindParking: "+req.body.userId);
    lisP.find({"userId":req.body.userId})
    .populate('reservation')
    .exec(function (err, listRes) {
        if (err) {
            console.log("err");
        } else {
            console.log(listRes)
            res.json(listRes);
        }
    });
    
})
router.get('/getParkingByName',function(req,res){

    lisP.find({ name: req.body.name })
    .populate('parking')
    .exec(function (err, listRes) {
        if (err) {
            console.log("err");
        } else {
            console.log(listRes)
            res.json(listRes);
        }
    });
    
})

router.post('/list/listAdminReservation',function(req,res){
    try {
        console.log(req.body.adminId)
        Reservation.find({})
        .populate('reservation')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/listReservation',function(req,res){
    try {
console.log("userId"+req.body.userId)
        Reservation.find({"userId":req.body.userId})
        .populate('reservation')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                console.log(listRes)
                res.json(listRes);
            }
        });
        

     
    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/addPlace',function(req, res) {
  let place= new Place({
      name:req.body.place,
      attributed:false,
      reserved:false,
      park:req.body.park,
	adminId:req.body.adminId,
	rang:req.body.rang

  })
console.log("place: "+place)
  place=place.save()
  res.json(place)
  });
  

router.post("/list/update",function(req, res) {
  Place.updateOne({ park: "Nasr4" , name:"P42" }, { reserved: true }, function(
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
router.post('/list/makeReservation',function(req,res){
    try {

      console.log("userId from reservation: "+req.body.data.userId)
      console.log("reservation park: "+req.body.data.park)
    
      let reservation = new Reservation({

        park:req.body.data.park,
        palce: req.body.data.place,
        matricule:req.body.data.matricule,
        dateDebut: req.body.data.dateD,
        dateFin:req.body.data.dateF,
        timeDebut:req.body.data.timeD,
        timeFin:req.body.data.timeF,
        Tpark:req.body.data.Tpark,
        userId:req.body.data.userId,
        adminId:req.body.data.adminId,
        

    })
    reservation =  reservation.save();
    Place.updateOne({ park:req.body.data.park , name: req.body.data.place }, { reserved: true }, function(
        err,
        result
      ) {
        if (err) {
console.log("eeror saving")
          res.send(err);
        } else {
console.log("success saving")

          res.json(result);
        }
      });
}
        catch (err) {
            res.json({message: err.message});
        }
    })
router.post('/list/ParkWithName',function(req,res){
    try {

        Place.find({park:req.body.name,reserved:false},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

router.post('/list/ParkWithNameMap',function(req,res){
    try {

        Place.find({park:req.body.name},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
                
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})


router.post('/list/deletePlace',function(req,res){
    try {
console.log("Data to be deleted: "+req.body.place)
	
   let result=  place.deleteOne({ name: req.body.place,rang:req.body.rang }).then(function(){ 
    console.log("Data deleted"); // Success 
}).catch(function(error){ 
    console.log(error); // Failure 
}); ;

console.log("delete place?")
res.json(result)
    } catch (err) {
        res.json({message: err.message});

    }

    
})


router.post('/list/AllParking',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/AllParks',function(req,res){
    try {

        lisP.find({},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})

router.post('/list/curentUser',function(req,res){

 
    try {

        user.find({email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
})
router.post('/list/curentSimpleUser',function(req,res){

 
    try {

        SimpleUser.find({ email:req.body.email},function (err, lisP) {
            if(err){
              console.log("err");
            } else{
              res.json(lisP);
              console.log(lisP)
            }
          });
        
        console.log('useremail: '+req.body.email)


    } catch (err) {
        res.json({message: err.message});

    }

    
 })

/* ------------------------------------------ traja3lik list ta3 les parking l kol -------------------------*/
router.get('/list/parking', function (req, res) {

    lisP.find({"userId":req.body.userId})
        .populate('reservation')
        .exec(function (err, listRes) {
            if (err) {
                console.log("err");
            } else {
                res.json(listRes);
            }
        });
});
router.route('/list/parking/:name').get(function (req, res) {
    let name = req.params.name;

    lisP.find({ name }, function (err, listRes) {
        if (err) {
            console.log("err");
        } else {
            res.json(listRes);
        }
    });
});

router.post('/addPlace', (req, res) => {
    console.log(req)

})

// Add Park
router.post('/addParking',(req, res) => {
    var parking = new lisP();
    parking.name = req.body.name;
    parking.longitude = req.body.longitude;
    parking.latitude = req.body.latitude;
    parking.des=req.body.des;
    parking.price = req.body.price;
    parking.priceD=req.body.priceD;
    parking.priceW=req.body.priceW,
    parking.description=req.body.description;
    parking.nbplace = req.body.nbplace;
    parking.capteur = req.body.capteur;
    parking.image = req.body.image;
    parking.userId = req.body.userId;
    console.log(parking.userId)
    parking.save((err, registeredUser) => {
        if (err) {
            console.log('Error in parking save :' +JSON.stringify(err,undefined,2));
        } else {

            res.send(registeredUser)
        }
    })
})

//Supprimer un parking
router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Mettre à jour un park
router.put('/list/m/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        des:req.body.des,
        price: req.body.price,
        priceD:req.body.priceD,
        priceW:req.body.priceW,
        description:req.body.description,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findByIdAndUpdate(req.params.id, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
/*router.put('/list/m/:name', (req, res) => {


    var park = {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        price: req.body.price,
        priceD:req.body.priceD,
        priceW:req.body.priceW,
        nbplace: req.body.nbplace,
        capteur: req.body.capteur,
        image: req.body.image
    };
    lisP.findOneAndUpdate({ "name": req.params.name }, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Park Update :' + JSON.stringify(err, undefined, 2)); }
    });
});*/

module.exports = router;