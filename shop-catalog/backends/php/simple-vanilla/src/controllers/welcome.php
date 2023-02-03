<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Controllers;

use Config\Database as DatabaseConfig;
use Services\Database as DatabaseService;
use Models\Catalog as CatalogModel;

use Errors\E_System_Error_Codes;

use function Utils\str_replace_first;

class Welcome {

	/**
	 * Function index() : Get Welcome Message.
	 *
	 * @return array
	 */
	public function index(): array {
		if ( ! DatabaseConfig::IS_CONFIGURED ) {
			return [
				'code' => E_System_Error_Codes::DB_NOT_CONFIGURED,
				'error'  => true,
			];
		}

		$db = DatabaseService::get_instance();

		return [
			'success'  => true,
			'message' => 'Welcome to Simple Vanilla PHP Backend.',
		];
	}

	function setup_database( $host, $port, $username, $password, $database_name, $skip_create = false ) {
		if ( DatabaseConfig::IS_CONFIGURED ) {
			throw new \Exception( 'Install is already configured.' );
		}

		$database = new DatabaseService( $host, $username, $password, $port );

		if ( ! $skip_create ) {
			$database->create_database( $database_name );
		}

		$database->use_database( $database_name );

		$catalog = new CatalogModel( $database->get_connection() );
		$catalog->create_table();
		$catalog->insert_mock_items();

		$database_config_path = __DIR__  .'/../config/database.php';
		$database_config_content = file_get_contents( $database_config_path );

		// TODO: Optimize.
		$database_config_content = str_replace_first( '%DB_HOST%', $host, $database_config_content );
		$database_config_content = str_replace_first( '%DB_NAME%', $database_name, $database_config_content );
		$database_config_content = str_replace_first( '%DB_USER%', $username, $database_config_content );
		$database_config_content = str_replace_first( '%DB_PASS%', $password, $database_config_content );
		$database_config_content = str_replace_first( '%DB_PORT%', $port, $database_config_content );
		$database_config_content = str_replace_first( 'const IS_CONFIGURED = false;', 'const IS_CONFIGURED = true;', $database_config_content );

		file_put_contents( $database_config_path, $database_config_content );

		return [
			'success' => true,
		];
	}
}
