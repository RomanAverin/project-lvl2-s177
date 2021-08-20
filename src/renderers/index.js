import renderVisual from './visualRender.js';
import renderPlain from './plainRender.js';
import renderJSON from './jsonRender.js';

const renders = {
  plain: renderPlain,
  visual: renderVisual,
  json: renderJSON,
};
export default (type) => renders[type];
