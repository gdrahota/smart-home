export const registerMongooseSchemas = () => {
  require('./client').registerSchema()
  require('./facility-attribute-values').registerSchema()
  require('./facility-attributes').registerSchema()
  require('./facilities').registerSchema()
  require('./controls').registerSchema()
}
