FROM starefossen/ruby-node:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN bundle install -j 20
RUN yarn
COPY . /app
