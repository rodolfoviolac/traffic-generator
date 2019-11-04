const argv = require('minimist')(process.argv.slice(2));
const net = require('net');
const fs = require("fs");
const istream = fs.createReadStream('./computerNetworking.pdf');

if(!argv.port){
  throw new Error("You need to provide PORT number");
}
if(!argv.ip){
  throw new Error("You need to provide IP number");
}


// This function create and return a net.Socket object to represent TCP client.
async function getConn(connName){
  const option = {
    host: argv.ip,
    port: argv.port
  }

  const client = net.createConnection(option, function () {
    console.log('Connection name : ' + connName);
    console.log('Connection local address : ' + client.localAddress + ":" + client.localPort);
    console.log('Connection remote address : ' + client.remoteAddress + ":" + client.remotePort);
  });

  // client.setTimeout(1000);
  client.setEncoding('utf8');

  // When receive server send back data.
  client.on('data', function (data) {
    console.log('Server return data : ' + data);
  });

  // When connection disconnected.
  client.on('end',function () {
    console.log('Client socket disconnect. ');
  });

  client.on('timeout', function () {
    console.log('Client connection timeout. ');
  });

  client.on('error', function (err) {
    console.error(JSON.stringify(err));
  });

  return client;
}


getConn('Node').then(socket => {
  istream.on("readable", function () {
    let data;
    while (data = this.read()) {
      for(let i = 0; i< 10; i++){
        socket.write(data)
      }
    }
  })

  istream.on("end", function(){
    socket.end();
  })
})









