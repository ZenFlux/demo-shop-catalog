<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 */

namespace Models;

use PDO;

use Helpers\Common_Pdo;

use Config\Catalog as CatalogConfig;


class Catalog {

	private PDO $db;

	/**
	 * Function __construct() : Create catalog Model.
	 *
	 * @param PDO $db
	 */
	public function __construct( PDO $db ) {
		$this->db = $db;
	}

	/**
	 * Function get() : Get Items of catalog, per page.
	 *
	 * @param int $page
	 * @param int $per_page
	 * @param int $total_count
	 *
	 * @return array
	 */
	public function get_all( int $page, int $per_page, &$total_count ) {
		return Common_Pdo::get_all( $this->db, CatalogConfig::TABLE, $page, $per_page, $total_count );
	}

	/**
	 * Function get_by_id() : Get Product by id.
	 *
	 * @param int $id
	 *
	 * @return array
	 */
	public function get_by_id( int $id ) {
		$stmt = $this->db->prepare( 'SELECT * FROM ' . CatalogConfig::TABLE . ' where id = ? LIMIT 1' );

		if ( $stmt->execute( [ $id ] ) ) {
			return $stmt->fetch( PDO::FETCH_ASSOC );
		}

		return [];
	}

	/**
	 * Function get_by_ids() : Get product(s) by id(s).
	 *
	 * @param array $ids
	 *
	 * @return array
	 */
	public function get_by_ids( array $ids ): array {
		$qMarks = implode( ',', str_split( str_repeat( '?', count( $ids ) ) ) );

		$stmt = $this->db->prepare( "SELECT id,name,price FROM " . CatalogConfig::TABLE . " WHERE id IN ({$qMarks})" );

		if ( $stmt->execute( $ids ) ) {
			return $stmt->fetchAll( PDO::FETCH_ASSOC );
		}

		return [];
	}

	public function create_table() {
		$query = sprintf( file_get_contents( __DIR__ . '/sql-catalog-mock/create-table.sql' ), CatalogConfig::TABLE );

		return $this->db->exec( $query );
	}

	public function insert_mock_items() {
		$query = sprintf( file_get_contents( __DIR__ . '/sql-catalog-mock/insert-items.sql' ), CatalogConfig::TABLE );

		return $this->db->exec( $query );
	}
}
