export const registerMongooseSchemas = () => {
  require('./client').registerSchema()
  require('./facility-attribute-value').registerSchema()
  require('./facility-attributes').registerSchema()
  require('./facilities').registerSchema()
}
