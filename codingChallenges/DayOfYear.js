// function parseDate(date){
//     const reg = /\d+/g;
//     const parsed = date.match(reg);
//     const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]
//     let day = parsed[2]*1;

//     function checkLeap(){   
//         if(parsed[0] % 100 === 0 && parsed[0] % 400 !== 0) return;
//         if(parsed[0]%4===0&& parsed[1]>2)return day++;
//     }
//     checkLeap()
//     for(let i=0; i<parsed[1]-1; i++){
//         console.log(day)
//         day+=months[i];
//     }
//     return day
// }

function parseDate(date){
    const reg = /\d+/g;
    const parsed = date.match(reg);
    const months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    let day = parseInt(parsed[2]) + months[parseInt(parsed[1])-1];
    let year= parseInt(parsed[0]);

    function checkLeap(){   
        if(year % 100 === 0 && year % 400 !== 0) {console.log('false'); return};
        if(year%4===0&& parseInt(parsed[1])>2)return day++;
    }
    checkLeap();
    return day
}

console.log(parseDate('2004-03-01'))
