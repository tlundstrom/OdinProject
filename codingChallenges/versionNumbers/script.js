const compareVersion = (version1, version2) => {
  version1Array = version1.split(".");
  version2Array = version2.split(".");

  const length = Math.max(version1Array.length, version2Array.length);

  for (let i = 0; i < length; i++) {
    let num1 = parseInt(version1Array[i]) || 0;
    let num2 = parseInt(version2Array[i]) || 0;

    if (num1 === num2) continue;

    return num1 > num2 ? 1 : -1;
  }

  return 0;
};
