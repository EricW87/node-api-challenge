const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    db.insert(req.body).then(project => res.status(201).json(project)).catch(err => res.status(200).json(err));
});

router.get('/', (req, res) => {
    db.get().then(projects => res.status(200).json(projects)).catch(err => res.status(200).json(err));
});
  
router.get('/:id', (req, res) => {
    db.get(req.params.id).then(project => res.status(200).json(project)).catch(err => res.status(200).json(err));
});
  
router.delete('/:id', (req, res) => {
    db.remove(req.params.id).then(num => res.status(201).json({message: `${num} projects(s) removed`})).catch(err => res.status(200).json(err));
});

router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body).then(num => res.status(201).json({message: `${num} post(s) updated`})).catch(err => res.status(200).json(err));
});

module.exports = router;