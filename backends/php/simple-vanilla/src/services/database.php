<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 */

namespace Services;

use PDO;

class Database {

	/**
	 * Self instance.
	 */
	private static ?Database $instance = null;

	/**
	 * Self PDO handler.
	 */
	private PDO $connection;

	/**
	 * Function __construct() : Create database service.
	 *
	 * @param string $host
	 * @param string $user
	 * @param string $pass
	 * @param string|bool $name
	 */
	public function __construct( string $host, string $user, string $pass, string $port = '3306', $name = false ) {
		$this->connection = new PDO( "mysql:host={$host};port={$port}", $user, $pass, [
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
		] );

		$this->connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		if ( $name ) {
			// Select the db.
			$this->use_database( $name );
		}
	}

	public function create_database( string $name ) {
		return $this->connection->exec( "CREATE DATABASE {$name}" );
	}

	public function use_database( string $name ) {
		return $this->connection->exec( "USE {$name}" );
	}

	public static function get_instance() {
		if ( ! self::$instance ) {
			$host = \Config\Database::HOST;
			$user = \Config\Database::USERNAME;
			$pass = \Config\Database::PASSWORD;
			$name = \Config\Database::NAME;
			$port = \Config\Database::PORT;

			self::$instance = new self( $host, $user, $pass, $port, $name );
		}

		return self::$instance;
	}

	public function get_connection() {
		return $this->connection;
	}

	public function get_error_info() {
		return json_encode( $this->get_connection()->errorInfo() );
	}
}
