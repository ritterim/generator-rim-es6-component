var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', { type: String, required: false });

    this.log(this.options.appname);
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your component name in snake-case (e.g. my-component-name)',
      default: (this.options.appname) ? this.options.appname : 'my-component'
    }]).then((answers) => {
      this.name = answers.name;
      this.dest = answers.name;
      const find = /(\-\w)/g;
      const convertCamel = function (matches) {
        return matches[1].toUpperCase();
      };
      const convertTitle = function (matches) {
        return ' ' + matches[1].toUpperCase();
      }
      let camelString = answers.name.replace(find, convertCamel);
      let titleString = answers.name.replace(find, convertTitle);
      this.title = titleString.charAt(0).toUpperCase() + titleString.substr(1);
      this.classname = camelString.charAt(0).toUpperCase() + camelString.substr(1);
      this._template();
    });
  }

  _template() {
    
    //Make directory for proj
    mkdirp.sync(this.dest);

    //package.json copy
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${this.dest}/package.json`),
      { name: this.name }
    );
    //babelrc copy
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath(`${this.dest}/.babelrc`)
    );
    //editor config
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath(`${this.dest}/.editorconfig`)
    );
    //eslintrc copy
    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath(`${this.dest}/.eslintrc`)
    );
    //build.cmd copy
    this.fs.copy(
      this.templatePath('build.cmd'),
      this.destinationPath(`${this.dest}/build.cmd`)
    );
    //gitignore copy
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(`${this.dest}/.gitignore`)
    );
    //README.md copy
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${this.dest}/README.md`),
      { name: this.name }
    );
    //Test copy
    this.fs.copyTpl(
      this.templatePath('spec.js'),
      this.destinationPath(`${this.dest}/test/${this.name}.spec.js`),
      { classname: this.classname, filename: this.name }
    );
    //Webpack config copy
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath(`${this.dest}/webpack.config.js`),
      { name: this.name, filename: this.name, classname: this.classname }
    );
    //Copy Src
    this.fs.copyTpl(
      this.templatePath('name.js'),
      this.destinationPath(`${this.dest}/src/${this.name}.js`),
      { name: this.name, classname: this.classname }
    );

    //make the demo directory
    mkdirp.sync(`${this.dest}/demo`);
    //Copy index
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`${this.dest}/demo/index.html`),
      { title: this.title, classname: this.classname, name: this.name }
    );
  }

}