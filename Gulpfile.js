'use strict';

const gulp   = require( 'gulp' );
const jshint = require( 'gulp-jshint' );

const todoApi = require( './todomvc-api' );

const server = require( './server' );
const api = server.api;
const app = server.app;

gulp.task( 'validate-api', cb => {
    var server = api.listen( 8080, () => {
        todoApi.validate( (err, stats) => {
            server.close( () => {
                if ( stats && ( stats.errors || stats.failures ) ) {
                    cb( 'api validation failed' );

                    return ;
                }
                cb( err && err.message || err );
            } );
        } );
    } );
} );

gulp.task( 'lint', () => {
    return gulp.src( ['*.js', '*/*.js'] )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) );
} );

gulp.task( 'serve', cb => {
    app.listen( 8000, cb );
} );

gulp.task( 'test', [ 'validate-api' ] );
