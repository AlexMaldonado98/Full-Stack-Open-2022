interface Result {
    periodLength:number
    trainingDays:number
    success: boolean
    target: number
    average: number
    rating: number
    ratingDescription: string
}

interface Value {
    dailyHours: Array<number>
    target: number
}

const checkArgumentsExercises = (args: Array<string>): Value => {
    if(args.length < 4) throw new Error('Not enough arguments');
    const params = args.slice(2,args.length).map(element => Number(element));

    if(params.includes(NaN)){
        throw new Error('Provided values were not number!');
    }else{
        return {
            dailyHours: params.slice(1,params.length),
            target: params[0]
        };
    }
};

export const calculateExercises = (dailyHours: number[],target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hour => hour > 0 ).length;
    const average = dailyHours.reduce((a,b) => b + a,0) / periodLength;
    const success = average >= target;
    let rating = 0;
    switch(true){
    case Math.round(average) <= 1:
        rating = 1;
        break;
    case Math.round(average) === 2:
        rating = 2;
        break;
        
    case Math.round(average) >= 3:
        rating = 3;
        break;
    }
    
    const ratingDescription = rating === 0 ? 'very bad' : (rating === 1 ? 'bad' : (rating === 2 ? 'ok' : (rating >= 3 ? 'very good' : 'Error')));

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
try {
    const {dailyHours,target} = checkArgumentsExercises(process.argv);
    console.log(calculateExercises(dailyHours,target));
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(error.message);
}