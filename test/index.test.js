var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('Rim ES6 component generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(
      path.join(__dirname, 'temp'),
      (function(err) {
        if (err) {
          return done(err);
        }

        this.app = helpers.createGenerator('rim-es6-component', [
          '../../generators/app'
        ]);
        helpers.mockPrompt(this.app, {
          name: 'test-app',
          withFetch: 'No'
        });
        this.app.options['skip-install'] = true;
        this.app.run(done);
      }).bind(this)
    );
  });

  it('creates expected config files', function () {
    var expected = [
      'test-app/.editorconfig',
      'test-app/.gitignore',
      'test-app/.eslintrc',
      'test-app/.babelrc',
      'test-app/package.json',
      'test-app/build.cmd',
      'test-app/README.md',
      'test-app/webpack.config.js'
    ];

    assert.file(expected);

  });

  it('creates expected source files', function() {
    var expected = [
      'test-app/src/test-app.js',
      'test-app/test/test-app.test.js'
    ];


    assert.file(expected);

  });

});
