require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require('mongodb');

let instance;

class DB {
  constructor(url){
    if (url) {
      if (!instance){
        instance = this;
        this.client = new MongoClient(url);
        this.db = null;
        this.collection = null;
      }
      return instance;
    }
    if (!instance){
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    await instance.client.connect();
    instance.db = await instance.client.db(dbname);
    // Send a ping to confirm a successful connection
    await instance.client.db(dbname).command({ ping: 1 });
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB database ' + dbname);
    instance.collection = await instance.db.collection(collName);
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
    return await instance.collection.findOne({ id: steamId });
  }

  // delete all records in db
  async deleteMany(filter) {
    // delete all records for the collection matching the filter
    const result = await instance.collection.deleteMany(filter);
    return result.deletedCount;
  }

  async createManyGameData(data) {
    return await instance.collection.insertMany(data);
  }

  async readAllUsers() {
    return await this.collection.find().toArray();
  }

  async createUser(profile) {
    return await instance.collection.insertOne(profile);
  }

}

module.exports = DB;

