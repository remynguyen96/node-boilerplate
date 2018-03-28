/* eslint-disable */
// @flow
interface Person {
  name: string;
  age: number;
  beauty?: boolean;
};
const arrStr: Array<string> = ['aa1', 'bb2', 'cc3', 'dd4', 'ee5'];
// const arrStr: Array<string> = ['aa1', 'bb2', 'cc3', 'dd4', 'ee5'];
const arrNum: (?number)[] = [1, 2, 3, 4, 5];
let person: Person;
person = {
  name: "Remy",
  age: 22
};


const part1 = (): string => {
  const scope = (name: string, value: number): * => {
    let balance: number = value;
    return {
      plus(income: number) {
        balance += income;
      },
      abstract(outcome: number) {
        balance -= outcome;
      },
      view(): string {
        return `This is ${name} with money have is ${balance} !`;
      }
    };
  };
  const testScope = scope('Remy', 10);
  testScope.plus(10);
  testScope.abstract(5);
  testScope.view();
  return testScope;
};

const part2 = (): * => {
  const votes = [
    'AngularJS',
    'VueJS',
    'ReactJS',
    'ReactJS',
    'Ember',
    'AngularJS',
    'AngularJS',
    'ReactJS',
    'VueJS',
    'ReactJS',
    'ReactJ'
  ];
  const initialValue = {};
  const reducers = (tally, vote) => {
    if (!tally[vote]) {
      tally[vote] = 1;
    } else {
      tally[vote] += 1;
    }
    return tally;
  };
  return votes.reduce(reducers, initialValue);
};

const part3 = (): any => {
  const data = [
    { team: "Team 1", name: "Remy 1" },
    { team: "Team 2", name: "Chau Nguyen" },
    { team: "Team 3", name: "Remy 2" },
    { team: "Team 4", name: "Remy 3" },
    { team: "Team 5", name: "Remy 4" },
    { team: "Team 6", name: "Chau Nguyen" },
    { team: "Team 7", name: "Remy 6" },
    { team: "Team 8", name: "Remy Nguyen" },
    { team: "Team 9", name: "Remy 7" },
    { team: "Team 10", name: "Chau Nguyen" },
    { team: "Team 11", name: "Remy 8" },
    { team: "Team 12", name: "Remy 9" },
    { team: "Team 13", name: "Remy Nguyen" },
    { team: "Team 14", name: "Remy 10" }
  ];
  const objName = {};
  return data.map((item) => {
    const { name, team } = item;
    if (objName[name]) {
      objName[name] = objName[name].concat(team);
    } else {
      objName[name] = [team];
    }
    return { team: objName[name], name };
  }).map((infoData) => {
    const { name } = infoData;
    let resultTeam;
    if (objName[name]) {
      resultTeam = objName[name];
      delete objName[name];
    }
    return { team: resultTeam, name };
  }).filter((result) => (result.team !== undefined ? result : ""));
};

const part = (): * => {
  const Allmembers = [
    { name: "DungLT", team: null },
    { name: "Tung", team: "DungLT" },
    { name: "Tan", team: "DungLT" },
    { name: "Khanh", team: "Tung" },
    { name: "Chi", team: "Khoi" },
    { name: "DungTC", team: "Tan" },
    { name: "Khoi", team: null },
    { name: "Tuong", team: "Tung" },
    { name: "Duoc", team: "Khoi" },
    { name: "Toan", team: "Duoc" },
    { name: "Thien", team: "Toan" }
  ];

  const recursive = (name) => {
    const results = {};
    Allmembers
      .filter((item) => item.team === name)
      .forEach((item) => {
        results[item.name] = recursive(item.name);
      });
    return results;
  };

  const recursive2 = (name) => (
    Allmembers
      .filter((item) => item.team === name)
      .reduce((results, item) => {
        results[item.name] = recursive2(item.name);
        return results;
      }, {}));
  const result = JSON.stringify(recursive2(null), null, 2);
  return result;
};

const part4 = (): * => {
  const languages = ["Javascript", "Ruby", "Golang", "Java", "Kotlin", "Python"];
  const normalize = (lang) => lang.trim().toLowerCase();
  const objLang = Object.create(null);
  languages.forEach((lang) => {
    objLang[normalize(lang)] = 1;
  });
  const getLanguages = (input) => (
    input.reduce((arrLang, lang) => {
      const key = normalize(lang);
      if (objLang[key]) {
        arrLang.push(key);
      }
      return arrLang;
    }, [])
  );
  return getLanguages(["JAVASCRIPT", "C++", "PYthon", "PHP"]);
};

