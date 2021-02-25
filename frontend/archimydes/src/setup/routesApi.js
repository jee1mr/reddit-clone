export default {
  login: {
    path: '/api-token-auth/',
  },
  board: {
    path: '/boards/',
    list: '/boards/',
    becomeMember: (id) => `/boards/${id}/become-member/`,
    get: (id) => `/boards/${id}/`,
  },
}
