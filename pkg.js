const { exec } = require('pkg')

// exec([ './server/server.js', '--target', 'win', '--output', './build/server.exe' ])
// exec([ './client/client.js', '--target', 'win', '--output', './build/client.exe' ])
exec([ './server/server.js', '--target', 'linux', '--output', './build/server' ])
exec([ './client/client.js', '--target', 'linux', '--output', './build/client' ])