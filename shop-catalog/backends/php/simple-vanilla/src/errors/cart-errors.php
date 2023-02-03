<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Errors;

class Cart_Errors {
	public static function item_not_found( $id ) {
		return new \Exception( "Cart item with id: '$id' not found in cart." );
	}
}
