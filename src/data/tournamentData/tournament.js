const fs = require('fs');
const csv = require('fast-csv');

module.exports = (file) => {
  let tournaments = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(__dirname + file)
      .pipe(csv.parse({ headers: true }))
      .on('error', (err) => reject(err))
      .on('data', (data) => tournaments.push(data))
      .on('end', () => resolve(tournaments));
  });
};
