FROM starefossen/ruby-node:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev vim
RUN mkdir /app
WORKDIR /app

COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
ARG bundle_without=""
ENV BUNDLE_WITHOUT ${bundle_without}
RUN bundle install -j 20

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn

COPY . /app/

ARG webpack_build=""
RUN test -z "$webpack_build" || NODE_ENV=production bin/webpack && :

ENTRYPOINT ["/app/bin/docker-entrypoint"]
