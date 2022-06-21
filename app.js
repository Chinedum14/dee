const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");


const app = express();


app.use(cors());


mongoose.connect("mongodb+srv://Chinedum:DerrekD149@cluster0.6kzwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
  console.log("Connected to database");
});





const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);


// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });


server.start().then(res => {
  server.applyMiddleware({ app });
});


httpServer.listen(4000, () => {
  console.log("Now listening on port 4000");
})