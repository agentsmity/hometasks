import readline from 'readline';
import fs from 'fs';
import csvtojson from 'csvtojson';
import { pipeline } from 'stream';

export function run_1_1() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        console.log(reverse(input) + "\n");
    });

    function reverse(str) {
        return !str ? "" : reverse(str.substr(1)) + str[0];
    }
}

export function run_1_2() {
    const pathInputFile = './csv/input.csv';
    const pathOutputFile = './csv/output.txt';

    switch (process.argv[3]) {
        case "file":
            csvtojson({ignoreColumns: /(Amount)/})
                .fromFile(pathInputFile)
                .then((arr) => fs.writeFile(
                    pathOutputFile,
                    arr.map(el => JSON.stringify(el)).join("\n"),
                    'utf8',
                    function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    }
                ));
            break;
        case "pipeline":
            const rs = fs.createReadStream(pathInputFile);
            const ws = fs.createWriteStream(pathOutputFile);
            pipeline(
                rs,
                csvtojson({ignoreColumns: /(Amount)/}),
                ws,
                (err) => {
                    if (err) {
                      console.error('Pipeline failed.', err);
                    } else {
                      console.log('Pipeline succeeded.');
                    }
                }
            )
            break;
        default:
            const r = fs.createReadStream(pathInputFile);
            const w = fs.createWriteStream(pathOutputFile);
            r.pipe(csvtojson({ignoreColumns: /(Amount)/})).pipe(w);
    }
}