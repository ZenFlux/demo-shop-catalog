<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Controllers;

use Models\Catalog;
use Services\Database;

abstract class Catalog_Base {
	/**
	 * Instance of catalog model.
	 */
	protected Catalog $catalog_model;

	/**
	 * Function __construct() Create Catalog Controller
	 */
	public function __construct() {
		$this->catalog_model = new Catalog( Database::get_instance()->get_connection() );
	}
}
