import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function run_1_1() {
    rl.on('line', (input) => {
        console.log(reverse(input) + "\n");
    });

    function reverse(str) {
        return !str ? "" : reverse(str.substr(1)) + str[0];
    }
}