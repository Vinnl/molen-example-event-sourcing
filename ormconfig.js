const config = {
   "type": "postgres",
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }

}

if (process.env.DATABASE_URL) {
  config.url = process.env.DATABASE_URL;
} else {
  config.host = "localhost";
  config.port = 5432;
  config.username = "postgres";
  config.password = "";
  config.database = "molen_example_db";
}

module.exports = config;
