'user strict';

const bodyParser = require( 'body-parser' );
const express    = require( 'express' );
const todomvc    = require( 'todomvc' );

const todomvcApi = require( 'todomvc-api' );

const todos      = require( './todos.js' );

const app = module.exports.app = express();
const api = module.exports.api = express();

app.use( '/api', [ todomvcApi.server, api ] );
app.use( todomvc );

app.get( '/', (request, response) => {
    response.redirect( '/examples/angularjs' );
} );

app.get( '/_ah/health', (request, response) => {
    response.status( 200 )
        .set( 'Content-Type', 'text/plain' )
        .send( 'ok' );
} );

api.use( bodyParser.json() );

api.get( '/', (request, response) => {
    response.status( 200 )
        .set( 'Content-Type', 'text/plain' )
        .send( 'ok' );
} );

api.get( '/todos', (request, response) => {
    todos.getAll( _handleApiResponse( response ) );
} );

api.get( '/todos/:id', (request, response) => {
    var id = parseInt( request.params.id, 10 );

    todos.get( id, _handleApiResponse( request ) );
} );

api.post( '/todos', (request, response) => {
    todos.insert( request.body, _handleApiResponse( response, 201 ) );
} );

api.put( '/todos/:id', (request, response) => {
    var id = parseInt( request.params.id, 10 );

    todos.update( id, request.body,  );
} );

api.delete( '/todos', (request, response) => {
    todos.deleteCompleted( _handleApiResponse( request, 204 ) );
} );

api.delete( '/todos/:id', (request, response) => {
    var id = parseInt( request.params.id, 10 );

    todos.delete( id, _handleApiResponse( request, 204 ) );
} );

function _handleApiResponse(response, successStatus) {
    return function (err, payload) {
        if ( err ) {
            console.error( err );

            response.status( err.code )
                .send( err.message );

            return ;
        }

        if ( successStatus ) {
            response.status( successStatus );
        }

        response.json( payload );
    };
}

todomvc.leaanJson = {
    name: 'Google Cloud Platform',
    description: 'Google Cloud Platform is now available via Node.js with gcloud-node.',
    homepage: 'http://cloud.google.com/solutions/nodejs',
    examples: [
        {
            name: 'gcloud + Express',
            url: ''
        }
    ]
};
