<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Controllers;

class Catalog extends Catalog_Base {
	/**
	 * Function index() : Get catalog items per page.
	 *
	 * @param int $page
	 *
	 * @return array
	 */
	public function index( int $page = 0 ): array {
		$result = [];

		$total_count = 0;
		$per_page = \Config\Catalog::ITEMS_PER_PAGE;

		$result['result'] = $this->catalog_model->get_all( $page, $per_page, $total_count );

		$result['pagination']['current'] = $page;
		$result['pagination']['total'] = $per_page;
		$result['pagination']['pages'] = ceil( $total_count / $per_page );
		$result['pagination']['perPage'] = $per_page;

		return $result;
	}

	/**
	 * Function get() : Get catalog items with specific id's.
	 *
	 * @param string $ids
	 *
	 * @return array
	 */
	public function get( string $ids ): array {
		return $this->catalog_model->get_by_ids( explode( ',', $ids ) );
	}
}
