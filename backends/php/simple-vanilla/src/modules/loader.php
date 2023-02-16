<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 */

namespace Modules;

class Loader {

	/**
	 * The handler of the object.
	 */
	protected object $handler;

	/**
	 * Object name.
	 */
	private string $name;

	/**
	 * Object path.
	 */
	private string $path;

	/**
	 * Object full name.
	 */
	private string $full_name;

	/**
	 * Is the object available.
	 */
	private bool $is_available = false;

	/**
	 * Is the object loaded.
	 */
	private bool $is_loaded = false;

	/**
	 * Function __construct() : Create Loader
	 *
	 * @param string  $name
	 * @param string  $path
	 * @param string  $fullName
	 * @param boolean $autoLoad
	 */
	public function __construct( string $name, string $path, string $fullName, bool $autoLoad = false ) {
		$this->name = $name;
		$this->path = $path;
		$this->full_name = $fullName;

		if ( file_exists( $this->path ) ) {
			$this->is_available = true;
		}

		if ( $autoLoad ) {
			$this->load();
		}
	}

	/**
	 * Function load() : Load's file.
	 *
	 * @return boolean
	 */
	public function load(): bool {
		if ( $this->available() && require_once( $this->path ) ) {
			$this->handler = new $this->full_name;

			if ( $this->handler ) {
				return $this->is_loaded = true;
			}
		}

		return false;
	}

	/**
	 * Function available() : Is object available.
	 *
	 * @return boolean
	 */
	public function available(): bool {
		return $this->is_available;
	}

	/**
	 * Function loaded() : is object loaded.
	 *
	 * @return boolean
	 */
	public function loaded(): bool {
		return $this->is_loaded;
	}
}
