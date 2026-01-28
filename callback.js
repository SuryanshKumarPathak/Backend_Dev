// function greet(){
//     console.log("Hello");
// }

// function fun(ch){
//     console.log("fun function");
//     ch();
// }

// fun(greet);


const greet  = () => {
    console.log("Hello");
}

const fun=(() => {
    console.log("Hello");
})