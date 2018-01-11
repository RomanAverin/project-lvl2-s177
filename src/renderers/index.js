import renderVisual from './visualRender';
import renderPlain from './plainRender';

const renders = {
  plain: renderPlain,
  visual: renderVisual,
};
export default type => renders[type];
