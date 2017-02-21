export default class <%= classname %> {
  constructor(configuration = null) {
    const defaultConfiguration = {
      dataAttribute: 'data-<%= name %>',
      initializedDataAttribute: 'data-<%= name %>-initialized',
      defaultDomScope: document.body,
    };

    this.configuration = defaultConfiguration;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }
    
    if (!this.configuration.dataAttribute.startsWith('data-')) {
      throw new Error('configuration dataAttribute must start with "data-".');
    }
  }

  init(domScope = this.configuration.defaultDomScope) {
    if (!domScope) {
      throw new Error('domScope must be provided.');
    }

    const items = [...domScope.querySelectorAll(`[${this.configuration.dataAttribute}]`)];
    items.forEach(i => this.create(i));

    return this;
  }

  create(element) {
    if (!element) {
      throw new Error('element must be provided.');
    }

    /* Element Setup */

    element.setAttribute(this.configuration.initializedDataAttribute, true);

    return this;
  }

  //Template content polyfill for IE
  templateContent(template) {
    if("content" in document.createElement("template")) {
        return document.importNode(template.content, true);
    } else {
        var fragment = document.createDocumentFragment();
        var children = template.childNodes;
        for (let i = 0; i < children.length; i++) {
            fragment.appendChild(children[i].cloneNode(true));
        }
        return fragment;
    }
  }

}