var express = require('express');
var router = express.Router();

var menuActionController = require('../controllers/menu_action.controller');

router.post('/create', menuActionController.handleCreateMenuAction);
router.post('/get-all', menuActionController.handleGetAll);
router.post('/get-menu-action', menuActionController.handleGetMenuActionArr);
module.exports = router;
