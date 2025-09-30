function over(palindrom:string):void{
    let prve: string = "";
    let posledne: string = "";

    const stred = Math.floor(palindrom.length / 2);

    if (palindrom.length % 2 === 0) { // párne
        for (let i = stred - 1; i >= 0; i--) {
            prve += palindrom[i];
        }
        for (let i = stred; i < palindrom.length; i++) {
            posledne += palindrom[i];
        }
    } else { // nepárne
        for (let i = stred - 1; i >= 0; i--) {
            prve += palindrom[i];
        }
        for (let i = stred + 1; i < palindrom.length; i++) {
            posledne += palindrom[i];
        }
    }

    if (prve == posledne){
        console.log("Je to palindrom.")
    }
    else{
        console.log("Nie je to palindrom.")
    }
}

over("madam");
over("trtko");