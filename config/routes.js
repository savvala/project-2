const express = require('express');
const router  = express.Router();
const foods = require('../controllers/foods');
const restaurants = require('../controllers/restaurants');

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => {
  const images = [
    'home1.jpg',
    'home2.JPG',
    'home3.jpg',
    'home4.jpg',
    'home5.jpg',
    'home6.jpg',
    'home7.jpg'
  ];
  const randomImage = `/assets/images/${images[Math.floor(Math.random() * images.length)]}`;
  return res.render('home', { isHompage: true, randomImage });
});


router.route('/foods')
  .get(foods.index)
  .post(foods.create);

router.route('/foods/new')
  .get(secureRoute, foods.new);

router.route('/foods/:id')
  .get(foods.show)
  .put(foods.update)
  .delete(foods.delete);

router.route('/foods/:id/edit')
  .get(secureRoute, foods.edit);

router.route('/restaurants')
  .get(restaurants.index)
  .post(restaurants.create);

router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);

router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(restaurants.update)
  .delete(restaurants.delete);

router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

router.route('/register')
  .get(registrations.new) // get the register form
  .post(registrations.create); // register a new user when you submit the register form

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/foods/:id/comments')
  .post(secureRoute, foods.commentsCreate);

router.route('/foods/:id/comments/:commentId')
  .delete(secureRoute, foods.commentsDelete);

router.route('/restaurants/:id/comments')
  .post(secureRoute, restaurants.commentsCreate);

router.route('/restaurants/:id/comments/:commentId')
  .delete(secureRoute, restaurants.commentsDelete);

router.get('/logout', sessions.delete);


module.exports = router;
