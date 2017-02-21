var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your component name in snake-case (e.g. my-component-name)',
      default: 'my-component'
    }]).then((answers) => {
      this.name = answers.name;
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
    //package.json copy
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { name: this.name }
    );
    //babelrc copy
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    //editor config
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
    //eslintrc copy
    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    //build.cmd copy
    this.fs.copy(
      this.templatePath('build.cmd'),
      this.destinationPath('build.cmd')
    );
    //README.md copy
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { name: this.name }
    );
    //Webpack config copy
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      { name: this.name, filename: this.name, classname: this.classname }
    );
    //Copy Src
    this.fs.copyTpl(
      this.templatePath('name.js'),
      this.destinationPath(`src/${this.name}.js`),
      { name: this.name, classname: this.classname }
    );
    //Copy index
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { title: this.title, classname: this.classname, name: this.name }
    );
  }

}