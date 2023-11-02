const s =
  "abbbaaababbaaabaaabbbabbbbaaabbaaababaabbbbbbaababbabababbababaaabbbbbabababaababaaaaaaabbbaabaabbbaabbabaababbabaababbbabbaaabbbaaaababbaaabbaabaabbbbbaaababaabaabaaabbabaabbbabbbaabbababaabbbbbbbbaaa";
const p = "*ba***bba*b**abbaa***a*****b*a*bb*b***a*bbb***a***bba*****a****a*a*b**aaaba*aab*a*aa***a*a*b**b**a*b*";

// const isMatch = (s, p) => {
//   const removeDupes = (p) => {
//     let pArr = p.split("");
//     let indices = [];
//     for (let i = 0; i < p.length; i++) {
//       if (pArr[i] === "*" && pArr[i + 1] === "*") {
//         indices.push(i);
//       }
//     }
//     for (let i = 0; i < indices.length; i++) {
//       pArr[indices[i]] = null;
//     }
//     return pArr.filter((p) => p !== null).join("");
//   };
//   const longestSub = (p) => {
//     let pArray = p.split("");
//     const length = p.length - 1;
//     let beg = null,
//       end = null,
//       index = 0,
//       substrings = [];
//     for (let i = 0; i < length; i++) {
//       if ((pArray[i] === "*" || pArray[i] === "?") && (pArray[i + 1] !== "*" || pArray[i + 1] !== "?")) {
//         beg = [i + 1];
//       } else if ((pArray[i] !== "*" || pArray !== "?") && (pArray[i + 1] === "*" || pArray[i + 1] === "?")) {
//         end = [i + 1];
//       }
//       if (beg && end) {
//         substrings[index] = p.substring(beg, end);
//         if (substrings[index] === "?" || substrings[index] === "*") {
//           substrings.pop();
//         } else {
//           index++;
//         }

//         beg = null;
//         end = null;
//       }
//     }
//     return substrings ? substrings.filter((e) => e !== "") : substrings;
//   };
//   const checkSubstrings = (substrings) => {
//     for (let i = 0; i < substrings.length; i++) {
//       if (!s.includes(substrings[i])) return false;
//     }
//     return true;
//   };

//   const trimmedString = removeDupes(p);
//   const substrings = longestSub(trimmedString);
//   console.log(substrings)
//   if (substrings.length > 0 && !checkSubstrings(substrings)) return false;
//   const regexPattern = new RegExp("^" + trimmedString.replace(/\?/g, ".").replace(/\*/g, ".*") + "$");

//   return regexPattern.test(s);
// };

const isMatch = function (s, p) {
  const removeAdjacentStars = (p) => {
    let pArr = p.split("");
    let indices = [];
    for (let i = 0; i < p.length; i++) {
      if (pArr[i] === "*" && pArr[i + 1] === "*") {
        indices.push(i);
      }
    }
    for (let i = 0; i < indices.length; i++) {
      pArr[indices[i]] = null;
    }
    return pArr.filter((p) => p !== null).join("");
  };
  p = removeAdjacentStars(p);

  let sIndex = 0,
    pIndex = 0;
  let sTemp, pTemp;

  while (sIndex < s.length) {
    if (s[sIndex] === p[pIndex] || p[pIndex] === "?") {
      sIndex++;
      pIndex++;
    } else if (p[pIndex] === "*") {
      sTemp = sIndex;
      pTemp = pIndex;
      pIndex++;
    } else {
      if (pTemp == null) {
        return false;
      } else {
        sIndex = sTemp + 1;
        pIndex = pTemp + 1;
        sTemp = sIndex;
      }
    }
  }

  for (let i = pIndex; i < p.length; i++) {
    if (p[i] !== "*") return false;
  }
  return true;
};

console.log(isMatch(s, p));
