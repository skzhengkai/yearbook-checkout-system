// Getting the IP of the server to be whitelisted from the cloud.mongodb
// Not actually needed as I changed the mongodb to allow all IPs because the server kept re-deploying and the IP kept changing 

const https = require('https');

function getPublicIpAddress() {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const ip = JSON.parse(data).ip;
          resolve(ip);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

getPublicIpAddress()
  .then(ip => {
    console.log(`Your public IP address is: ${ip}`);
  })
  .catch(err => {
    console.error('Error fetching public IP address:', err);
  });
