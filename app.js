const WebUntis = require('webuntis');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let untis;

rl.stdoutMuted = true;
rl.question('Enter pw: ', function (pw) {
    untis = new WebUntis('HTL Pinkafeld', 'VladuRay', pw, 'euterpe.webuntis.com');

    rl.close();
});

rl.on('close', function () {
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
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
        rl.output.write("*");
    else
        rl.output.write(stringToWrite);
};