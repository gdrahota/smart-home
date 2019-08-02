'use strict'

const config = {
  test: {
    server: {
      host: 'localhost',
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://127.0.0.1:27017/smart-home',
      options: {
        useNewUrlParser: true
      }
    },
    oplog: {
      url: 'mongodb://127.0.0.1:27017',
      collection: 'local/oplog.$main'
    }
  },

  development: {
    server: {
      port: 3000
    },
    mongoDb: {
      url: 'mongodb://docker.for.mac.localhost:27017,docker.for.mac.localhost:27018,docker.for.mac.localhost:27019/smart-home?replicaSet=rs0',
      options: {
        useNewUrlParser: true
      },
      oplog: {
        url: 'mongodb://docker.for.mac.localhost:27017/local',
        collection: 'oplog.rs'
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
