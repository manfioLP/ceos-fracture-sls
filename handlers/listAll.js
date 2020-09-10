'use strict';

const { connectToDatabase } = require('../db');
const { ExposedFracture } = require('../db/models');

const listAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log('performing operation [LIST ALL]');

  connectToDatabase()
    .then(() => {
      ExposedFracture.find()
        .then(fractures => {
          const response = {
            data: fractures
          };
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(response),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }
          })
        })
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({msg:'Could not fetch ALL fractures to export.', err})
        }))
    });
};

module.exports = {
  listAll
};
