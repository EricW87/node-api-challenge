const express = require('express');
const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.post('/', (req, res) => {
    dbProjects.insert(req.body).then(project => res.status(201).json(project)).catch(err => res.status(400).json(err));
});

router.get('/', (req, res) => {
    dbProjects.get().then(projects => res.status(200).json(projects)).catch(err => res.status(400).json(err));
});
  
router.get('/:id', (req, res) => {
    dbProjects.get(req.params.id).then(project => res.status(200).json(project)).catch(err => res.status(400).json(err));
});

router.get('/:id/actions', (req, res) => {
    dbProjects.getProjectActions(req.params.id).then(project => res.status(200).json(project)).catch(err => res.status(400).json(err));
});
  
router.delete('/:id', (req, res) => {
    dbProjects.remove(req.params.id).then(num => res.status(201).json({message: `${num} projects(s) removed`})).catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
    dbProjects.update(req.params.id, req.body).then(num => res.status(201).json({message: `${num} projects(s) updated`})).catch(err => res.status(400).json(err));
});

module.exports = router;