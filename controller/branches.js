const mongoose = require('mongoose');
const Branch = require('../models/branch');
const { response } = require('express');
const findAllBranches = (req, res) => {
    Branch.find().then((branches) => { 
        // console.log('Branches FindAll Succes');
        res.status(200).json(branches);
    },
    err => { 
        // console.log('Branches FindAll Error');
        err && res.status(500).send(err.message);
    });
};

const findById = (req, res) => {
  console.log(req.params);
  Branch.findById(req.params.id).then((branch) => {
      res.status(200).json(branch);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};

const addBranch = (req, res) => {
  let branch = new Branch({
      name: req.body.name,
      manager_name: req.body.manager_name,
      latestLatitude : req.body.latestLatitude,
      latestLongitude : req.body.latestLongitude
  });
  branch.save().then((brch) => {
      res.status(200).json(brch);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};

const updateBranchLocationn = (req, res) => {
  console.log(req.body);
  Branch.updateOne({_id:req.body.id}, 
  {latestLatitude:req.body.latestLatitude, 
      latestLongitude: req.body.latestLongitude}).then((brch) =>{
          res.status(200).json(brch);
      },
      err => {
          err && res.status(500).send(err.message);
  });
}

const updateBranchLocation = (req, res) => {
    console.log(req.body);
    const key = Object.keys(req.body)[0];
    // console.log(key);
    const parsedKey = JSON.parse(key);
    // console.log(parsedKey);
    Branch.updateOne({_id:parsedKey.id}, 
        {latestLatitude:parsedKey.latestLatitude, 
            latestLongitude: parsedKey.latestLongitude}).then((brch) =>{
            res.status(200).json(brch);
        },
        err => {
            err && res.status(500).send(err.message);
    });
}

const findByBranchname = (req, res) => {
  console.log(req.params.name);
  Branch.find({name:req.params.name}).then((branch) => {
      res.status(200).json(branch);
  },
  err => {
      err && res.status(500).send(err.message);
  });
};

const removeById = (req, res) => {
    console.log(req.params);
    Branch.findByIdAndDelete(req.params.id).then((branch) => {
        res.status(200).json(branch);
    },
    err => {
        err && res.status(500).send(err.message);
    });
};



const findAllGeoBranches = (req, res) => {
    Branch.find().then((branch) => {
        console.log('Branches FindAll GeoBranches Succes');
        var geobranches = {type: "FeatureCollection", "features":[]};
        branch.map(item=>{
            var mylat = parseFloat(item.latestLatitude);
            var mylng = parseFloat(item.latestLongitude);
            geobranches.features.push(
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [mylng, mylat]
                    },
                    properties: {
                        name: item.name
                    },
                    id: item._id
                }
            );
        });
        res.status(200).json(geobranches);
    },
    err => {
        console.log('Branches FindAll GeoBranches Error');
        err && res.status(500).send(err.message)
    }
    )
}

module.exports = { findAllBranches, findById, addBranch, updateBranchLocation, findByBranchname, removeById, findAllGeoBranches, updateBranchLocationn };