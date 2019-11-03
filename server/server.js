const argv = require('minimist')(process.argv.slice(2));
const colors = require('colors');
const net = require('net');
const clui = require('clui');
const clc = require('cli-color');
const Line = clui.Line;
const Sparkline = require('clui').Sparkline;
const arr = [0, 0]
const LiveArea  = require( 'clui-live');
const area = new LiveArea.LiveArea();


if(!argv.port){
  throw new Error("You need to provide port number");
}

const server = net.createServer(function(client) {
  const start = new Date()

  console.log('Client connect. Client local address : ' + client.localAddress + ':' + client.localPort + '. client remote address : ' + client.remoteAddress + ':' + client.remotePort);
  client.setEncoding('utf-8');
  // client.setTimeout(1000);

  // When receive client data.
  client.on('data', function (data) {

    // Print received client data and length.
    area.write(`Total Bytes: ${client.bytesRead} Data Len: ${data.length}`)

    // Server send data back to client use client net.Socket object.
    // client.end('Server received data : ' + data + ', send back to client data size : ' + client.bytesWritten);
  });


  client.on('end', function () {
    const end = new Date()
    const requestSeconds = (end - start) / 1000
    console.log('Client disconnect.');
    console.log(colors.green(`${client.bytesRead / requestSeconds } bytes/seconds`))
    // server.getConnections(function (err, count) {
    //
    //   if(!err)
    //   {
    //     // Print current connection count in server console.
    //     console.log("There are %d connections now. ", count);
    //   }else
    //   {
    //     console.error(JSON.stringify(err));
    //   }
    //
    // });
  });

  // When client timeout.
  client.on('timeout', function () {
    console.log('Client request time out. ');
  })
});


server.listen(argv.port, function () {

  console.log(colors.green('TCP Server is Booming on Port : ' + server.address().port));

  server.on('close', function () {
    console.log(colors.blue('TCP server socket is closed.'));
  });

  server.on('error', function (error) {
    console.error(colors.red(JSON.stringify(error)));
  });

});