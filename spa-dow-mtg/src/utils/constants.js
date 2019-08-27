import * as SystemConstantsDev from './constants.development';
import * as SystemConstantsPro from './constants.production';

const ENVIRONMENT = window.location.href.indexOf("localhost") > -1 ? 'development' : 'production';

const SystemConstants = ENVIRONMENT === 'development' ? SystemConstantsDev : SystemConstantsPro;

export default {
  SystemConstants,
  ENVIRONMENT,
};
