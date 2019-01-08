'use strict'

const config = {
  test: {},

  development: {
    client: {
      base: '/'
    },
    server: {
      host: 'http://192.168.43.90',
      port: '3000'
    }
  },

  production: {
    client: {
      base: '/'
    },
    server: {
      host: 'http://localhost',
      port: '3000'
    }
  }
};

let environment = 'development';

module.exports = config[environment];
