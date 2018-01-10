import _ from 'lodash';

const renderVisual = (ast, indent = 2) => {
  const getIndent = spaces => ' '.repeat(spaces * (indent + 1)); // add one space for sign
  const renderTree = (tree, tab = 0) => {
    const renderObject = (obj, tabs) => {
      const objectString = _.keys(obj).map(key =>
        [`   ${key}: `, _.isObject(obj[key]) ? renderObject(obj[key], `${tabs + 1}`) : `${obj[key]}`].join(''));
      return (['{', ...objectString, '}']).join(`\n${getIndent(tabs)}`);
    };

    const renderNode = (nodeKey, nodeValue, prefix = ' ') => ([
      `${getIndent(tab)} ${prefix} ${nodeKey}: `,
      _.isObject(nodeValue) ? `${renderObject(nodeValue, tab + 1)}` : nodeValue,
    ].join(''));

    const selectVisualizeFn = {
      changed: node => [renderNode(node.name, node.befor, '-'), renderNode(node.name, node.after, '+')].join('\n'),
      removed: node => renderNode(node.name, node.befor, '-'),
      added: node => renderNode(node.name, node.after, '+'),
      unchanged: node => renderNode(node.name, node.befor),
      nested: node => renderNode(node.name, renderTree(node.value, tab + 1), ' '),
    };

    const resultArr = tree.map((node) => {
      const visualizeFn = selectVisualizeFn[node.type];
      return visualizeFn(node);
    });
    return ['{', ...resultArr, `${getIndent(tab)}}`].join('\n');
  };
  return renderTree(ast);
};

const renderPlain = (ast, parents = []) => {
  const selectVisualizeFn = {
    unchanged: () => '',
    removed: (node, fullName) => `Property '${fullName}' was removed\n`,
    changed: (node, fullName) => `Property '${fullName}' was updated. From '${node.befor}' to '${node.after}'\n`,
    added: (node, fullName) => `Property '${fullName}' was added with ${_.isObject(node.after) ?
      'complex value\n' : `value: ${node.after}\n`}`,
    nested: node => renderPlain(node.value, [...parents, node.name]),
  };
  return _.reduce(ast, (acc, node) => {
    const fullName = [...parents, node.name].join('.');
    const nodeToStringFn = selectVisualizeFn[node.type];
    return [...acc, nodeToStringFn(node, fullName)];
  }, []).join('');
};
const rendersType = {
  plain: renderPlain,
  visual: renderVisual,
};
export default type => rendersType[type];
