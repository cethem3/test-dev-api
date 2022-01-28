'use strict';

const ctrl = require('../controller');

module.exports = function(app) {
  app.route('/').get(
      () => 'Hello!'
  );

  app.route('/calculate_route/:point_a/:point_b')
    .get(async (req, res) => {
      let {point_a, point_b} = req.params
      res.send(await ctrl.calculateRoute(point_a, point_b))
    });


  app.route('/calculate_cheap/:point_a/:point_b/:number_plate')
    .get(async (req, res) => {
      let {point_a, point_b, number_plate} = req.params
      res.send(await ctrl.calculateCheap(point_a, point_b, number_plate))
    });
};