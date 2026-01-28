console.log("first");

function login(ch){
    setTimeout(()=>{
        console.log("Login")
        ch();
    },2000)
}


function userDetails(ch){
    setTimeout(()=>{
        console.log("user Details")
        ch();
    },1000)
}

function password(){
    setTimeout(() => {
        console.log("this is the code for the password")
    }, 3000);
}

function username(){
    setTimeout()
}


login(()=>
userDetails(()=>
    password())
)

console.log('end');