/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
const streamifier = require('streamifier');


const fs = require('fs');
const path = require('path');



const connectionString = 'DefaultEndpointsProtocol=https;AccountName=shlomytestcontainer;AccountKey=Z8ygBu1ITlB+UWJNpiGBRIa4YMJYizOfdFyJ//2f4MsAhq95TLz/gyEg3m2EXRNH7epa1R5l1u43+ASte5jveA==;EndpointSuffix=core.windows.net';
const containerName = 'imageblobtest';


//const blobName = 'shlomytestblob3.png'; // find a way to generate a unique name for linking to database

async function uploadImageToBlob(url, blobName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const stream = streamifier.createReadStream(response.data);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadStream(stream, response.data.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

//uploadImageToBlob('https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1695767057');



async function retreiveSteamDescription(appID) {
  const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`);
  if (!response.ok) {
    throw new Error('Error occured fetching songs!', appID);
  }
  const data = await response.json();
  try {
    return data[appID]['data']['header_image'];
  } catch {
    return 'No Description Available';
  }
}


async function seedGameImages() {
  const csvFile = fs.readFileSync(path.join(__dirname, `../dataset/dataset_limited.csv`), 'utf-8');

  const rows = csvFile.split('\n');
  //const dataset = [];

  for (let i = 1; i < 20; i++) {
    const row = rows[i].split(',');

    //fetch description from steam api
    const gameID = row[2].match(/\d+/g);
    const descriptionData = await retreiveSteamDescription(gameID[0]);

    console.log(i);

    const game = {
      title: row[1],
      steam_api: row[2],
      release_date: row[3].replace('/', '-'),
      peak: row[4],
      positive_reviews: row[5],
      negative_reviews: row[6],
      primary_genre: row[9],
      publisher: row[11],
      developer: row[12],
      description: descriptionData
    };
    //dataset.push(game);

    // build the url for the image
    //console.log(game.steam_api);
    const gameAPI = game.steam_api.match(/\d+/)[0];
    //console.log(gameAPI);

    const gameUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${gameAPI}/header.jpg?t=1695767057`;
    uploadImageToBlob(gameUrl, gameAPI + '.png');
  }
  console.log('done');
}

seedGameImages();


