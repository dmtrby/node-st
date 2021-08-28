const { stdin, stdout } = process;

const reverseData = v => v.toString().trim().split('').reverse().join('');

stdin.on('data', data => {
    const reversedInput = reverseData(data);
    stdout.write(reversedInput + '\n');
});