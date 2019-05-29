const express = require("express");
const router = express.Router();
const Trainer = require("../models/trainer");

//-----------------------------get----------------------------------//

router.get("/trainers", (req, res, next) => {
  Trainer.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 500000,
        distanceField: "distance",
        spherical: true
      }
    }
  ])
    .then(function(ninjas) {
      res.send(ninjas);
    })
    .catch(next);
});

//----------------------==------add-----==---------------------------//
router.post("/trainers", (req, res, next) => {
  Trainer.create(req.body)
    .then(function(trainer) {
      res.send(trainer);
    })
    .catch(next);
});
//------------------------update trainer----------------------------//
router.put("/trainers/:id", (req, res, next) => {
  Trainer.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Trainer.findOne({ _id: req.params.id }).then(function(trainer) {
      res.send(trainer);
    });
  });
});
//----------------------------delete--------------------------------//
//alternate method??? findByIdAndRemove()
router.delete("/trainers/:id", (req, res, next) => {
  Trainer.deleteOne({ _id: req.params.id }).then(function(trainer) {
    res.send(trainer);
  });
});

module.exports = router;

// curl -H "Content-Type: application/json" -X POST -d '{"name": "Patrick Bateman","skill": "Returning Video Tapes",	"available": true,"geometry": {"type": "point", "coordinates": [153, -35]}}' http://localhost:4000/api/trainers/
