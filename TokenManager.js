const uuid = require('uuid');

const tokenData = {
  // id: { id, token, expiredAt }, // id와 id는 같다, id의 정보들을 id를 검색하면 알수 있도록 만들어논것임
};

module.exports = {

  log() {
    return tokenData;
  },

  generateTokenData(id) {
    const token = uuid();
    const expiredAt = new Date().getTime() + (60 * 60 * 1000);
    tokenData[id] = {
      id,
      token,
      expiredAt,
    };
    return tokenData;
    // tokenData[id].token === token 이유는 멀까?
    // key: value 둘다 값이 같을 때에는 key 하나만 쓴다.
    // console.log('원래 장소?      ', tokenData[id].token);
    // console.log(token);
  },

  getIDFromToken(token) {
    // 상훈 코드
    // let output;
    // Object.keys(tokenData).forEach((key) => {
    //   const data = tokenData[key];
    //   if (data.token === token) {
    //     console.log(data.id);
    //     output = data.id;
    //   }
    // });
    // return output;


    // 남세 코드
    const findId = Object.keys(tokenData).find((key) => { // object를 array처럼 사용하기 위해서 Object.keys 사용
      const data = tokenData[key]; // data는 tokenData의 id의 value값에 있는 object안의 key값을 의미한다.
    return data.token === token && data.expiredAt >= new Date().getTime(); // data.token은 token의 value값을 의마한다.
    });

    return findId;

    /*----------------------------------------
      ## find vs forEach
      ----------------------------------------
        # 공통점
          배열내에서 특정한 함수를 실행한다.
          arr.forEach(callback, [, this Arg])
          arr.find(callback, [, this Arg])
          callback에는 (currentValue || element, index, array)

        # find
          해당 배열 안의 값을 하나 반환한다.
          배열의 각 요소에 대해서 콜백함수가 true를 반환할 때까지 실행을 시킨다.
          만약 어떤 값에서 true를 반환한다면, 그 즉시 해당 요소의 값을 리턴한다.
          배열의 요소 모두를 찾은 후, 만족하는 값이 없으면 undefined을 리턴한다.

        # forEach
          오름차순(순서대로) 배열에 있는 요소들에 대하여 제공한 콜백함수를 한번씩 실행한다.
          for와 다른점은, 배열을 돌고 있는 동안에 밖으로 빠져나갈 수 없다는 점이다.
          그말은, for 루프는 내가 조작해서 반복문을 제어할 수 있지만, forEach는 그 사용이 간편해보여도,
          조작하기에는 어려운 점이 있다는 것이다.

        # forEach를 사용하면, 결과값을 바로 리턴할 수 없기 때문에, 따로 변수를 만들어서
          그 변수에 리턴값을 넣어주고, forEach구문을 빠져나와서 변수를 리턴해야 한다.
          그렇기 때문에, 이런 경우에는 원하는 값을 바로 리턴해주는 find를 사용한다.

        # 추가로 공부할 것
          map, reduce 도 위와 비슷한 기능을 하는데 서로 차이가 있다. 추후과제로 남겨논다.
    */
  },

  // TODO expiredAt 늘려주는 함수 만들기.

  // extendExpiredAt(token, time) {
    // let temp;
    // const target = module.exports.getIDFromToken(token);
    // console.log(target);
    // for (let key in tokenData) {
    //   const data = tokenData[key];
    //   console.log(data);
    //   if (target === data){
    //     temp = data.expiredAt;
    //     console.log(temp);
    //   }
    // }
    // console.log(temp);
  // },
};

// const token = module.exports.generateToken(3);
//
// console.log('generate       :', token);
// console.log('getID           :', module.exports.getIDFromToken(token));
// console.log('extend           :', module.exports.extendExpiredAt(expiredAt, 60));
