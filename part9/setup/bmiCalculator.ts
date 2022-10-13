interface Values {
    heigth:number
    weight: number
}

const checkArguments = (args: Array<string>): Values => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');
    
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            heigth: Number(args[2]),
            weight: Number(args[3])
        };
    }else{
        throw new Error('Provided values were not number!');
    }
};

export const calculateBmi = (height:number,weight:number):string => {
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

try {
    const {heigth,weight} = checkArguments(process.argv);
    console.log(calculateBmi(heigth,weight));
} catch (error) {
    console.log(error.message);
}
