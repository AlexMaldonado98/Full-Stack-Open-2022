const dummy = (Array) => {
    if(Array){
        return 1;
    }else{
        return 0;
    }
};

const totalLikes = (Array) => {

    if(Array.length === 0) return 0;

    const likes = Array.map(blog => blog.likes);
    return likes.reduce((a,b) => a + b,0);
};

const favoriteBlog = (Array) => {

    if(Array.length === 0 ) return 0;

    const favoriteBlog = Array.reduce((a,b) => a.likes > b.likes ? a : b);

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};