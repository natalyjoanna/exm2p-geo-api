const BranchController = require('../controller/branches');
const express = require('express');
const router = express.Router();
router.get('/findAllGeoBranches', BranchController.findAllGeoBranches);
router.get('/all', BranchController.findAllBranches);
router.get('/:id', BranchController.findById);
router.post('/add', BranchController.addBranch);
router.post('/updateBranchLocation', BranchController.updateBranchLocation);
router.get('/byname/:name', BranchController.findByBranchname);
router.get('/removeById/:id', BranchController.removeById);
router.get('/updateBranchLocationn', BranchController.updateBranchLocationn);

module.exports = router;