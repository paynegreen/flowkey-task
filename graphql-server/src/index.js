const { ApolloServer, gql } = require("apollo-server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const getMongoConnection = require("./getMongoConnection");

// don't require a separate mongodb instance to run
new MongoMemoryServer({ instance: { port: 27017 } });

// this API is just an example, you can modify any parts if needed for the task
const typeDefs = gql`
    input NoteInput {
        duration: Int!
        midiNumber: Int!
        time: Int!
    }

    type Note {
        duration: Int!
        midiNumber: Int!
        time: Int!
    }

    type Song {
        _id: ID!
        title: String
        keyStrokes: [Note!]
        elapseTime: Int
    }

    type Query {
        songs: [Song]
    }

    type Mutation {
        addSong(title: String, keyStrokes: [NoteInput!], elapseTime: Int!): Song
    }
`;

const resolvers = {
    Query: {
        songs: async () => {
            const mongodb = await getMongoConnection();
            return mongodb
                .collection("songs")
                .find({})
                .toArray();
        },
    },
    Mutation: {
        addSong: async (_, { title, keyStrokes, elapseTime }) => {
            const mongodb = await getMongoConnection();
            const newSong = { title, keyStrokes, elapseTime };
            const response = await mongodb.collection("songs").insertOne(newSong);

            return { ...newSong, _id: response.insertedId };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`GraphQL server running: ${url}`);
});
