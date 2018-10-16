export const registerMongooseSchemas = () => {
  require('./client').registerSchema()
  require('./controls').registerSchema()
  require('./control-data-points').registerSchema()
  require('./data-points').registerSchema()
  require('./facility-attribute-values').registerSchema()
  require('./facility-attributes').registerSchema()
  require('./facilities').registerSchema()
}
