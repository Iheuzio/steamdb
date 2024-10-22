/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
const streamifier = require('streamifier');
const fs = require('fs');
const path = require('path');

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=shlomytestcontainer;AccountKey=Z8ygBu1ITlB+UWJNpiGBRIa4YMJYizOfdFyJ//2f4MsAhq95TLz/gyEg3m2EXRNH7epa1R5l1u43+ASte5jveA==;EndpointSuffix=core.windows.net';
const containerName = 'imageblobtest';


// using Axios and Streamifier to download and upload the image to azure blob storage
async function uploadImageToBlob(url, blobName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const stream = streamifier.createReadStream(response.data);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadOptions = {
    blockSize: 4 * 1024 * 1024, // Set block size to 4MB
    concurrency: 20 // Set maximum parallel uploads
  };

  try {
    await blockBlobClient.uploadStream(stream, undefined, undefined, uploadOptions);
    console.log(`Upload block blob ${blobName} successfully`);
  } catch (error) {
    console.error('Error uploading blob:', error);
  }
}

async function seedGameImages() {
  const csvFile = fs.readFileSync(path.join(__dirname, `../dataset/game_data_all.csv`), 'utf-8');
  const rows = csvFile.split('\n');
  const batchSize = 1000;
  const timeout = 10000;


  // last place it stopped 13346
  for (let i = 1; i < 60000; i++) {
    const row = rows[i].split(',');

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
    };

    // build the url for the image
    const gameAPI = game.steam_api.match(/\d+/)[0];
    const gameUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${gameAPI}/header.jpg?t=1695767057`;

    // Await the uploadImageToBlob function call
    await uploadImageToBlob(gameUrl, gameAPI + '.png');

    // Add a timeout after every batchSize iterations
    if (i % batchSize === 0) {
      console.log(`Reached ${i} iterations, waiting for ${timeout / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }
  console.log('done');
}

seedGameImages();