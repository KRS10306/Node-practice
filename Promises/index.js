const divide = (num1, num2) =>{
    return new Promise((resolve, reject)=>{
        if (num2 === 0) {
            reject("0 not allowed in denominator")
        } else {
            resolve(num1/num2)
        }
    })
}

divide(10,0).then(r=> console.error(r)).catch(err=> console.log(err))