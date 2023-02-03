<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Controllers;

use Errors\Cart_Errors;
use Errors\Catalog_Errors;

class Cart extends Catalog_Base {

	/**
	 * Contains all products in cart.
	 */
	private array $cart;

	/**
	 * Function __construct() : Create Cart Controller.
	 */
	public function __construct() {
		parent::__construct();

		if ( isset( $_COOKIE['cart'] ) ) {
			$this->cart = json_decode( $_COOKIE['cart'], true );
		}
	}

	/**
	 * Function __destruct() : Destroy the controller.
	 */
	public function __destruct() {
		setcookie( 'cart', json_encode( $this->cart ) );
	}

	/**
	 * Function index() : Get Cart.
	 */
	public function index(): array {
		return $this->cart;
	}

	/**
	 * Function add_item() Add item to cart.
	 *
	 * @param int $id
	 * @param int $amount
	 *
	 * @return array|\Exception
	 */
	public function add_item( int $id, int $amount ) {
		if ( $product = $this->catalog_model->get_by_id( $id ) ) {
			// Search item in kart.
			$key = $this->search_item_in_cart( $id );

			$product = [
				'id' => $product['id'],
				'amount' => $amount,
			];

			// If item exist in cart, update amount.
			if ( ! empty( $key ) ) {
				$product['amount'] += $this->cart[ $key ]['amount'];

				$this->cart[ $key ] = $product;
			} else {
				$this->cart[] = $product;
			}

			return $product;
		}

		return Catalog_Errors::item_not_found( $id );
	}

	/**
	 * Function remove_item() : Remove item from cart.
	 *
	 * @param int $id
	 *
	 * @return array|\Exception
	 */
	public function remove_item( int $id ) {
		$key = $this->search_item_in_cart( $id );

		if ( false === $key ) {
			return Cart_Errors::item_not_found( $id );
		}

		if ( $product = $this->catalog_model->get_by_id( $id ) ) {
			$product['amount'] = $this->cart[ $key ]['amount'];

			unset( $this->cart[ $key ] );

			// Rebase array keys after un-setting elements, cart send in JSON format.
			$this->cart = array_values( $this->cart );

			return $product;
		}

		return Catalog_Errors::item_not_found( $id );
	}

	/**
	 * Function search_item_in_cart() : Search item in cart.
	 *
	 * Return `false` when item not found.
	 *
	 * @param int $id
	 *
	 * @return false|int|string
	 */
	private function search_item_in_cart( $id ) {
		return array_search( $id, array_column( $this->cart, 'id' ) );
	}
}
