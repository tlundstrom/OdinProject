var str1 = "IloveLe3tcode!";
var str2 = "Me+You--IsMyDream";
var str3 = "1aB!";
var str4 = "ziyS5FrPQhoQ5oEWRpHW2MjI7sGfcMJdcsjQnIyRbdCilvFaQN07jQtAkOklbjFrU5KcHzw4EvJ41Yz2Ykyd";
var strongPasswordCheckerII = function (password) {
    if (password.length < 8) {
        console.log("too short" + password);
        return false;
    }
    if (!(/[a-z]/).test(password)) {
        console.log('no lowercase');
        return false;
    }
    if (!(/[A-Z]/).test(password)) {
        console.log('no uppercase');
        return false;
    }
    if (!(/[0-9]/).test(password)) {
        console.log('no numbers');
        return false;
    }
    var specChars = ['"', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+'];
    var spec = false;
    for (var i = 0; i < specChars.length; i++) {
        if (password.includes(specChars[i])) {
            console.log('spec Char');
            spec = true;
            break;
        }
    }
    if (!spec) {
        console.log('no spec');
        return false;
    }
    for (var i = 1; i < password.length; i++) {
        if (password[i] === password[i - 1]) {
            console.log('double letters');
            return false;
        }
    }
    return true;
};
// console.log(strongPasswordCheckerII(str1))
// console.log(strongPasswordCheckerII(str2))
// console.log(strongPasswordCheckerII(str3))
// console.log(strongPasswordCheckerII(str4))
