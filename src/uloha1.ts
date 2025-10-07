function bmiIndex (weight:number, height:number): string{
    const heightInMeters:number = height/100;
    const bmi:number = weight/(heightInMeters*heightInMeters);
    const healthyWeight: number = 25 * (heightInMeters * heightInMeters);
    const schudnut:number =  weight - healthyWeight;
    if (bmi<=19) {
        return "podváha";}
    else if (19<bmi && bmi<=25) {
        return "normálna hmotnosť";}
    else if (25<bmi && bmi<=30){
        return `nadváha, schudni ${schudnut.toFixed(1)} kg.`;}
    else{
        return `obezita, schudni ${schudnut.toFixed(1)} kg.`;
    }
}
bmiIndex(70,170);