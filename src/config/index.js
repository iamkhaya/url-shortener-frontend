/** @constant
    @type {object}
    @default
*/
const config = {
  production: {
    api: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8000,
    },
  },
  development: {
    api: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8000,
    },
  },
  staging: {
    api: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 8000,
    },
  },
};

/**
 * Get env based configuration
 * @constructor
 * @returns {configuration}
 */
export default function getConfig() {
  const environment = process.env.NODE_ENV;

  if (['production', 'development', 'staging'].includes(environment)) {
    const configuration = config[environment];
    return configuration;
  }
  throw new Error(`invalid value for NODE_ENV: ${environment}`);
}
