'use strict'

const config = {
  test: {
    server: {
      host: 'localhost',
      urlPrefix: '/',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    }
  },

  development: {
    server: {
      host: 'localhost',
      urlPrefix: '/noc',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    }
  },

  production: {
    server: {
      host: 'localhost',
      urlPrefix: '/noc',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
