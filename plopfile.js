module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Scaffold a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the component name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/component/index.js.hbs',
      },
    ],
  });

  plop.setGenerator('route', {
    description: 'Scaffold a route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the route name:',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Enter the route path:',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: 'src/routes/routes.config.js',
        pattern: /(\/\* PLOP-PLACEHOLDER-ROUTES-CONFIG-INJECT \*\/)/gi,
        templateFile: 'plop-templates/routes/routes.config.js.hbs',
      },
      `Modify your route details in: src/routes/routes.config.js`,
    ],
  });

  plop.setGenerator('container', {
    description: 'Scaffold a container',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the container name:',
      },
      {
        type: 'input',
        name: 'storeName',
        message: 'Enter the store name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/containers/{{pascalCase name}}/tests/index.test.js',
        templateFile: 'plop-templates/container/tests/index.test.js.hbs',
      },
      {
        type: 'add',
        path: 'src/containers/{{pascalCase name}}/index.js',
        templateFile: 'plop-templates/container/index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/containers/{{pascalCase name}}/routines.js',
        templateFile: 'plop-templates/container/routines.js.hbs',
      },

      {
        type: 'add',
        path: 'src/containers/{{pascalCase name}}/reducer.js',
        templateFile: 'plop-templates/container/reducer.js.hbs',
      },
      {
        type: 'modify',
        path: 'src/store/reducers.js',
        pattern: /(\/\* PLOP-PLACEHOLDER-REDUCER-IMPORT \*\/)/gi,
        template:
          "import {{camelCase name}} from 'containers/{{ pascalCase name}}/reducer';\n$1",
      },
      {
        type: 'modify',
        path: 'src/store/reducers.js',
        pattern: /(\/\* PLOP-PLACEHOLDER-REDUCER-INJECT \*\/)/gi,
        template: '{{camelCase storeName}}: {{camelCase name}},\n\t\t$1',
      },

      {
        type: 'add',
        path: 'src/containers/{{pascalCase name}}/sagas.js',
        templateFile: 'plop-templates/container/sagas.js.hbs',
      },
      {
        type: 'modify',
        path: 'src/store/sagas.js',
        pattern: /(\/\* PLOP-PLACEHOLDER-SAGA-IMPORT \*\/)/gi,
        template:
          "import { {{camelCase name}}DataSaga } from 'containers/{{ pascalCase name}}/sagas';\n$1",
      },
      {
        type: 'modify',
        path: 'src/store/sagas.js',
        pattern: /(\/\* PLOP-PLACEHOLDER-SAGA-INJECT \*\/)/gi,
        template: '{{ camelCase name }}DataSaga,\n\t\t$1',
      },
    ],
  });
};
