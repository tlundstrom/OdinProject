const paths = ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"];
var findDuplicate = function (paths) {
  const fileMap = new Map();

  for (const path of paths) {
    for (let i = 0, [directory, ...files] = path.split(" "); i < files.length; i++) {
      const openParen = files[i].indexOf("(");
      const closeParen = files[i].indexOf(")");
      const textContent = files[i].slice(openParen + 1, closeParen);
      const fileName = files[i].slice(0, openParen);
      if (fileMap.has(textContent)) {
        let filesList = fileMap.get(textContent) ?? [];
        filesList.push(directory + "/" + fileName);
        fileMap.set(textContent, filesList);
      } else {
        fileMap.set(textContent, [directory + "/" + fileName]);
      }
    }
  }
  return [...fileMap.values()].filter((val) => val.length > 1);
};

console.log(findDuplicate(paths));
