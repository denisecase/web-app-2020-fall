/**
 * Seed the database with sample data.
 *
 * During development, drop & recreate the database on startup.
 *
 * Only as we move into production (and the app is stable) will we
 * begin to store real data.
 *
 * *
 */

// NEW! Best practices recommend:
// put ALL imports FIRST rather than 'hiding' them in code below
// use a LOGGER that writes to files / turns off console logging in production

const LOG = require('./logger');

module.exports = async (db) => {
  LOG.info('Starting seeder.......................');

  try {
    await db.sync({ force: true });
    LOG.info('Recreated all tables.');
  } catch (err) {
    LOG.error(`ERROR: on sync (recreate) - ${err.message}`);
  }

  // Dr. Case - rabbit
  try {
    await db.models.Rabbit.bulkCreate(
      [
        { name: 'Bugs', age: 2, isCartoon: true },
        { name: 'Huggy', age: 2, isCartoon: false },
        { name: 'Doc', age: 2, isCartoon: true },
      ],
      { validate: true }, // add options object to call new model validators
    );
    const numRabbits = await db.models.Rabbit.count();
    LOG.info(`Seeded ${numRabbits} rabbits.`);
  } catch (err) {
    LOG.error(`ERROR: Rabbit - ${err.message}`);
  }

  // Dr. Hoot - tea
  await db.models.Tea.bulkCreate([
    { name: 'LongJing', pricePerGram: 4.0, isPuer: false },
    { name: 'YiWu', pricePerGram: 3.5, isPuer: true },
    { name: 'LiShan', pricePerGram: 2.5, isPuer: false },
    { name: 'TiGuanYin', pricePerGram: 0.4, isPuer: false },
  ]);
  const numTeas = await db.models.Tea.count();
  LOG.info(`Seeded ${numTeas} teas .`);

  // Blake - game
  try {
    await db.models.Game.bulkCreate([
      { name: 'Uno', playerCount: 6, isCardGame: true },

      { name: 'Sorry', playerCount: 4, isCardGame: false },

      { name: 'Monopoly', playerCount: 4, isCardGame: false },
    ]);
    const numGames = await db.models.Game.count();
    LOG.info(`Seeded ${numGames} games.`);
  } catch (err) {
    LOG.error(`ERROR: Game - ${err.message}`);
  }

  // Varsha - animal
  try {
    await db.models.Animal.bulkCreate(
      [
        { name: 'Dog', lifeSpan: 22, isPet: true },
        { name: 'Fox', lifeSpan: 14, isPet: false },
        { name: 'Cat', lifeSpan: 25, isPet: true },
      ],
      { validate: true }, // add options object to call new model validators
    );
    const numAnimals = await db.models.Animal.count();
    LOG.info(`Seeded ${numAnimals} animals.`);
  } catch (err) {
    LOG.error(`ERROR: Animal - ${err.message}`);
  }
  // Felipe - ?

  // Jack - chief

  // Sreenidhi - plant
  try {
    await db.models.Plant.bulkCreate(
      [
        { name: 'Hibicus', varieties: 1, isPlant: true },
        { name: 'Apple', varieties: 1, isPlant: false },
        { name: 'AleoVera', varieties: 1, isPlant: true },
      ],
      { validate: true }, // add options object to call new model validators
    );
    const numPlants = await db.models.Plant.count();
    LOG.info(`Seeded ${numPlants} plants.`);
  } catch (err) {
    LOG.error(`ERROR: Plant - ${err.message}`);
  }

  // Nithya - series
  await db.models.Series.bulkCreate([
    { name: 'Better Things', seasons: 4, isComedy: true },
    { name: 'Breaking Bad', seasons: 5, isComedy: false },
    { name: 'Money Heist', seasons: 4, isComedy: false },
  ]);
  const numSeries = await db.models.Series.count();
  LOG.info(`Seeded ${numSeries} seriess.`);

  // Sri Vasavi - food
  await db.models.food.bulkCreate([
    { name: 'Lamb', pricePerLB: 8, isMeat: true },
    { name: 'Fish', pricePerLB: 4, isMeat: true },
    { name: 'Spinach', pricePerLB: 2, isMeat: false },
  ]);
  const numfood = await db.models.food.count();
  LOG.info(`Seeded ${numfood} foods.`);

  // Joseph - software
  try {
    await db.models.Software.bulkCreate([
      { name: 'Linux', firstReleased: 1991, isOpenSource: true },
      { name: 'Tmux', firstReleased: 2007, isOpenSource: true },
      { name: 'Windows', firstReleased: 1985, isOpenSource: false },
    ]);
    const numSoftware = await db.models.Software.count();
    LOG.info(`Seeded ${numSoftware} softwares`);
  } catch (err) {
    LOG.error(`ERROR: - Software ${err.message}`);
  }
  // Stephen - whiskey
  try {
    await db.models.Whiskey.bulkCreate([
      { name: 'Laphroaig 10', age: 10, is: true },
      { name: 'Highland Park 12', age: 12, is: true },
      { name: 'Redbreast 12', age: 12, is: false },
    ]);
    const numWhiskey = await db.models.Whiskey.count();
    LOG.info(`Seeded ${numWhiskey} whiskey.`);
  } catch (err) {
    LOG.error(`ERROR: - Whiskey ${err.message}`);
  }

  // Shivani - book
  try {
    await db.models.Book.bulkCreate([
      { book: 'harrypotter ', publishedDate: 1997, isFantasy: true },
      { book: 'animalfarm ', publishedDate: 1945, isFantasy: false },
      { book: 'hobbit', publishedDate: 1937, isFantasy: true },
    ]);
    const numbook = await db.models.book.count();
    LOG.info(`Seeded ${numbook} book.`);
  } catch (err) {
    LOG.error(`ERROR: - Book ${err.message}`);
  }

  // Kunal - videogame
  try {
    await db.models.videogame.bulkCreate([
      { name: 'GTA V', playersNeeded: 1, isReleased: true },
      { name: 'A Way Out', playersNeeded: 2, isReleased: true },
      { name: 'Cyberpunk 2077', playersNeeded: 1, isReleased: false },
    ]);
    const numVideoGame = await db.models.videogame.count();
    LOG.info(`Seeded ${numVideoGame} video game.`);
  } catch (err) {
    LOG.error(`ERROR: videogame - ${err.message}`);
  }
  // Chandler - company
  try {
    await db.models.Company.bulkCreate([
      { name: 'Nintendo', founded: 1889, isPublic: true },
    ]);
    const numCompanies = await db.models.Company.count();
    LOG.info(`Seeded ${numCompanies} companies.`);
  } catch (err) {
    LOG.error(`ERROR: Company - ${err.message}`);
  }
  // Praneeth - cricket
  await db.models.Cricket.bulkCreate([
    { name: 'IPL', age: 2, isCricket: true },
    { name: 'Football', age: 2, isCricket: false },
    { name: 'World Cup', age: 2, isCricket: true },
  ]);
  const numCricket = await db.models.Cricket.count();
  LOG.info(`Seeded ${numCricket} cricket team.`);

  // Zach - fruit
  try {
    await db.models.Fruit.bulkCreate([
      { name: 'Apple', daysGrowth: 150, isRipe: true },
      { name: 'Orange', daysGrowth: 20, isRipe: false },
      { name: 'Pineapple', daysGrowth: 700, isRipe: true },
    ]);
    const numFruit = await db.models.Fruit.count();
    LOG.info(`Seeded ${numFruit} fruit.`);
  } catch (err) {
    LOG.error(`ERROR: Fruit - ${err.message}`);
  }

  // Prashansa - dance
  try {
    await db.models.Dance.bulkCreate([
      { form: 'Kuchipudi', yearIntro: 150, isTraditional: true },
      { form: 'Bollywood ', yearIntro: 196, isTraditional: false },
      { form: 'Bhagra', yearIntro: 194, isTraditional: true },
    ]);
    const numDance = await db.models.Dance.count();
    LOG.info(`Seeded ${numDance} dance.`);
  } catch (err) {
    LOG.error(`ERROR: - Dance ${err.message}`);
  }

  // Sam - ship
  try {
    await db.models.Ship.bulkCreate([
      { name: 'Sophie', guns: 14, isFictional: true },
      { name: 'Surprise', guns: 28, isFictional: false },
      { name: 'Suffolk', guns: 74, isFictional: false },
    ]);
    const numShip = await db.models.Ship.count();
    LOG.info(`Seeded ${numShip} ships.`);
  } catch (err) {
    LOG.error(`ERROR: - Ship ${err.message}`);
  }

  // Lindsey - Pokemon
  try {
    await db.models.Pokemon.bulkCreate([
      { name: 'Crobat', generation: 2, isStarter: false },
      { name: 'Raboot', generation: 8, isStarter: true },
      { name: 'Oshawott', generation: 5, isStarter: true },
    ]);
    const numPokemon = await db.models.Pokemon.count();
    LOG.info(`Seeded ${numPokemon} Pokemon.`);
  } catch (err) {
    LOG.error(`ERROR: - Pokemon ${err.message}`);
  }

  // Dr. Case - user
  try {
    await db.models.User.bulkCreate(
      [
        { email: 'dcase@nwmissouri.edu', password: 'dcase1' },
        { email: 'hoot@nwmissouri.edu', password: 'hoot22' },
      ],
      { validate: true }, // add options object to call new model validators
    );
    const numRabbits = await db.models.Rabbit.count();
    LOG.info(`Seeded ${numRabbits} rabbits.`);
  } catch (err) {
    LOG.error(`ERROR: Rabbit - ${err.message}`);
  }

  LOG.info('Done with seeder................');

  return db;
};
