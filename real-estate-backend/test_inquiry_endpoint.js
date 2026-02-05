const http = require('http');

const data = JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "I am interested in this property.",
    propertyId: "12345",
    propertyTitle: "Test Property",
    agentName: "Agent Smith"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/inquiries',
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
