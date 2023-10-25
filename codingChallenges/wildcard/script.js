const s =
  "abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb";
const p = "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb";

const isMatch = (s, p) => {
  const removeDupes = (p) => {
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
  const trimmedString = removeDupes(p);
  console.log(trimmedString);
  const regexPattern = new RegExp("^" + trimmedString.replace(/\?/g, ".").replace(/\*/g, ".*") + "$");

  return regexPattern.test(s);
};

console.log(isMatch(s, p));
