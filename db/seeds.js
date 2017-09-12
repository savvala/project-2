const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

const Food = require('../models/food');
const Restaurant = require('../models/restaurant');

Food.collection.drop();
Restaurant.collection.drop();

Restaurant.create([{
  address: '13 Lower Mall, Hammersmith, London, W6 9DJ',
  name: 'Blue Anchor',
  country: 'UK',
  description: ''
}, {
  address: '17-19 Regency St, Westminster, London, SW1P 4BY',
  name: 'Regency Cafe',
  country: 'UK',
  description: ''
}, {
  address: 'Beijing Shi, 东城区 DongDan, Wangfujing St, 200号工美大厦 邮政编码: 100006',
  name: 'McDonald\'s',
  country: 'China',
  description: ''
}, {
  address: '194 Southgate Rd, London N1 3HT',
  name: 'The Hunter S.',
  country: 'UK',
  description: ''
}, {
  address: '80 Clovelly Rd, Clovelly NSW 2031',
  name: 'Bus Stop',
  country: 'Australia',
  description: ''
},{
  address: 'Petreris 3, Ayia Napa 5330',
  name: 'Panas Holiday Village',
  country: 'Cyprus',
  description: ''
},{
  address: '97-20 Nonhyeon-dong, Gangnam-gu, Seoul',
  name: 'Cheongdamso',
  country: 'South Korea',
  description: ''
},{
  address: '189 Queen\'s Rd, London SE15 2ND',
  name: 'Morely\'s Fried Chicken',
  country: 'UK',
  description: ''
}])
  .then((restaurant) => {
    console.log(`${restaurant.length} restaurant created!`);

    return Food
      .create([{
        title: 'Chicken BLT',
        restaurant: restaurant[0],
        description: ''
      },{
        title: 'Full English',
        restaurant: restaurant[1],
        description: ''
      },{
        title: 'Big Mac',
        restaurant: restaurant[2],
        description: ''
      },{
        title: 'Sunday Roast',
        restaurant: restaurant[3],
        description: ''
      },{
        title: 'Bus Stop Bacon Egg Sandwich',
        restaurant: restaurant[4],
        description: ''
      },{
        title: 'Club Sandwich',
        restaurant: restaurant[5],
        description: ''
      },{
        title: 'Beef Intestines (gopchang)',
        restaurant: restaurant[6],
        description: ''
      },{
        title: 'Pop-Corn Chicken Meal',
        restaurant: restaurant[7],
        description: ''
      }]);
  })
  .then((foods) => {
    console.log(`${foods.length} foods created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
