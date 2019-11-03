const net = require('net');
const runFor = 1000 * 10 ; //seconds
// This function create and return a net.Socket object to represent TCP client.
async function getConn(connName){

  const option = {
    host:'localhost',
    port: 3001
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
doTheMagic();

async function doTheMagic() {
  const nodeClient = await getConn('Node');
  const start = new Date();
  let stop = new Date();
  const inter = await setInterval(()=>{
    nodeClient.write('Node is more better than java. ');
    stop = new Date();
    // console.log(stop - start)
    if(stop - start > runFor){
      clearInterval(inter)
      nodeClient.end()
    }
  }, 0)
}






