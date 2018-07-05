const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    sePomodoros: (_, args, context, info) => {
      return context.prisma.query.pomodoroes(
        {
          where: {
            name_contains: args.searchString
          }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://eu1.prisma.sh/gregory-bleiker-1224dd/prisma_sample/dev"
    })
  })
});
const options = {
  port: 8080,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
server.start(options, () =>
console.log(`GraphQL server is running on http://localhost:8080 `)
);

/*
var http = require('http');

http.createServer(function (req, res) {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(process.version);
    
}).listen(process.env.PORT || 8080);
*/
