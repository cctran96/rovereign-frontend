# Rovereign

Rovereign is an RPG game where users can explore different maps, fight monsters using a turn-based battle system, and level up/upgrade their character.

## Technologies

Built with a React [frontend](https://github.com/cctran96/rovereign-frontend) and a Rails [backend](https://github.com/cctran96/rovereign-backend)

## Installation

1. Clone both repos.
 ```sh
   git clone https://github.com/cctran96/rovereign-frontend.git
   ```
 ```sh
   git clone https://github.com/cctran96/rovereign-backend.git
   ```
2. Install the NPM packages and gems, respectively.
 ```sh
   npm install
   ```
 ```sh
   bundle install
   ```
3. This application uses PostgreSQL. To set that up, click [here](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-macos)

4. In the backend repository, create and seed the database.
  ```sh
  rails db:migrate
  rails db:seed
  ```

5. Start the servers, respectively.
 ```sh
   npm start
   ```
 ```sh
   rails start
   ```

## Usage
1. Create an account.
2. Create a character in the play route.
3. Go through the tutorial.
4. Explore!
