import readline from 'readline';
import fs from 'fs';
import csvtojson from 'csvtojson';

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
    const r = fs.createReadStream('./csv/input.csv');
    const w = fs.createWriteStream('./csv/output.txt');

    r.pipe(csvtojson({ignoreColumns: /(Amount)/})).pipe(w);
}