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
export default renderVisual;
