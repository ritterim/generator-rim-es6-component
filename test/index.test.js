var path = require('path');
var helpers = require('yeoman-test');

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
        done();
      }).bind(this)
    );
  });

  it('creates expected config files', function() {
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.eslintrc',
      '.babelrc',
      'package.json',
      'build.cmd',
      'README.md',
      'webpack.config.js'
    ];

    helpers.mockPrompt(this.app, {
      name: 'test-app',
      withFetch: 'No'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected source files', function() {
    var expected = [
      'src/test-app.js',
      'test/test-app.test.js'
    ];

    helpers.mockPrompt(this.app, {
      name: 'test-app',
      withFetch: 'No'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFile(expected);
      done();
    });
  });

});
