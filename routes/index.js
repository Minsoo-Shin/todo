const express = require('express');
const router = express.Router();

const authUser = require('./authUser');
const ctrl = require('./index.ctrl');


/* create todos */
router.post('/todos', authUser, ctrl.create);
/* get todo (specified) */
router.get('/todos/:id', authUser, ctrl.getById);
/* get todos */
router.get('/todos', authUser, ctrl.getAll);
/* update todos */
router.put('/todos/:id', authUser, ctrl.update);
/* delete todos */
router.delete('/todos/:id', authUser, ctrl.remove);
module.exports = router;