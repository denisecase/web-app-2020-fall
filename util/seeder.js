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
      { validate: true } // add options object to call new model validators
    );
    const numRabbits = await db.models.Rabbit.count();
    LOG.info(`Seeded ${numRabbits} rabbits.`);
  } catch (err) {
    LOG.error(`ERROR: Rabbit - ${err.message}`);
  }

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
      { validate: true } // add options object to call new model validators
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
      { validate: true } // add options object to call new model validators
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
  LOG.info(`Seeded ${numSeries} series.`);

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
    { teamName: 'Indian Team', age: 2, captain: 'Dhoni' },
    { teamName: 'Australian Team', age: 2, captain: 'Smith' },
    { teamName: 'South African Team', age: 2, captain: 'ABD' },
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

  // ------------------------------------------------

  try {
    await db.models.User.bulkCreate(
      [
        { id: 1, email: 'dcase@nwmissouri.edu', password: 'password' },
        { id: 2, email: 'hoot@nwmissouri.edu', password: 'password' },
        { id: 3, email: 'alex154590@gmail.com', password: 'password' },
        {
          id: 4,
          email: 'samarpita.chandolu@outlook.com',
          password: 'password',
        },
        { id: 5, email: 'bhanu1994@gmail.com', password: 'password' },
        { id: 6, email: 'chandu131198@gmail.com', password: 'password' },
        { id: 7, email: 'chanduhvg@gmail.com', password: 'password' },
        { id: 8, email: 'p.harichandraprasad@gmail.com', password: 'password' },
        { id: 9, email: 'krishna.ksk1996@gmail.com', password: 'password' },
        { id: 10, email: 'mohansai03@outlook.com', password: 'password' },
        { id: 11, email: 'prasad.gd@gmail.com', password: 'password' },
        { id: 12, email: 'pruthvunaskanti@hotmail.com', password: 'password' },
        { id: 14, email: 'raviteja.pagidoju@gmail.com', password: 'password' },
        { id: 15, email: 'saikrish1545@gmail.com', password: 'password' },
        { id: 16, email: 'teja2004@woutlook.com', password: 'password' },
        { id: 17, email: 'srkvodnala@gmail.com', password: 'password' },
        { id: 18, email: 'csrisudheera@gmail.com', password: 'password' },
        { id: 19, email: 'swaroopreddy.g@gmail.com', password: 'password' },
        { id: 20, email: 'swaroopat@hotmail.com', password: 'password' },
        { id: 21, email: 'kiran021997@gmail.com', password: 'password' },
        { id: 22, email: 'yashwanthrocks@gmail.com', password: 'password' },
        { id: 23, email: 'vishal041197@outlook.com', password: 'password' },
      ],
      { validate: true } // add options object to call new model validators
    );
    const numUsers = await db.models.User.count();
    LOG.info(`Seeded ${numUsers} users.`);
  } catch (err) {
    LOG.error(`ERROR: User seeding - ${err.message}`);
  }

  try {
    await db.models.Team.bulkCreate(
      [
        { id: 1, name: 'Thunder Guys' },
        { id: 2, name: 'Mavericks' },
        { id: 3, name: 'Sunrisers horizons' },
        { id: 4, name: 'Barbies' },
        { id: 5, name: 'Hunters' },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Team.count();
    LOG.info(`Seeded ${num} teams.`);
  } catch (err) {
    LOG.error(`ERROR: Team seeding - ${err.message}`);
  }

  try {
    await db.models.Quest.bulkCreate(
      [
        { id: 1, name: 'Dragon Hunt' },
        { id: 2, name: 'Duck Hunt' },
        { id: 3, name: 'South Campus' },
        { id: 4, name: 'East Campus' },
        { id: 5, name: 'North Campus' },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Quest.count();
    LOG.info(`Seeded ${num} quests.`);
  } catch (err) {
    LOG.error(`ERROR: Quest seeding - ${err.message}`);
  }

  try {
    await db.models.Location.bulkCreate(
      [
        { name: 'Bearcat football stadium' },
        { name: 'Colden Pond' },
        { name: 'Bearcat Soccer field' },
        { name: 'Field House' },
        { name: 'Admin building' },
        { name: 'Bell tower' },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Location.count();
    LOG.info(`Seeded ${num} locations.`);
  } catch (err) {
    LOG.error(`ERROR: Location seeding - ${err.message}`);
  }

  try {
    await db.models.Competition.bulkCreate(
      [
        {
          id: 1,
          name: 'December Challenge',
          creatorUserId: 5,
          questId: 1,
          startDateTime: new Date(2020, 11, 4, 8, 0, 0), // month is zero index
          endDateTime: new Date(2020, 11, 4, 9, 0, 0), // dec
        },
        {
          id: 2,
          name: 'January Return',
          creatorUserId: 10,
          questId: 2,
          startDateTime: new Date(2021, 0, 15, 8, 0, 0), // month is zero index
          endDateTime: new Date(2021, 0, 15, 9, 0, 0), // jan
        },
        {
          id: 3,
          name: 'February Fun',
          creatorUserId: 15,
          questId: 3,
          startDateTime: new Date(2021, 1, 15, 8, 0, 0), // month is zero index
          endDateTime: new Date(2021, 1, 15, 9, 0, 0), // feb
        },
        {
          id: 4,
          name: 'March Madness',
          creatorUserId: 20,
          questId: 4,
          startDateTime: new Date(2021, 2, 15, 8, 0, 0), // month is zero index
          endDateTime: new Date(2021, 2, 15, 9, 0, 0), // mar
        },
        {
          id: 5,
          name: 'Final Event',
          creatorUserId: 9,
          questId: 2,
          startDateTime: new Date(2021, 3, 15, 8, 0, 0), // month is zero index
          endDateTime: new Date(2021, 3, 15, 9, 0, 0), // apr
        },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Competition.count();
    LOG.info(`Seeded ${num} competitions.`);
  } catch (err) {
    LOG.error(`ERROR: Competitions seeding - ${err.message}`);
  }

  LOG.info('Done with seeder................');

  return db;
};
