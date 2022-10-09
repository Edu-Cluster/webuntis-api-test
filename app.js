const WebUntis = require('webuntis');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});
let untis;

rl.question('Enter username: ', (user) => {
    rl.input.on('keypress',  () => {
        const len = rl.line.length;
        readline.moveCursor(rl.output, -len, 0);
        readline.clearLine(rl.output, 1);
        for (let i = 0; i < len; i++) {
            rl.output.write("*");
        }
    });

    rl.question('Enter password: ', async (pw) => {
        untis = new WebUntis('HTL Pinkafeld', user, pw, 'euterpe.webuntis.com');

        await untis.login();

        console.log(untis);

        rl.removeAllListeners();

        promptForQueryInput();
    })
});

rl.on('close', async () => {
    console.log('Exiting...');

    await untis.logout();
});

function promptForQueryInput() {
    rl.question('Enter query: ', async (query) => {
        try {
            const queryArray = query.split(' ');
            const method = queryArray.shift();

            const result = await untis[method](...queryArray);

            console.log(JSON.parse(JSON.stringify(result)));
        } catch (err) {
            console.log(err);
        }

        promptForQueryInput();
    });
}

/*
untis
    .login()
    .then(() => {
        return untis.getRooms();
    })
    .then(async (rooms) => {
        console.log(rooms[177]);
        const test = await untis.getTimetableForToday(rooms[177].id, WebUntis.TYPES.ROOM)
        console.log(JSON.stringify(test));
    })
    .catch(err => console.log(err));
 */