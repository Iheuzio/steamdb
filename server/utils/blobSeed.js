/* eslint-disable max-len */
// /* eslint-disable no-inline-comments */
// /* eslint-disable max-len */
// const { BlobServiceClient } = require('@azure/storage-blob');
// const axios = require('axios');
// const streamifier = require('streamifier');
// const fs = require('fs');
// const path = require('path');
// //const fetch = require('node-fetch'); // Import fetch function

// const connectionString = 'DefaultEndpointsProtocol=https;AccountName=shlomytestcontainer;AccountKey=Z8ygBu1ITlB+UWJNpiGBRIa4YMJYizOfdFyJ//2f4MsAhq95TLz/gyEg3m2EXRNH7epa1R5l1u43+ASte5jveA==;EndpointSuffix=core.windows.net';
// const containerName = 'imageblobtest';


// async function uploadImageToBlob(url, blobName) {
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   const stream = streamifier.createReadStream(response.data);

//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   const uploadBlobResponse = await blockBlobClient.uploadStream(stream, response.data.length);
//   console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
// }


// async function seedGameImages() {
//   const csvFile = fs.readFileSync(path.join(__dirname, `../dataset/game_data_all.csv`), 'utf-8');
//   const rows = csvFile.split('\n');
//   const batchSize = 100;
//   const timeout = 30000;

//   for (let i = 1; i < 60000; i++) {
//     const row = rows[i].split(',');

//     //fetch description from steam api
//     //const gameID = row[2].match(/\d+/g);
//     //const descriptionData = await retreiveSteamDescription(gameID[0]);

//     console.log(i);

//     const game = {
//       title: row[1],
//       steam_api: row[2],
//       release_date: row[3].replace('/', '-'),
//       peak: row[4],
//       positive_reviews: row[5],
//       negative_reviews: row[6],
//       primary_genre: row[9],
//       publisher: row[11],
//       developer: row[12],
//       //description: descriptionData
//     };

//     // build the url for the image
//     const gameAPI = game.steam_api.match(/\d+/)[0];
// eslint-disable-next-line max-len
//     const gameUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${gameAPI}/header.jpg?t=1695767057`;
//     uploadImageToBlob(gameUrl, gameAPI + '.png');

//     // Add a timeout after every batchSize iterations
//     if (i % batchSize === 0) {
//       console.log(`Reached ${i} iterations, waiting for ${timeout / 1000} seconds...`);
//       await new Promise(resolve => setTimeout(resolve, timeout));
//     }
//   }
//   console.log('done');
// }

// seedGameImages();

/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
const streamifier = require('streamifier');
const fs = require('fs');
const path = require('path');
//const fetch = require('node-fetch'); // Import fetch function

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=shlomytestcontainer;AccountKey=Z8ygBu1ITlB+UWJNpiGBRIa4YMJYizOfdFyJ//2f4MsAhq95TLz/gyEg3m2EXRNH7epa1R5l1u43+ASte5jveA==;EndpointSuffix=core.windows.net';
const containerName = 'imageblobtest';


// async function uploadImageToBlob(url, blobName) {
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const response = await axios.get(url, { responseType: 'arraybuffer' });


//   const stream = streamifier.createReadStream(response.data);

//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   const uploadBlobResponse = await blockBlobClient.uploadStream(stream, response.data.length);
//   console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
// }

// async function uploadImageToBlob(url, blobName) {
//   // Create the BlobServiceClient object which will be used to create a container client
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   // Get blob content from url
//   const response = await axios.get(url, { responseType: 'arraybuffer' });

//   // Check if the size of the data exceeds the maximum block size limit
//   const MAX_BLOCK_SIZE = 256 * 1024 * 1024; // 256 MB for version 2019-12-12 and later
//   if (response.data.length > MAX_BLOCK_SIZE) {
//     throw new Error('The size of the data exceeds the maximum block size limit.');
//   }

//   // Convert buffer to Readable Stream
//   const stream = streamifier.createReadStream(response.data);

//   // Get blobClient for interaction with the blob
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   // set mimetype as determined from browser with file upload control
//   const uploadBlobResponse = await blockBlobClient.uploadStream(stream, response.data.length);
//   console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
// }



// async function uploadImageToBlob(url, blobName) {
//   // Create the BlobServiceClient object which will be used to create a container client
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   // Get blob content from url
//   const response = await axios.get(url, { responseType: 'arraybuffer' });

//   // Check if the size of the data exceeds the maximum block size limit
//   const MAX_BLOCK_SIZE = 256 * 1024 * 1024; // 256 MB for version 2019-12-12 and later
//   const dataSizeInBytes = Buffer.byteLength(response.data);
//   if (dataSizeInBytes > MAX_BLOCK_SIZE) {
//     throw new Error('The size of the data exceeds the maximum block size limit.');
//   }

//   // Convert buffer to Readable Stream
//   const stream = streamifier.createReadStream(response.data);

//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   const blockSize = 4 * 1024 * 1024; // Set block size to 4MB
//   const concurrency = 10; // Set maximum parallel uploads to 20
//   const uploadBlobResponse = await blockBlobClient.uploadStream(stream, blockSize, concurrency);
//   console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
// }

async function uploadImageToBlob(url, blobName) {
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get blob content from URL
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  // Convert buffer to Readable Stream
  const stream = streamifier.createReadStream(response.data);

  // Get blobClient for interaction with the blob
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload the image
  const uploadOptions = {
    blockSize: 4 * 1024 * 1024, // Set block size to 4MB
    concurrency: 10 // Set maximum parallel uploads
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
  const batchSize = 80;
  const timeout = 10000;

  for (let i = 1; i < 60000; i++) {
    const row = rows[i].split(',');

    //fetch description from steam api
    //const gameID = row[2].match(/\d+/g);
    //const descriptionData = await retreiveSteamDescription(gameID[0]);

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
      //description: descriptionData
    };

    // build the url for the image
    const gameAPI = game.steam_api.match(/\d+/)[0];
    const gameUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${gameAPI}/header.jpg?t=1695767057`;
    uploadImageToBlob(gameUrl, gameAPI + '.png');

    // Add a timeout after every batchSize iterations
    if (i % batchSize === 0) {
      console.log(`Reached ${i} iterations, waiting for ${timeout / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }
  console.log('done');
}

seedGameImages();