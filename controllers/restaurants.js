const Restaurant = require('../models/restaurant');
const Food = require('../models/food');

function restaurantsIndex(req, res) {
  Restaurant
    .find()
    .populate('restaurant')
    .exec()
    .then((restaurants) => {
      res.render('restaurants/index', { restaurants });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsShow(req, res) {
  Restaurant
    .findById(req.params.id)
    .populate('restaurant')
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.status(404).send('Not found');
      return Food
        .find({restaurant: restaurant})
        .exec()
        .then((foods) => res.render('restaurants/show', { restaurant, foods }));
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsNew(req, res) {
  Restaurant
    .find()
    .exec()
    .then((restaurants) => {
      res.render('restaurants/new', { restaurants });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsCreate(req, res) {
  Restaurant
    .create(req.body)
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsEdit(req, res) {
  Restaurant
    .findById(req.params.id)
    .populate('restaurant')
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.status(404).send('Not found');
      return Restaurant
        .find()
        .exec()
        .then((restaurants) => {
          res.render('restaurants/edit', { restaurant, restaurants });
        });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsUpdate(req, res) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.status(404).send('Not found');

      restaurant = Object.assign(restaurant, req.body);
      return restaurant.save();
    })
    .then((restaurant) => {
      res.redirect(`/restaurants/${restaurant.id}`);
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function restaurantsDelete(req, res) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.status(404).send('Not found');

      return restaurant.remove();
    })
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

module.exports = {
  index: restaurantsIndex,
  show: restaurantsShow,
  new: restaurantsNew,
  create: restaurantsCreate,
  edit: restaurantsEdit,
  update: restaurantsUpdate,
  delete: restaurantsDelete
};
