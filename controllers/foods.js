const Food = require('../models/food');
const Restaurant = require('../models/restaurant');

function foodsIndex(req, res) {
  Food
    .find()
    .populate('restaurant')
    .exec()
    .then((foods) => {
      res.render('foods/index', { foods });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsShow(req, res) {
  Food
    .findById(req.params.id)
    .populate('restaurant')
    .exec()
    .then((food) => {
      if(!food) return res.status(404).send('Not found');
      res.render('foods/show', { food });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsNew(req, res) {
  Restaurant
    .find()
    .exec()
    .then((restaurants) => {
      res.render('foods/new', { restaurants });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsCreate(req, res) {
  Food
    .create(req.body)
    .then(() => {
      res.redirect('/foods');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsEdit(req, res) {
  Food
    .findById(req.params.id)
    .populate('restaurant')
    .exec()
    .then((food) => {
      if(!food) return res.status(404).send('Not found');
      return Restaurant
        .find()
        .exec()
        .then((restaurants) => {
          res.render('foods/edit', { food, restaurants });
        });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsUpdate(req, res) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.status(404).send('Not found');

      food = Object.assign(food, req.body);
      return food.save();
    })
    .then((food) => {
      res.redirect(`/foods/${food.id}`);
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsDelete(req, res) {
  Food
    .findById(req.params.id)
    .exec()
    .then((food) => {
      if(!food) return res.status(404).send('Not found');

      return food.remove();
    })
    .then(() => {
      res.redirect('/foods');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function foodsCommentsCreate(req, res) {
  Food
    .findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .exec()
    .then(food => {
      food.comments.push(req.body);
      return food.save();
    })
    .then(food => res.redirect(`/foods/${food.id}`))
    .catch(err => res.render('error', {err}));
}

function foodsCommentsDelete(req, res) {
  Food
    .findById(req.params.id)
    .exec()
    .then(foods => {
      const comment = foods.comments.id(req.params.commentId);
      comment.remove();
      return foods.save();
    })
    .then(foods => res.redirect(`/foods/${foods.id}`))
    .catch(err => res.render('error', {err}));
}

module.exports = {
  index: foodsIndex,
  show: foodsShow,
  new: foodsNew,
  create: foodsCreate,
  edit: foodsEdit,
  update: foodsUpdate,
  delete: foodsDelete,
  commentsCreate: foodsCommentsCreate,
  commentsDelete: foodsCommentsDelete
};
