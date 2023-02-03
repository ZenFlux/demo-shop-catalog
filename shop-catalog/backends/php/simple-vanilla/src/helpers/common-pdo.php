<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Helpers;

use PDO;

class Common_Pdo {

	/**
	 * Function get_all() : Common \PDO method to get all data within table, with pages formula, etc.
	 *
	 * @param \PDO   $db          - PDO handler.
	 * @param string $table       - Table name (NO SQL Injection Protection).
	 * @param int    $page        - Current page.
	 * @param int    $per_page    - Max results per page.
	 * @param int    $total_count - Reference, applies the total count of results to this variable.
	 *
	 * @return array
	 *
	 * @todo Add Exceptions on invalid args. extend like, and extend wheres add operators.
	 */
	public static function get_all( PDO $db, string $table, int $page, int $per_page, int &$total_count ) {
		$offset = $page > 0 ? ceil( $page * $per_page ) : 0;
		$limit = $per_page;

		/* Total Count */
		$stmt = $db->prepare( "SELECT COUNT(*) FROM {$table} " );

		if ( ! $stmt->execute() ) {
			return [];
		}

		$total_count = $stmt->fetchColumn();

		if ( ! $total_count ) {
			return [];
		}

		$stmt = $db->prepare( "SELECT * FROM {$table} LIMIT :limit OFFSET :offset" );

		$stmt->bindValue( ':limit', $limit, PDO::PARAM_INT );
		$stmt->bindValue( ':offset', $offset, PDO::PARAM_INT );

		if ( $stmt->execute() ) {
			return $stmt->fetchAll( PDO::FETCH_ASSOC );
		}

		return [];
	}
}
