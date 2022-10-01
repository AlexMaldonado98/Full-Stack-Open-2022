const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const {UserInputError, AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {PubSub} = require('graphql-subscriptions');
require('dotenv').config();

const pubsub = new PubSub();

const resolvers = {
    Query: {
        // bookCount: () => books.length,
        bookCount: async () => Book.collection.countDocuments(),
        // authorCount: () => authors.length,
        authorCount: async () => Author.collection.countDocuments(),
        /* allBooks: (root, args) => {
            if (args.author && args.genres) {
                return books.filter(book => book.author === args.author && book.genres.includes(args.genres));
            } else if (args.genres) {
                return books.filter(book => book.genres.includes(args.genres));
            } else if (args.author) {
                return books.filter(book => book.author === args.author);

            } else {
                return books;
            }
        }, */
        allBooks: async (root, args) => {
            if (args.author && args.genres) {
                const author = await Author.findOne({ name: args.author });

                const books = await Book.find({
                    $and: [{
                        author: { $in: author.id },
                        genres: { $in: args.genres }
                    }]
                }).populate('author');

                return books;

            } else if (args.genres) {
                const books = await Book.find({ genres: { $in: args.genres } }).populate('author');
                return books;

            } else if (args.author) {
                const author = await Author.findOne({ name: args.author });
                const books = await Book.find({ author: { $in: author.id } }).populate('author');
                return books;
            } else {
                return await Book.find({}).populate('author');
            }
        },
        // allAuthors: () => authors
        allAuthors: async () => Author.find({}),
        me: (root,args,context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, {currentUser}) => {
            if(!currentUser){
                throw new AuthenticationError('Unauthenticated user');
            }

            /* const author = authors.find(author => author.name === args.author);


            if (!author) {
                const author = {
                    id: uudi(),
                    name: args.author
                };
                authors.push(author);
            }

            const newBook = {
                id: uudi(),
                ...args
            };

            books.push(newBook);

            return newBook; */
            let author = await Author.findOne({ name: args.author });

            if (!author) {
                try {
                    author = new Author({ name: args.author });
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args });
                }
            }

            const book = new Book({ ...args, author: author.id });
            try {
                await book.save();
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }

            await pubsub.publish('BOOK_ADDED',{bookAdded: book.populate('author')});
            return await book.populate('author');

        },
        editAuthor: async (root, args, {currentUser}) => {
            if(!currentUser){
                throw new AuthenticationError('Unauthenticated user');
            }
            // const objAuthor = authors.find(author => author.name === args.name);
            // if (!objAuthor) return null;
            // const indexObjAuthor = authors.indexOf(objAuthor, 0);
            // objAuthor.born = args.setBornTo;
            // authors.splice(indexObjAuthor, 1, objAuthor);
            // return objAuthor;
            const objAuthor = await Author.findOne({ name: args.name });
            if (!objAuthor) return null;
            try {
                const updateAuthor = await Author.findByIdAndUpdate({ _id: objAuthor._id }, { born: args.setBornTo }, { new: true });
                return updateAuthor;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
        createUser: (root, args) => {
            const user = new User({ ...args });

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, { invalidArgs: args });
                });
        },
        login: async (root,args) => {
            const user = await User.findOne({username:args.username});
            if(!user || args.password !== 'PASSDefault'){
                throw new UserInputError('wrong credentials');
            }   
            const infoToken = {
                username: args.username,
                id: user._id
            };

            return {value: jwt.sign(infoToken,process.env.JWT_SECRET_KEY)};
        }
    },
    Author: {
        // bookCount: (root) => books.filter(book => book.author === root.name).length
        bookCount: async (root) => Book.find({ author: root.id }).countDocuments()
    },
    Subscription:{
        bookAdded:{
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
};

module.exports = resolvers;