'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

const provision = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: 'hello.html'
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();

