# RimDev ES6 component generator
![npm version](https://img.shields.io/npm/v/generator-rim-es6-component.svg)
![npm downloads](https://img.shields.io/npm/dt/generator-rim-es6-component.svg)

Install the generator and yeoman via NPM

```
npm install -g yeoman-generator generator-rim-es6-component
```

Run the generator, move into the directory, and start the project. The generator will automatically install your dependencies unless you choose to skip it (`--skip-install`). You may choose to use yarn instead of npm for the installation by using the `--yarn` argument.

```
yo rim-es6-component [app-name] [--yarn] [--skip-install]
cd [app-name]
npm start
```

If you navigate to `/src/[app-name].js`, you'll find your component class. There will be a commented section: `/* Implement Component Logic Here Via tmpClone */`, where you can start your component.

If you are having issues please refer to our [blog post](https://rimdev.io/the-component-life-creating-reusable-web-components/)