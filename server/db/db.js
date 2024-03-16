require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');

let instance;

class DB {
  constructor(url){
    if (url) {
      if (!instance){
        instance = this;
        this.client = mongoose.connect(dbUrl);
        this.db = null;
        this.collection = null;
      }
      return instance;
    }
    if (!instance){
      instance = this;
      this.client = mongoose.connect(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client;
    instance.db = mongoose.connection.db;
    // Send a ping to confirm a successful connection
    await instance.db.command({ ping: 1 });
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB database ' + dbname);
    instance.collection = instance.db.collection(collName);
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  async readAll() {
    return await instance.collection.find().toArray();
  }

  async readByDateOrNumber(field, value, operator) {
    const query = {};
    
    switch (operator) {
    case 'gt':
      query[field] = { $gt: value };
      break;
    case 'lt':
      query[field] = { $lt: value };
      break;
    case 'eq':
      query[field] = { $eq: value };
      break;
    default:
      break;
    }

    return await instance.collection.find(query).toArray();
  }

  async readBySteamAPIId(steamApiId) {
    return await instance.collection.findOne({ steam_api: steamApiId });
  }

  async create(quote) {
    return await instance.collection.insertOne(quote);
  }
  async getUserBySteamId(steamId) {
    return await Profile.findOne({ id: steamId });
  }

  // delete all records in db
  async deleteManyGames(filter) {
    // delete all records for the collection matching the filter
    const result = await Game.deleteMany(filter);
    return result.deletedCount;
  }

  async createManyGameData(data) {
    return await Game.insertMany(data);
  }

  async readAllUsers() {
    return await this.collection.find().toArray();
  }

  async createUser(profile) {
    return await Profile.create(profile);
  }

  async createReview(review) {
    return await Review.create(review);
  }

}

/**
   * Schema For Games
*/

const gameSchema = new mongoose.Schema({
  title: String,
  steam_api: String,
  release_date: Date,
  peak: Number,
  positive_reviews: Number,
  negative_reviews: Number,
  primary_genre: String,
  publisher: String,
  developer: String,
  description: String,
  GameReviews: []
});

const Game = mongoose.model('Game', gameSchema);

/**
   * Schema For Profiles
*/

const profileSchema = new mongoose.Schema({
  provider: String,
  _json : {
    steamid: {type: String, required: true},
    communityvisibilitystate: Number,
    profilestate: Number,
    personaname: String,
    profileurl: String,
    avatar: String,
    avatarmedium: String,
    avatarfull: String,
    personastate: Number,
    primaryclanid: String,
    timecreated: Number,
    personastateflags: Number
  },
  id: String,
  displayName: String,
  photos: [],
  identifier: String
});

const Profile = mongoose.model('Profile', profileSchema);

/**
   * Schema For Reviews
*/

const reviewSchema = new mongoose.Schema({
  title: String,
  content: String,
  score: Number,
  reviewer: String
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = DB;

