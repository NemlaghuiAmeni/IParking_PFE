var express = require('express');
var router = express.Router();
var lisP = require('../models/parking');
const multer = require('multer');
var user = require('../models/superAdmin');
var Reservation=require('../models/reservation')

var ObjectId = require('mongoose').Types.ObjectId;

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


router.post('/list/listAdminReservation',function(req,res){
    try {
        console.log(req.body.adminId,"jjvj")
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
router.post('/list/makeReservation',function(req,res){
    try {

      
      console.log("reservation park: "+req.body.park)
      //  lisP.find({"name":req.body.data.place})
      
  /*    lisP.find({"name":req.body.data.park})
      .populate('reservation')
      .exec(function (err, listRes) {
          if (err) {
              console.log("err");
          } else {
              console.log(listRes)
              res.json(listRes);
          }
      });
    */  
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
     
    }
    
        catch (err) {
            res.json({message: err.message});
    
        }
    
        
    })
    
router.post('/list/ParkWithName',function(req,res){
    try {

        lisP.find({name:req.body.name},function (err, lisP) {
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
/*----------------------------------------------------------bch tzid parking--------------------------------------*/

router.post('/addParking', upload.single('image'), (req, res) => {
    console.log(req.file);
    var list = new lisP();
    list.name = req.body.name;
    list.longitude = req.body.longitude;
    list.latitude = req.body.latitude;
    list.description=req.body.description;
    list.price = req.body.price;
    list.priceD=req.body.priceD;
    list.priceW=req.body.priceW;
    list.nbplace = req.body.nbplace;
    list.capteur = req.body.capteur;
    list.image = req.body.image;
    list.userId = req.body.userId;
    console.log(list.userId)
    list.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {

            res.send(registeredUser)
        }
    })
})

/*-------------------------------------------------bch tfasa5 parking-------------------------------------------*/
router.delete('/list/p/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    lisP.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in park Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


/*----------------------------------------------- bch tmodifi parking khw mrigle ----------------------------------------*/
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
        if (!err) { res.send(doc); } else { console.log('Error in park Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/list/m/:name', (req, res) => {


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
    lisP.findOneAndUpdate({ "name": req.params.name }, { $set: park }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Message Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router