const dummy = (Array) => {
    if(Array){
        return 1;
    }else{
        return 0;
    }
};

const totalLikes = (Array) => {
    const likes = Array.map(blog => blog.likes);
    console.log(likes);
    return likes.reduce((a,b) => a + b,0);
};

module.exports = {
    dummy,
    totalLikes
};