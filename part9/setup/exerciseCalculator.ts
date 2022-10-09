interface Result {
    periodLength:number
    trainingDays:number
    success: boolean
    target: number
    average: number
    rating: number
    ratingDescription: string
}

const calculateExercises = (dailyHours:number[],target:number):Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hour => hour > 0 ).length;
    const average = dailyHours.reduce((a,b) => b + a,0) / periodLength;
    const success = average >= target;
    let rating:number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));