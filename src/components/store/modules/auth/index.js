import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didLogout: false
    };
  },
  actions: actions,
  mutations: mutations,
  getters: getters
};
