# README

Open source indoor farm management system

#### Running the code

IFM uses `docker-compose`. So, grab Docker for Mac or whatever is appropriate for your platform, and then `docker-compose up`!

#### Common tasks when developing

##### Regenerate GraphQL types for typescript

This is required when the shape of the GraphQL schema changes, so that the TypeScript compiler knows about the new types and can validate the client side code against them. Run `bin/generate-typescript-graphql-schema` inside a Rails container to generate this schema. It should look like this:

```
$: docker-compose exec web bash
root@0b33d02b997d:/app# bin/generate-typescript-graphql-schema
+ npx gql-gen --schema http://localhost:3000/graphql --template graphql-codegen-typescript-template --out app/javascript/ifm/ 'app/javascript/**/*.{ts,tsx}'
Loading GraphQL Introspection from remote: http://localhost:3000/graphql...
Loading config file from:  /app/gql-gen.json
Generated file written to /app/app/javascript/ifm/types.ts
root@0b33d02b997d:/app#
```

#### Running tests

It's best to run tests inside the docker container. So, to get a shell with the right environment, run:

```
$ docker-compose up
$ docker-compose exec -it web bash
bash3.4#
```

And you'll have a prompt to run stuff! At that point you can do:

```
bash3.4# bin/rails test
```

and the tests should run fine.

#### Adding secrets

IFM uses `ejson`. See: https://github.com/Shopify/ejson
