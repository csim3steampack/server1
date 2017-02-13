const uuid = require('uuid');

let tokenData = {
  // id: { id, token, expiredAt },
  id: 1,
  token: 1,
  expiredAt: 1,
};

module.exports = {

  generateToken: (id) => {
    const token = uuid();
    const expiredAt = new Date().getTime() + (60 * 60 * 1000);
    tokenData = {
      id,
      token,
      expiredAt,
    };

    return tokenData;
  },

  getIDFromToken: (token) => {
    // tokenData[Object.keys(tokenData)]; // ['id', 'token', 'expiredAt']

    if (tokenData.token === token
      && tokenData.expiredAt >= new Date().getTime()) {
      return tokenData.id;
    }

    return null;
  },
};
      //
      // const tokenData = tokenData[key];
      // return tokenData.token === token
      //     && tokenData.expiredAt >= new Date().getTime();
    // });
  //
  //   console.log('머니머니        ', findedTokenData);
  //   if (findedTokenData) {
  //     return findedTokenData.id;
  //   }
  //   return null;
  // },
  /* getTokenFromID: (id) => {
    const tokenData = tokenData[id];
    if (tokenData) {
      return tokenData.token;
    }
    return null;
  },*/
  // TODO expiredAt 늘려주는 함수 만들기.
// };
