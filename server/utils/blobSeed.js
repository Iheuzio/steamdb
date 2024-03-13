/* eslint-disable no-inline-comments */
/* eslint-disable max-len */
const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
const streamifier = require('streamifier');

const connectionString = 'DefaultEndpointsProtocol=https;AccountName=shlomytestcontainer;AccountKey=Z8ygBu1ITlB+UWJNpiGBRIa4YMJYizOfdFyJ//2f4MsAhq95TLz/gyEg3m2EXRNH7epa1R5l1u43+ASte5jveA==;EndpointSuffix=core.windows.net';
const containerName = 'imageblobtest';
const blobName = 'shlomytestblob3.png'; // find a way to generate a unique name for linking to database

async function uploadImageToBlob(url) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const stream = streamifier.createReadStream(response.data);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadStream(stream, response.data.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

uploadImageToBlob('https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg?t=1695767057');