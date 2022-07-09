function isPresent(obj: any): boolean {
  return (obj != null && obj != undefined && obj !== [] && obj !== {})
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
