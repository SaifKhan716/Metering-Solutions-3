const express = require('express');
const notificationRouter = express.Router();

const notificationController = require('../controller/notificationcontroller');


notificationRouter.get('/user/:userId', notificationController.getUserNotifications);

notificationRouter.get('/admin/:adminId', notificationController.getAdminNotifications);

// PATCH /notifications/status/:userId
notificationRouter.patch('/status/:userId', notificationController.updateNotificationStatusByUserId);


module.exports = notificationRouter;