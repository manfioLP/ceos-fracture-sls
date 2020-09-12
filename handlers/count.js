'use strict';

const { connectToDatabase } = require('../db');
const { ExposedFracture } = require('../db/models');

const count = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      ExposedFracture.count({}, (err, result) => {
          console.log(result);
          let response;
          if (err) {
            response = {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({msg:'Could not count the fracture.', err})
              }
          } else {
              response = {
                statusCode: 200,
                body: JSON.stringify(result),
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                }
              }
          }
          callback(null, response);
      })
    });
};

module.exports = {
  count
};
