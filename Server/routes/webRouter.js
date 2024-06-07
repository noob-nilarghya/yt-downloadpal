const express = require('express');
const apiController= require('../controllers/apiController');
const router = express.Router(); 

// Global middleware
// router.use(authController.isLoggedIn);

router.route('/')
    .get(apiController.testingRoute);

router.route('/getVideoData')
    .post(apiController.getVideoMetaInfo);

router.route('/downloadVideo')
    .post(apiController.downloadVideoContent);

router.route('/getPlaylistInfo')
    .post(apiController.getPlaylistLen);

router.route('/getPlaylistDownloadInfo')
    .post(apiController.getPlaylistDetails);

router.route('/downloadPlaylist')
    .post(apiController.downloadPlaylistContent);



module.exports= router;