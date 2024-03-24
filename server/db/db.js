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
    return await Game.find({});
  }

  async readByDateOrNumber(field, value, operator) {
    const query = { [field] : { [`$${operator}`] : value } };
    return await Game.find(query);
  }

  async readByQuery(field, value) {
    const query = { [field] : { $regex: value, $options: 'i' } };
    return await Game.find(query);
  }

  async readBySteamAPIId(steamApiId) {
    return await Game.findOne({ steam_api: steamApiId });
  }

  // vague function
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

  // delete all records in db
  async deleteManyReviews(filter) {
    // delete all records for the collection matching the filter
    const result = await Review.deleteMany(filter);
    return result.deletedCount;
  }

  async createManyGameData(data) {
    return await Game.insertMany(data);
  }

  async readAllUsers() {
    return await Profile.find().toArray();
  }

  async createUser(profile) {
    return await Profile.create(profile);
  }

  async createReview(review) {
    return await Review.create(review);
  }

  async getAllReviewsOfGame(gameID){
    return await Review.find({game : gameID});
  }

  //adds an upvote to the current review
  async addUpVote(vote){
    return await Review.create(vote);
  }

  async getUserList(userID) {
    return await userList.findOne({ userID });
  }
  
  async createUserList(userID, games) {
    const userListData = await userList.findOne({ userID });
  
    if (userListData) {
      // Update the existing document
      userListData.games = games;
      return await userListData.save();
    } else {
      // Create a new document
      const newUserList = new userList({ userID, games });
      return await newUserList.save();
    }
  }
  
  async addUserGameList(userID, newGame) {
    const userListData = await userList.findOne({ userID });
    userListData.games.push(newGame);
    return await userListData.save();
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
  image_url: String
  //GameReviews: []
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
  //review based on logged in users steam id
  reviewerID: String,
  reviewerName: String,
  reviewer_img: String, 
  recommend: Boolean,
  //based on the games steam_api
  game: String
});

const Review = mongoose.model('Review', reviewSchema);

const userGameSchema = new mongoose.Schema({
  game: String,
  link: String,
  release_date: Date,
  peak: Number,
  positive_reviews: Number,
  negative_reviews: Number,
  primary_genre: String,
  publisher: String,
  developer: String,
  description: String,
  image_url: String,
  id: Number
});

const userListSchema = new mongoose.Schema({
  userID: String,
  games: [userGameSchema]
});

const userList = mongoose.model('UserList', userListSchema);

/**
 * Schema for Votes


basically, keeps track of which users have already upvoted reviews
const voteSchema = new mongoose.Schema({
  reviewID: String,
  reviewerID: String
});

const Vote = mongoose.model('Vote', voteSchema);
*/

module.exports = DB;

