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
function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

if(!argv.port){
  throw new Error("You need to provide port number");
}

const server = net.createServer(function(client) {
  const start = new Date()
  let start2 = new Date()
  let bytesNow = 0
  let totals = 0

  console.log('Client connect. Client local address : ' + client.localAddress + ':' + client.localPort + '. client remote address : ' + client.remoteAddress + ':' + client.remotePort);
  client.setEncoding('utf-8');
  // client.setTimeout(1000);

  // When receive client data.
  client.on('data', function (data) {

    // Print received client data and length.
    // area.write(`Total Bytes: ${client.bytesRead} Packet Bytes: ${Buffer.byteLength(data, 'utf8')} TotalPlus: ${totals / 1048576}`)
    totals = totals + data.length
    // console.log(client.bytesRead)
    const end2 = new Date()
    if(end2 - start2 > 1000){
      const requestSeconds = (end2 - start2) / 1000
      console.log(colors.green(`${formatBytes(totals, 2)}/seconds`))
      start2 = new Date();
      totals = 0
      // console.log(bytesNow)
    }
    // console.log(data)

    // Server send data back to client use client net.Socket object.
    // client.end('Server received data : ' + data + ', send back to client data size : ' + client.bytesWritten);
  });


  client.on('end', function () {
    const end = new Date()
    const requestSeconds = (end - start) / 1000
    console.log('Client disconnect.');
    console.log(colors.green(`${ formatBytes(client.bytesRead / requestSeconds, 2)}/seconds`))
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

