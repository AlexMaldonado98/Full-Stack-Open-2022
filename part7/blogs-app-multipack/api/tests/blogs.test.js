const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');
const { listWithOneBlog, blogs } = require('./test_helper');


test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const empty = [];

    test('of empty list is zero', () => {
        const result = totalLikes(empty);
        expect(result).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog);
        expect(result).toBe(listWithOneBlog[0].likes);
    });

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(blogs);
        expect(result).toBe(blogs.reduce((a,b) => a + b.likes,0));
    });
});

describe('favorite blog', () => {

    test('find the most voted blog', () => {
        const result = favoriteBlog(blogs);
        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        );
    });

    test('return zero when array is empty', () => {
        const result = favoriteBlog([]);
        expect(result).toEqual(0);
    });
});