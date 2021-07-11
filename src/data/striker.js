const fs = require('fs');
const csv = require('fast-csv');

module.exports = (file, type) => {
  let arrayTotal = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(__dirname + file)
      .pipe(csv.parse({ headers: true }))
      .on('error', (err) => reject(err))
      .on('data', (data) => {
        const regex = /(?!\s)([A-zÀ-ú\s]+) \(([A-zÀ-ú\s]+)\)/g;
        const result = regex[Symbol.matchAll](data.topScorer);

        const topScorer = Array.from(result, (x) => x);
        const arr = topScorer.map((element) => {
          const Obj = {
            player: element[1],
            team: element[2],
          };
          return Obj;
        });

        let striker = {
          topScorer: arr,
          goals: parseInt(data.goals),
        };

        arrayTotal.push(striker);
      })
      .on('end', () => resolve(arrayTotal));
  });
};
