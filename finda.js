// // Using the language of your choice, write a function that takes as input a JSON string
// // representing an array of objects,and returns a description of the data format.
// // Write one or more new test inputs.  Provide the function, the test inputs,
// // and the corresponding test outputs.
//
// // SAMPLE INPUT
// const input = [{
//   name: 'Douglas Crawford',
//   salary: 80000,
//   address: {
//     line1: 'c/o Unstructured Programmers Anonymous',
//     line2: '7723 Western Avenue',
//     city: 'San Francisco',
//     state: 'CA',
//     zip: '9123',
//   },
// },
// {
//   name: 'Brian Kernighan',
//   salary: 60000,
//   address: {
//     line1: 'PO BOX 455',
//     city: 'Princeton',
//     state: 'NJ',
//     zip: '08544',
//   },
// }];
//
//
//
// const address = {};
//  address.attribute = [];
//  address.attribute[0] = {};
//  address.attribute[0].line="contenttype";
//  address.attribute[0].city="Content type";
//  address.attribute[0].state = {};
//
// console.log(address);
//
//
// /*
//   TODO
// */
// //
// //
// // const inputToJson = JSON.stringify(input);
// // const inputToJsonSplit = inputToJson.split(',');
// // const convertFunc = (inputToJsonSplit) => {
// //   if (inputToJsonSplit.indexOf('[{' && ']}' )) {
// //     return 1;
// //   }
// // }
// // // console.log(typeof inputToJson)
// // console.log(inputToJsonSplit);
// //   // const inputToJson = (input) => {
// //   //
// //   // }
// // console.log(convertFunc(inputToJson));
// // console.log(inputToJson);
//
// // SAMPLE OUTPUT (you choose the format.
// // This implementer chose to use TypeScript's interface format, augmenting with comments.)
//
// // interface inferredJSONFormat {
// //     name: string,
// //     salary: number,
// //     address: IAddress,
// // }
// // interface IAddress {
// //     line1: string,
// //     line2?: string,
// //     city: string,
// //     state: string, // 2 characters
// //     zip: string, // nu
//
// //
// // /*
// //   TODO stringify
// //   1. name, salary 만 타입 검사를 해보자
// //   2. 리턴할 때는, key: type 으로 나와야한다
// //   3. key를 따로 지정할 수 있을까?
// //   4. 어떤식으로 json파일을 분류할 수있을까
// // */
// // const inputToJson = JSON.stringify(input);
// // // const pureInputToJson = inputToJson.replace(/\"/g,'');
// // const inputToJsonArray = pureInputToJson.split(',');
// //
// // let result = 0;
// //
// // for (let i = 0; i < inputToJsonArray.length; i += 1) {
// //   const checkString = 'z';
// //   if (inputToJsonArray[i].indexOf(checkString)) {
// //     result += 1;
// //   }
// // }
// //
// // console.log(pureInputToJson);
// // console.log(result);
// // console.log(inputToJson);
// // console.log(inputToJsonArray[3]);
