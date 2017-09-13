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
  description: 'Nice little pub on the Thames River in Hammersmith'
}, {
  address: '17-19 Regency St, Westminster, London, SW1P 4BY',
  name: 'Regency Cafe',
  country: 'UK',
  description: 'The Regency Café opened in 1946 on Regency Street, near Westminster London. This popular place has been voted as the fifth best eating place in London.'
}, {
  address: 'Beijing Shi, 东城区 DongDan, Wangfujing St, 200号工美大厦 邮政编码: 100006',
  name: 'McDonald\'s China',
  country: 'China',
  description: 'Chinese McDonald\'s'
}, {
  address: '194 Southgate Rd, London N1 3HT',
  name: 'The Hunter S.',
  country: 'UK',
  description: 'Great taxidermy, even better toilet decor.'
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
  description: 'My favourite Chicken Shop in London'
},{
  address: '5 Chome-14-12 Fukushima, Fukushima Ward, Osaka, Osaka Prefecture 553-0003, Japan',
  name: 'Yoshinoya',
  country: 'Japan',
  description: 'Fast-Food restaurant serving Beef Bowl'
},{
  address: '5 Throgmorton St, London EC2N 2AD',
  name: 'Le Relais de Venise l\'Entrecôte - City',
  country: 'London',
  description: 'Very French'
},{
  address: '64 St Giles High St, London WC2H 8LE',
  name: 'Kanada-ya',
  country: 'London',
  description: 'Authentic Japanese Ramen Restaurant'
},{
  address: '80 Spring St, New York, NY 10012, USA',
  name: 'Balthazar',
  country: 'USA',
  description: 'Iconic French brasserie with steak frites, brunch & pastries in a classy space with red banquettes.'
}])
  .then((restaurant) => {
    console.log(`${restaurant.length} restaurant created!`);

    return Food
      .create([{
        title: 'Chicken BLT',
        restaurant: restaurant[0],
        description: 'The reason why I decided to make this website- I got tired of preaching how good this sandwich is on the streets.',
        image: 'http://www.blogchef.net/wp-content/uploads/2016/03/ranch_chicken_blt_2.jpg'
      },{
        title: 'Full English',
        restaurant: restaurant[1],
        description: 'Seriously.',
        image: 'http://ot-foodspotting-production.s3.amazonaws.com/reviews/4753366/thumb_600.jpg?1401736051'
      },{
        title: 'Big Mac',
        restaurant: restaurant[2],
        description: 'Don\'t know why but China have the best Big Mac in the world. Must have something to do with their supply of beef.',
        image: 'https://c1.staticflickr.com/9/8809/17896291786_564b52e64e_z.jpg'
      },{
        title: 'Beef Wellington',
        restaurant: restaurant[3],
        description: 'Solid Beef Wellington.',
        image: 'http://www.recipes.co.nz/ic/4112420676/Beef%20Wellington.1.jpg'
      },{
        title: 'Bus Stop Bacon Egg Sandwich',
        restaurant: restaurant[4],
        description: '',
        image: 'http://creolecontessa.com/wp-content/uploads/2014/04/bacon-egg-and-cheese-grilled-cheese-sandwich-25289-2529.jpg'
      },{
        title: 'Club Sandwich',
        restaurant: restaurant[5],
        description: '',
        image: 'http://img.taste.com.au/kjEsak6-/taste/2016/11/blat-club-sandwiches-86856-1.jpeg'
      },{
        title: 'Beef Intestines (gopchang)',
        restaurant: restaurant[6],
        description: 'Friend from Soeul vouches for it, I believe his judgement.',
        image: 'http://contents.visitseoul.net/file_save/art_img/2011/10/20/20111020041745_D.jpg'
      },{
        title: 'Pop-Corn Chicken Meal',
        restaurant: restaurant[7],
        description: 'Simply Bangin',
        image: 'http://www.waiterschoice.com/wp-content/uploads/2017/05/Popcorn-Chicken.png'
      },{
        title: 'Beef Bowl',
        restaurant: restaurant[8],
        description: 'Beef Bowls are boom-ting',
        image: 'http://cdn.iowagirleats.com/wp-content/uploads/2011/11/DSC_0168.jpg'
      },{
        title: 'Steak-Frites',
        restaurant: restaurant[9],
        description: 'Buff Steak with a top-secret sauce',
        image: 'http://danielfooddiary.com/wp-content/uploads/2013/10/lentrecote1.jpg'
      },{
        title: 'Chashu-Men',
        restaurant: restaurant[10],
        description: 'Rich and creamy Broth, best Chashu Pork in London',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/ae/c4/e9/shiro-chashumen.jpg'
      },{
        title: 'Moules frites',
        restaurant: restaurant[11],
        description: 'Mussels in white wine sauce',
        image: 'http://ot-foodspotting-production.s3.amazonaws.com/reviews/5027417/thumb_600.jpg?1412184010'
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
