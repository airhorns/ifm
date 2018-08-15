# README

Open source indoor farm management system

#### Running the code

 IFM uses `docker-compose`. So, grab Docker for Mac or whatever is appropriate for your platform, and then `docker-compose up`!

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

or

```
bash3.4# bin/jest
```

and the tests should run fine.

#### Adding secrets

IFM uses `ejson`. See: https://github.com/Shopify/ejson
