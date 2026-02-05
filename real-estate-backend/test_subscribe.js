const http = require('http');

const data = JSON.stringify({
    email: "test_subscriber@example.com"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/subscribe',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
