const MODULE_PATH = __dirname;

module.exports = {
  globals: {
    MODULE_PATH,
    DATAMAPPER_PATH: MODULE_PATH + '/data-mappers',
  },
  testRegex: '(/tests/.*|(\\.|/)(specs))\\.js$',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
