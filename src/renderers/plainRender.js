import _ from 'lodash';

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
export default renderPlain;