export const sortAlgorithm = (arrNumber: Array<number>): Array<number> => {
  if (arrNumber.length === 0) {
    return [];
  }
  const arrLeft = [];
  const arrRight = [];
  const pivot = arrNumber[0];
  let i = 1;
  while (i < arrNumber.length) {
    if (arrNumber[i] < pivot) {
      arrLeft.push(arrNumber[i]);
    } else {
      arrRight.push(arrNumber[i]);
    }
    i++;
  }
  return sortAlgorithm(arrLeft).concat(pivot, sortAlgorithm(arrRight));
};
// const arrTest = [];
// Array.from({ length: 10 }).forEach((_, index) => {
//     arrTest[index] = Math.floor((Math.random() * 100) + 10);
// });
// console.log(arrTest);
// console.log('==========');
// console.log(sortAlgorithm(arrTest));

// let runFunction = 1;
const merge = (left: Array<number>, right: Array<number>): Array<number> => {
  // console.log('merge', runFunction);
  const result: Array<number> = [];
  const leftLength = left.length;
  const rightLength = right.length;
  let l = 0;
  let r = 0;
  while (l < leftLength && r < rightLength) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }
  // console.log('result', result);
  // console.log(`l---${l}`, left);
  // console.log(`r---${r}`, right);
  // console.log('result', result
  //     .concat(left.slice(l)
  //         .concat(right.slice(r))));
  // console.log('********************');
  return result.concat(left.slice(l).concat(right.slice(r)));
};

export const mergeSort = (arr: Array<number>): Array<number> => {
  // console.log('mergeSort: ', `${runFunction}---------${arr}`);
  const { length } = arr;
  if (length < 2) return arr;
  const mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid);
  // console.log('mid', mid);
  // console.log('left', left);
  // console.log('right', right);
  // console.log('------------------------');
  // runFunction++;
  return merge(mergeSort(left), mergeSort(right));
};
// const arrTest2 = [6, 4, 1, 3, 5, 9, 7, 2, 8];
// mergeSort(arrTest2);


const hashMap = (languages, inputSearch) => {
  // const languages = ["c++", "java", "javascript", "ruby", "rust", "golang"];
  const nomalize = text => text.trim().toLowerCase();
  // method 1 ( no recommend)
  // return languages.filter((lang) => {
  //   return !(inputSearch.findIndex(search => nomalize(search) === nomalize(lang)) === -1);
  // })

  // method 2 ( encourage usage   )
  const languagesLookup = Object.create(null);
  languages.forEach(lang => (languagesLookup[nomalize(lang)] = 1));
   return inputSearch.reduce((array, lang) => {
      let key = nomalize(lang);
      if (languagesLookup[key]) {
        array.push(key);
      }
      return array;
   }, []);
};
const languages = ["c++", "java", "javascript", "ruby", "rust", "golang"];
// console.log(hashMap(languages, ['JAVA', 'JAVAsCRipT']));


const JSONMenu = [
  {
    "name": "Electronics",
    "items": ["Laptop", "Headphones"]
  },
  {
    "name": "Headphones",
    "items": ["Shure", "Bose", "JLB"]
  },
  {
    "name": "Cars",
    "items": ["SUV", "Sedan", "Sports"]
  },
  {
    "name": "SUV",
    "items": ["Honda", "Ferrari"]
  },
  {
    "name": "Laptop",
    "items": ["Thinkpad"]
  }
];
// result
// |- Electronics
// |    |- Headphones
// |    |   |- Shure
// |    |   |- Bose
// |    |   |- JLB
// |    |- Laptop
// |    |   |- Thinkpad
// |- Cars
// |    |- SUV
// |    |   |- Honda
// |    |   |- Ferrari
// |    |- Sedan
// |    |- Sports

const buildTree = (nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].items.length; j++) {
      const node = nodes[i].items[j];
      const found = nodes.find(item => item.name === node);
      if (found) {
        nodes[i].items[j] = Object.assign({}, found);
        found.removed = true;
      } else {
        nodes[i].items[j] = {
          name: node,
          items: [],
        }
      }
    }
  }

  return nodes.reduce((arr, item) => {
    if (!item.removed) {
      arr.push(item);
    }
    return arr;
  }, [])
};

const result = buildTree(JSONMenu);
// console.log(JSON.stringify(result, null, '  '));


// export class Logger extends EventEmitter {
//   log(message) {
//     console.log(message);
//     this.emit("messageLogged", { id: 5, url: "http://" });
//   }
// }




