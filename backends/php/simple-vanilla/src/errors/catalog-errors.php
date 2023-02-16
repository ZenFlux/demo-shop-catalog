<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Errors;

class Catalog_Errors {
	public static function item_not_found( $id ) {
		return new \Exception( "Catalog item with id: '$id' not found in cart." );
	}
}
