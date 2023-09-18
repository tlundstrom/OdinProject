const validateIP = (queryIP) => {
  const isIpv4 = () => {
    if (queryIP.includes(".") && queryIP.includes(":")) return "Neither";
    return queryIP.includes(".") ? true : false;
  };

  const testIpv4 = () => {
    const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    return ipv4Regex.test(queryIP) ? "IPv4" : "Neither";
  };

  const testIpv6 = () => {
    const ipv6Regex = /^((([0-9A-Fa-f]{1,4}:){1,6}:)|(([0-9A-Fa-f]{1,4}:){7}))([0-9A-Fa-f]{1,4})$/;
    return ipv6Regex.test(queryIP) ? "IPv6" : "Neither";
  };

  return isIpv4() ? testIpv4() : testIpv6();
};

