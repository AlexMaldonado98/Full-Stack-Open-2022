const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to mongoDB');
}).catch((error) => {
    console.log('error connecting to MongoDB', error);
});

/* let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
]; */

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

/* let books = [
    
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution']
    },
];*/

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

    type Author { 
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
 
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks( author: String, genres: String ): [Book!]!
        allAuthors: [Author!]!
        me:User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book!

        editAuthor(
            name: String!
            setBornTo: Int!
        ):Author

        createUser(
            username:String!
            favoriteGenre:String!
        ):User

        login(
            username: String!
            password: String!       
        ): Token
    }
`;

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

};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null;
        if(auth && auth.toLowerCase().startsWith('bearer')){
            const token = auth.split(' ')[1];
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const currentUser = await User.findById(decodedToken.id);
            return {currentUser};
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});