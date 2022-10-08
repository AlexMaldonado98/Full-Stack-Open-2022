const calculateBmi = (height:number,weight:number):string => {
    const bmi = weight / Math.pow(height/100,2);
    let msg;
    switch(true){
    case bmi < 18.5:
        msg = 'underweight';
        break;
    case bmi >= 18.5 && bmi <= 24.9:
        msg = 'Normal';
        break;
    case bmi >= 25 && bmi <= 29.9 :
        msg = 'overweight';
        break;
    case bmi  > 30:
        msg = 'obesity';
        break;
    default:
        msg = 'switch error';
    }

    return msg;
};

console.log(calculateBmi(180,74));