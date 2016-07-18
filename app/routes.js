
var config        = require('../config');

var Authenticate  = require('./authenticate');
var Handler = require('./handler');


module.exports = function(app, express) {
  var router = express.Router();

  router.post('/login', Authenticate.login);
  router.post('/logout', Authenticate.ensureLoggedIn, Authenticate.logout);
  router.post('/register', Authenticate.register);
  router.post('/checkLogin',Authenticate.ensureLoggedIn,Authenticate.sendLoginStatus);
  //get a subsaiddit front page
  router.get('/s/:subsaiddit', Handler.sendSubsaiddit);
  //get a post from a subsaiddit
  router.get('/s/:subsaiddit/:post', Handler.getPost);
  router.get('/getPostsList/:subsaiddit',Handler.sendSubsaidditPosts);
  router.post('/subscribe/:subsaiddit',Authenticate.ensureLoggedIn, Handler.getUser, Handler.subscribeUser);
  router.post('/unsubscribe/:subsaiddit',Authenticate.ensureLoggedIn, Handler.getUser, Handler.unsubscribeUser);
  //add and delete posts
  //router.get('/:subsaiddit/:addPost', Handler.addPost);
  //router.get('/:subsaiddit/:deletePost',Handler.deletePost);
  router.post('/getSubscribed',Authenticate.ensureLoggedIn, Handler.sendSubscribed);
  router.get('/getSubscribed/:subsaiddit',Authenticate.ensureLoggedIn, Handler.isSubscribed);
  router.get('/notAuthorized',Handler.sendNotAuthorized);
  router.get("/getPost/:subsaiddit/:post_title", Handler.getPostContent);

  router.get("/getFriends", Authenticate.ensureLoggedIn, Handler.getUser, Handler.sendFriends);
  router.post("/addFriend", Authenticate.ensureLoggedIn, Handler.getUser, Handler.addFriend);


  return router;
};
