/**
 * Sequelize database configurer.
 *
 * Returns a default function that applies higher-level
 * database configuration aspects, such as associations between
 * models.
 *
 * @link See: https://sequelize.org/master/manual/assocs.html
 *
 * @param {*} sequelize
 */

module.exports = async (sequelize) => {
  const {
    Team,
    Player,
    Quest,
    Location,
    Clue,
    Competition,
    User,
  } = await sequelize.models;

  // one team can have many players
  Team.hasMany(Player);
  Player.belongsTo(Team);

  // one quest can have many locations
  Quest.hasMany(Location);
  Location.belongsTo(Quest);

  // one location can have many clues
  Location.hasMany(Clue);
  Clue.belongsTo(Location);

  // one competition has exactly one quest (quests cannot be reused)
  Competition.hasOne(Quest);
  Quest.belongsTo(Competition);

  // one competition can have many teams; teams can join many competitions
  // belongsToMany requires a name for the many-to-many entity
  Competition.hasMany(Team);
  Team.belongsToMany(Competition, { through: 'CompetitionTeam' });

  // one user can create many quests
  User.hasMany(Quest);
  Quest.belongsTo(User);

  // one user can create many teams
  User.hasMany(Team);
  Team.belongsTo(User);

  // one user can create many competitions
  User.hasMany(Competition);
  Competition.belongsTo(User);

  // every player is the same as one user (one-to-one)
  // by default, it will put the key (in this case) in the Player table
  User.hasOne(Player);
  Player.belongsTo(User);
};
