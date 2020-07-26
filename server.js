const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require("./credentials.json");

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1stijJuChpMpFOrncR1CJcvTotl62lAYRMykKKc-c4TE');

async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    });

    // create a sheet and set the header row (run only the first time)
    let sheet = await doc.addSheet({ headerValues: ['name', 'age'] });

    await doc.loadInfo();
    sheet = await doc.sheetsByIndex[0];

    // append rows
    const newRows = await (sheet.addRows)([
        { name: 'Anant', age: '25' },
        { name: 'Ajay', age: '17' },
        { name: 'Test', age: '15' }
    ]);

    // read rows
    const data = await sheet.getRows({
        limit: 10
    }); // passing offset and limit are optional 

    data[2].age = 500; // update a value
    await data[2].save(); // save updates

    data.forEach((d) => {
        console.log(d.name);
        console.log(d.age);
        console.log("-----------");
    })
}

accessSpreadsheet();