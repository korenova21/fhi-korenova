
function fibo(pocet:number):void {
    let a = 0;
    let b = 1;
    let c = 0;
    const vystup = [];

    for (let i = 0; i < pocet; i++) {
        vystup.push(a);
        c = a + b;
        a = b;
        b = c;
    }
    console.log(vystup);
}
fibo(11);