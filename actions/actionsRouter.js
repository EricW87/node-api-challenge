const express = require('express');
const dbActions = require('../data/helpers/actionModel.js');
const dbProjects = require('../data/helpers/projectModel.js');

const router = express.Router();
//:id refers to project id for all endpoints
router.post('/:id', validateProjectId, (req, res) => {
    if(!req.body.project_id)
        req.body.project_id = req.params.id;
    
    dbActions.insert(req.body).then(project => res.status(201).json(project)).catch(err => res.status(400).json(err));
});

router.get('/', (req, res) => {
    dbActions.get().then(actions => res.status(200).json(actions)).catch(err => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
    dbActions.get(req.params.id).then(actions => res.status(200).json(actions)).catch(err => res.status(400).json(err));
});
   
router.delete('/:id/:actionid', (req, res) => {
    if(!req.body.project_id)
        req.body.project_id = req.params.id;

    dbActions.remove(req.params.actionid).then(num => res.status(201).json({message: `${num} projects(s) removed`})).catch(err => res.status(400).json(err));
});

router.put('/:id/:actionid', (req, res) => {
    if(!req.body.project_id)
        req.body.project_id = req.params.id;

    if(!req.body.id)
        req.body.id = req.params.actionsid

    console.log(req.body, req.body.id);
    dbActions.update(req.body.id, req.body).then(num => res.status(201).json({message: `${num} projects(s) updated`})).catch(err => res.status(400).json(err));
});

function validateProjectId(req, res, next) {
    // do your magic!
    const id = req.params.id;
    // do your magic!
    if(!id)
      res.status(500).json({message: "missing id parameter"});
    else
      dbProjects
        .get(id)
        .then(post => {
          if(post)
          {
            next();
          }
          else
            res.status(400).json({message: "invalid project id"})
        })
        .catch(err => res.status(400).json({message: "invalid project id"}));
  }

module.exports = router;