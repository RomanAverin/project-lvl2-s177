import renderVisual from './visualRender';
import renderPlain from './plainRender';
import renderJSON from './jsonRender';

const renders = {
  plain: renderPlain,
  visual: renderVisual,
  json: renderJSON,
};
export default type => renders[type];
