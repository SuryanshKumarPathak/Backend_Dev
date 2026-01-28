function add(a,b){
    return a+b;
}

function sub(a,b){
    let result = 0;
    if(a>=b){
        result = a-b;
    }
    else{
        result=b-a;
    }
    return result;
}

module.exports={add,sub};