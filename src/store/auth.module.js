import Cookies from 'js-cookie';

const user = Cookies.get('token') || '';
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    logout({ commit }) {
      commit('logout');
    },
  },
  mutations: {
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      Cookies.remove('token');
    },
  }
};
