'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Boom = require('boom');
const mongoose = require('mongoose');

const provision = async () => {

    mongoose.connect('mongodb://localhost:27017/test');

    const server = new Hapi.Server({
        host: 'localhost',
        port: 3000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOpts
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();

