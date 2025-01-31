// let arr = [10, 20, 30];

// let ans = arr.map((number, index)=>{
//     return number*index;
// })

// console.log(ans);

// let ans2 = arr.filter((number) =>{
//     return number%2 === 1;
// })
// console.log(ans2);

// let obj = {
//     name: "John",
//     age: 22,
// }
// for(let key in obj){
//     console.log(key, obj[key]);
// }

// let a = function(){
//     console.log("Hello");
// }
// console.log(a);
// console.log(typeof(a));

// add();
// var add = function(){
//     return 1+2;
// }


// console.log(a);
// var a = 10;

// function  mul(x){
//     return function(y){
//         return x*y;
//     }
// }
// let double = mul(2)(4);
// console.log(double);


month = ["Janm", "Febm", "arch", ];

let result = month.filter((item)=>{
    return item.toLowerCase().includes("m");
})
console.log(result);
