<?php
/*
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 */

header( 'Content-Type: application/json' );

use Core\Core;
use Modules\Command;

require __DIR__ . '/../src/boot.php';

header( 'Access-Control-Allow-Origin: http://localhost:3000' );
header( 'Access-Control-Allow-Headers:X-Request-With, Content-Type' );
header( 'Access-Control-Allow-Credentials: true' ); // for cookies

header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE' );

if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
	exit();
}

$cmd = ltrim( $_SERVER['REQUEST_URI'], '/' );

if ( $cmd == 'phpinfo' ) {
	phpinfo();
	exit();
}

$command = new Command();

if ( in_array( $_SERVER['REQUEST_METHOD'], [ 'POST', 'PATCH', 'DELETE' ] ) ) {
	$command->parse( $cmd );
	$command->setParameters( (array) json_decode( file_get_contents( 'php://input' ) ) );
} else if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
	$command->parse( $cmd );
}

$core = new Core( $command );
$core->execute();
