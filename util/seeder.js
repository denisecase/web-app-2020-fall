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
    const syncResult = await db.sync({ force: true });
    LOG.info(`Recreated all tables: ${syncResult}`);
  } catch (err) {
    LOG.error(`ERROR: on sync process - ${err.message}`);
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
  try {
    await db.models.Rabbit.bulkCreate(
      [
        { name: 'Virat Kohli', age: 32, isCartoon: true },
        { name: 'M S Dhoni', age: 35, isCartoon: false },
        { name: 'Sachi Tendulkar', age: 40, isCartoon: false },
      ],
      { validate: true } // add options object to call new model validators
    );
    const numCricket = await db.models.Cricket.count();
    LOG.info(`Seeded ${numCricket} cricket.`);
  } catch (err) {
    LOG.error(`ERROR: Cricket - ${err.message}`);
  }

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
      { form: 'Kuchipudi', yearInfo: 1580, isTraditional: true },
      { form: 'Bollywood ', yearInfo: 1906, isTraditional: false },
      { form: 'Bhagra', yearInfo: 1940, isTraditional: true },
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
        { id: 16, email: 'teja2004@outlook.com', password: 'password' },
        { id: 17, email: 'srkvodnala@gmail.com', password: 'password' },
        { id: 18, email: 'csrisudheera@gmail.com', password: 'password' },
        { id: 19, email: 'swaroopreddy.g@gmail.com', password: 'password' },
        { id: 20, email: 'swaroopat@hotmail.com', password: 'password' },
        { id: 21, email: 'kiran021997@gmail.com', password: 'password' },
        { id: 22, email: 'yashwanthrocks@gmail.com', password: 'password' },
        { id: 23, email: 'vishal041197@outlook.com', password: 'password' },
        { id: 24, email: 'default@email.com', password: 'password' },
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
        { id: 1, name: 'Thunder Thinkers', UserId: 18 },
        { id: 2, name: 'Mavericks', UserId: 19 },
        { id: 3, name: 'Sunrisers Horizons', UserId: 15 },
        { id: 4, name: 'Barbies', UserId: 21 },
        { id: 5, name: 'Hunters', UserId: 5 },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Team.count();
    LOG.info(`Seeded ${num} teams.`);
  } catch (err) {
    LOG.error(`ERROR: Team seeding - ${err.message}`);
  }

  try {
    // Foreign keys begin with a capital letter by default
    // When the app is running, go to /player/findAll to see more
    await db.models.Player.bulkCreate(
      [
        { id: 101, UserId: 1, name: 'dabombcase', TeamId: 1 },
        { id: 102, UserId: 2, name: 'happeninhoot', TeamId: 2 },
        { id: 103, UserId: 3, name: 'awesomealex', TeamId: 3 },
        { id: 104, UserId: 4, name: 'supersamarpitachandolu', TeamId: 3 },
        { id: 105, UserId: 5, name: 'bestbhanu', TeamId: 4 },
        { id: 106, UserId: 6, name: 'cunningchandu', TeamId: 5 },
        { id: 107, UserId: 7, name: 'crusherchanduhvg', TeamId: 1 },
        {
          id: 108,
          UserId: 8,
          name: 'famouspharichandraprasad',
          TeamId: 2,
        },
        { id: 109, UserId: 9, name: 'courageouskrishna', TeamId: 3 },
        { id: 110, UserId: 10, name: 'monstermohansai', TeamId: 4 },
        { id: 111, UserId: 11, name: 'eliteprasadgd', TeamId: 5 },
        { id: 112, UserId: 12, name: 'powerpruthvunaskanti', TeamId: 1 },
        { id: 114, UserId: 14, name: 'rockinraviteja', TeamId: 2 },
        { id: 115, UserId: 15, name: 'bonsaikrish1545', TeamId: 3 },
        { id: 116, UserId: 16, name: 'tejatops', TeamId: 4 },
        { id: 117, UserId: 17, name: 'strikersrkvodnala', TeamId: 5 },
        { id: 118, UserId: 18, name: 'strongbadsrisudheera', TeamId: 1 },
        { id: 119, UserId: 19, name: 'stellerswaroopreddy', TeamId: 2 },
        { id: 120, UserId: 20, name: 'supaswaroopat', TeamId: 3 },
        { id: 121, UserId: 21, name: 'killerkiran', TeamId: 4 },
        { id: 122, UserId: 22, name: 'yeeteryashwanthrocks', TeamId: 5 },
        { id: 123, UserId: 23, name: 'BeAllVishal', TeamId: 5 },
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
        { id: 1, name: 'Dragon Quest', UserId: 15 },
        { id: 2, name: 'Duck Quest', UserId: 18 },
        { id: 3, name: 'Treasure Quest', UserId: 4 },
        { id: 4, name: 'Happy Quest', UserId: 6 },
        { id: 5, name: 'Long Quest', UserId: 10 },
        { id: 6, name: 'Case Quest', UserId: 1 },
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
        // first quest locations........
        { id: 11, QuestId: 1, sortOrder: 10, name: 'Bearcat football stadium' },
        { id: 12, QuestId: 1, sortOrder: 20, name: 'Colden Pond' },
        { id: 13, QuestId: 1, sortOrder: 30, name: 'Bearcat Soccer field' },
        { id: 14, QuestId: 1, sortOrder: 40, name: 'Field House' },

        // second quest locations........
        { id: 21, QuestId: 2, sortOrder: 10, name: 'Bell tower' },
        { id: 22, QuestId: 2, sortOrder: 20, name: 'Bearcat football stadium' },
        { id: 23, QuestId: 2, sortOrder: 30, name: 'Colden Pond' },
        { id: 24, QuestId: 2, sortOrder: 40, name: 'Bearcat Soccer field' },

        // third quest locations........
        { id: 31, QuestId: 3, sortOrder: 10, name: 'Admin building' },
        { id: 32, QuestId: 3, sortOrder: 20, name: 'Bell tower' },
        { id: 33, QuestId: 3, sortOrder: 30, name: 'Bearcat football stadium' },
        { id: 34, QuestId: 3, sortOrder: 40, name: 'Colden Pond' },

        // fourth quest locations........
        { id: 41, QuestId: 4, sortOrder: 10, name: 'Field House' },
        { id: 42, QuestId: 4, sortOrder: 20, name: 'CIE Park' },
        { id: 43, QuestId: 4, sortOrder: 30, name: 'Admin building' },
        { id: 44, QuestId: 4, sortOrder: 40, name: 'Colden Pond' },

        // fifth quest locations........
        { id: 51, QuestId: 5, sortOrder: 10, name: 'Field House' },
        { id: 52, QuestId: 5, sortOrder: 20, name: 'Admin building' },
        { id: 53, QuestId: 5, sortOrder: 30, name: 'Bell tower' },
        { id: 54, QuestId: 5, sortOrder: 40, name: 'Bearcat football stadium' },

        // sixth quest locations........
        { id: 61, QuestId: 6, sortOrder: 10, name: 'One' },
        { id: 62, QuestId: 6, sortOrder: 20, name: 'Two' },
        { id: 63, QuestId: 6, sortOrder: 30, name: 'Three' },
        { id: 64, QuestId: 6, sortOrder: 40, name: 'Four' },
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
          UserId: 5,
          QuestId: 1,
          startDateTime: '2020-12-01T08:00',
          endDateTime: '2020-12-01T09:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
        {
          id: 2,
          name: 'January Return',
          UserId: 10,
          QuestId: 2,
          startDateTime: '2020-12-01T08:00',
          endDateTime: '2020-12-01T09:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
        {
          id: 3,
          name: 'February Fun',
          UserId: 15,
          QuestId: 3,
          startDateTime: '2021-02-01T09:00',
          endDateTime: '2021-02-01T10:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
        {
          id: 4,
          name: 'March Madness',
          UserId: 20,
          QuestId: 4,
          startDateTime: '2021-03-01T09:00',
          endDateTime: '2021-03-01T10:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
        {
          id: 5,
          name: 'Final Event',
          UserId: 9,
          QuestId: 5,
          startDateTime: '2021-04-01T09:00',
          endDateTime: '2021-04-01T10:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
        {
          id: 6,
          name: 'Case Competition',
          UserId: 1,
          QuestId: 6,
          startDateTime: '2021-02-01T09:00',
          endDateTime: '2021-02-01T10:00',
          startLatitude: 40.3506,
          startLongitude: -94.88289,
          startDescription: 'Near Colden Pond Bridge',
        },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.Competition.count();
    LOG.info(`Seeded ${num} competitions.`);
  } catch (err) {
    LOG.error(`ERROR: Competitions seeding - ${err.message}`);
  }

  try {
    // create the many-to-many records for competition teams
    await db.models.CompetitionTeam.bulkCreate(
      [
        // competition teams
        { id: 11, CompetitionId: 1, TeamId: 1 },
        { id: 12, CompetitionId: 1, TeamId: 2 },
        { id: 13, CompetitionId: 1, TeamId: 3 },
        { id: 14, CompetitionId: 1, TeamId: 4 },
        { id: 15, CompetitionId: 1, TeamId: 5 },

        // competition teams
        { id: 21, CompetitionId: 2, TeamId: 1 },
        { id: 22, CompetitionId: 2, TeamId: 2 },
        { id: 23, CompetitionId: 2, TeamId: 3 },
        { id: 24, CompetitionId: 2, TeamId: 4 },
        { id: 25, CompetitionId: 2, TeamId: 5 },

        // competition teams
        { id: 31, CompetitionId: 3, TeamId: 1 },
        { id: 32, CompetitionId: 3, TeamId: 2 },
        { id: 33, CompetitionId: 3, TeamId: 3 },
        { id: 34, CompetitionId: 3, TeamId: 4 },
        { id: 35, CompetitionId: 3, TeamId: 5 },

        // competition teams
        { id: 41, CompetitionId: 4, TeamId: 1 },
        { id: 42, CompetitionId: 4, TeamId: 2 },
        { id: 43, CompetitionId: 4, TeamId: 3 },
        { id: 44, CompetitionId: 4, TeamId: 4 },
        { id: 45, CompetitionId: 4, TeamId: 5 },

        // competition teams
        { id: 51, CompetitionId: 5, TeamId: 1 },
        { id: 52, CompetitionId: 5, TeamId: 2 },
        { id: 53, CompetitionId: 5, TeamId: 3 },
        { id: 54, CompetitionId: 5, TeamId: 4 },
        { id: 55, CompetitionId: 5, TeamId: 5 },

        // competition teams
        { id: 61, CompetitionId: 6, TeamId: 1 },
        { id: 62, CompetitionId: 6, TeamId: 2 },
        { id: 63, CompetitionId: 6, TeamId: 3 },
        { id: 64, CompetitionId: 6, TeamId: 4 },
        { id: 65, CompetitionId: 6, TeamId: 5 },
      ],
      { validate: true } // add options object to call new model validators
    );
    const num = await db.models.CompetitionTeam.count();
    LOG.info(`Seeded ${num} CompetitionTeam records.`);
  } catch (err) {
    LOG.error(`ERROR: CompetitionTeam seeding - ${err.message}`);
  }

  // Dr Hoot - tea
  try {
    await db.models.Tea.bulkCreate([
      { name: 'LongJing', pricePerGram: 4.0, isPuer: false },
      { name: 'YiWu', pricePerGram: 3.5, isPuer: true },
      { name: 'LiShan', pricePerGram: 2.5, isPuer: false },
      { name: 'TiGuanYin', pricePerGram: 0.4, isPuer: false },
    ]);
    const numTeas = await db.models.Tea.count();
    LOG.info(`Seeded ${numTeas} teas.`);
  } catch (err) {
    LOG.error(`ERROR: Tea - ${err.message}`);
  }

  LOG.info('Done with seeder................');

  return db;
};
