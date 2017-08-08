const fs = require('fs');
const split = require('split');
const path = require('path');

const read = filename =>
    new Promise((resolve, reject) => {
        let label = '';
        let sequence = '';

        const res = [];
        const stream = fs.createReadStream(filename, { encoding: 'ascii' }).pipe(split());

        stream.on('data', line => {
            if (line.match(/^>/)) {
                if (label && sequence) res.push({ label, sequence });

                label = line.replace(/^>/, '').trim();
                sequence = '';
            } else {
                sequence += line.replace(/\s+/g, '');
            }
        });

        stream.on('close', () => {
            if (label && sequence) res.push({ label, sequence });

            resolve(res);
        });

        stream.on('error', reject);
    });

const readSingle = filename =>
    read(filename).then(data => {
        if (data.length > 0) return data[0];
        return { label: '', sequence: '' };
    });

const write = (data, filename) =>
    new Promise((resolve, reject) => {
        const dataArray = Array.isArray(data) ? data : [data];
        const result = dataArray.reduce((prev, current) => `${prev}>${current.label}\n${current.sequence}\n\n`, '');

        fs.writeFile(filename, result, err => {
            if (!err) resolve(result);
            else reject(err);
        });
    });

const readFromFolder = async folder => {
    const list = fs.readdirSync(folder);
    const data = [];

    for (file of list) {
        const single = await read(path.join(folder, file));
        data.push(...single);
    }

    return data;
};

module.exports.read = read;
module.exports.readSingle = readSingle;
module.exports.write = write;
module.exports.readFromFolder = readFromFolder;
