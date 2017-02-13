const uuid = require('uuid');

const tokens = {
  // id: { id, token, expiredAt },
};

module.exports = {
  generateToken: (id) => {
    const token = uuid();
    const expiredAt = new Date().getTime() + (60 * 60 * 1000);
    tokens[id] = {
      id,
      token,
      expiredAt,
    };
  },
  getIDFromToken: (token) => {
    const findedTokenData = Object.keys(tokens).find((key) => {
      const tokenData = tokens[key];
      return tokenData.token === token && tokenData.expiredAt >= new Date().getTime();
    });
    if (findedTokenData) {
      return findedTokenData.id;
    }
    return null;
  },
  /*getTokenFromID: (id) => {
    const tokenData = tokens[id];
    if (tokenData) {
      return tokenData.token;
    }
    return null;
  },*/
  // TODO expiredAt 늘려주는 함수 만들기.
};
