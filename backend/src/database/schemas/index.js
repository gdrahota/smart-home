export const registerMongooseSchemas = () => {
  require('./client').registerSchema()
  require('./command-queue').registerSchema()
  require('./controls').registerSchema()
  require('./control-system').registerSchema()
  require('./control-data-points').registerSchema()
  require('./data-points').registerSchema()
  require('./facility-attribute-values').registerSchema()
  require('./facility-attributes').registerSchema()
  require('./facilities').registerSchema()
  require('./knx-events').registerSchema()
  require('./schedules').registerSchema()
  require('./values-from-knx').registerSchema()
}
