'use strict'

const config = {
  test: {
    server: {
      host: 'localhost',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    },
    oplog: {
      url: 'mongodb://localhost:27017',
      collection: 'local/oplog.$main'
    }
  },

  development: {
    server: {
      host: '192.168.0.39',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      },
      oplog: {
        url: 'mongodb://localhost:27017/local',
        collection: 'oplog.$main'
      }
    }
  },

  production: {
    server: {
      host: 'localhost',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://localhost:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    },
    oplog: {
      url: 'mongodb://localhost:27017',
      collection: 'local/oplog.$main'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
