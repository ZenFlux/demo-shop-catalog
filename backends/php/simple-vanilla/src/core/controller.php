<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Core;

use Modules\Loader;

class Controller extends Loader {

	const PATH = __DIR__ . '/../controllers/';

	const NAMESPACE = '\\Controllers\\';

	public string $full_name;

	/**
	 *  Function __construct() : Create controller loader.
	 *
	 * @param string  $name
	 * @param boolean $auto_load
	 */
	public function __construct( string $name, $auto_load = false ) {
		$path = self::PATH . $name . '.php';
		$full_name = self::NAMESPACE . ucfirst( $name );

		parent::__construct( $name, $path, $full_name, $auto_load );
	}

	/**
	 * Function method_exists() : Check if the method exist in the controller.
	 *
	 * @param string $method
	 *
	 * @return boolean
	 */
	public function method_exists( string $method ): bool {
		return method_exists( $this->handler, $method );
	}

	/**
	 * Function callMethod() : Call a specific method in controller.
	 *
	 * @param string $method
	 * @param array  $params
	 *
	 * @return mixed
	 */
	public function call_method( string $method, array $params = [] ) {
		return call_user_func_array( [ $this->handler, $method ], $params );
	}
}
