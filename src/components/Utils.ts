function isPresent(obj: any): boolean {
  return ((obj !== null && obj !== undefined) ||
          Array.isArray(obj) && isEmpty(obj))
}

function isEmpty(ary: any[]): boolean {
  return !(ary.length > 0)
}


// function isExistDir(target) {
// for (let i = 0; i <= target.length - 1; i++)  {
//     if (directory[target[i]] === undefined) {
//         return false;
//     }
// }
// return true;
// }

export {
  isPresent,
  // isExistDir
};
