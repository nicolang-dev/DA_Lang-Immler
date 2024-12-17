async function operation(){
    function resolve(){
        return new Promise((resolve) => {
            setTimeout(() => {
                let result = 5;
                resolve(result);
            }, 500);
        });
    }
}

operation.then(res => {
    console.log(res);
})