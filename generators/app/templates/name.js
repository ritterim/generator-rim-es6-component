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

  // Initialize Component: Find all component elements  
  init(domScope = this.configuration.defaultDomScope) {
    if (!domScope) {
      throw new Error('domScope must be provided.');
    }

    const items = [...domScope.querySelectorAll(`[${this.configuration.dataAttribute}]`)];
    items.forEach(i => this.create(i));

    return this;
  }

  // Create component elements in DOM
  create(element) {
    if (!element) {
      throw new Error('element must be provided.');
    }

    // Retrieve contents from template using polyfill
    let templateContents = this.templateContent(element);
    // Clone the template
    let tmpClone = templateContents.cloneNode(true);

    /* Implement Component Logic Here Via tmpClone */

    // Insert the element back in by the template
    element.parentNode.insertBefore(tmpClone, element.parentNode.lastChild);

    // Set the element to initialized    
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