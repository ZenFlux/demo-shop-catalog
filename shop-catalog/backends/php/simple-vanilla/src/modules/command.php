<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 */

namespace Modules;

class Command {

	/**
	 * Command name (controller).
	 */
	private string $name = 'welcome';

	/**
	 * Command method (function).
	 */
	private string $method = 'index';

	/**
	 * Command parameters
	 */
	private array $params = [];

	/**
	 * Function __construct() : Construct command Module and parse `$cmd`.
	 *
	 * @param string $cmd
	 * @param array  $params
	 */
	public function __construct( string $cmd = '', array $params = [] ) {
		$this->setParameters( $params );

		if ( ! empty( $cmd ) ) {
			$this->parse( $cmd );
		}
	}

	/**
	 * Function parse() : Parse command from format eg: '/name/methods/params'.
	 *
	 * @param string $cmd
	 *
	 * @return void
	 */
	public function parse( string $cmd ) {
		if ( ! empty( $cmd ) && is_string( $cmd ) ) {
			// Remove forward slash from the start & end.

			$cmd = trim( $cmd, '/' );
			$cmd = rtrim( $cmd, '/' );

			// Removes all illegal URL characters from a string.
			$cmd = explode( '/', $cmd );

			// Set controller.
			if ( isset( $cmd[0] ) && ! empty( $cmd[0] ) ) {
				// Only abc for controller name.
				$cmd[0] = preg_replace( "/[^a-zA-Z]+/", "", $cmd[0] );

				$this->name = $cmd[0];
				unset( $cmd[0] );
			}

			// Set method.
			if ( isset( $cmd[1] ) ) {
				// Only abc, digits and '_' for method name
				$cmd[1] = preg_replace( "/[^a-zA-Z0-9_]+/", "", $cmd[1] );

				$this->method = $cmd[1];
				unset( $cmd[1] );
			}

			// Set params.
			if ( ! empty( $cmd ) ) {

				foreach ( $cmd as $key => $param ) {
					$cmd[ $key ] = filter_var( $param, FILTER_SANITIZE_FULL_SPECIAL_CHARS );
				}

				$this->params = array_values( $cmd );
			}
		}
	}

	/**
	 * Function setParameters() : Set command parameters.
	 *
	 * @param array $params
	 *
	 * @return void
	 */
	public function setParameters( array $params ) {
		$this->params = $params;
	}

	/**
	 * Function getParameters() : Get command parameters.
	 *
	 * @return array
	 */
	public function getParameters() {
		return $this->params;
	}

	/**
	 * Function getName() : Get command name.
	 *
	 * @return string
	 */
	public function getName(): string {
		return $this->name;
	}

	/**
	 * Function getMethod() : Get command method name.
	 *
	 * @return string
	 */
	public function getMethod(): string {
		return $this->method;
	}

	/**
	 * Function __toString() : Return's command in JSON format.
	 *
	 * @return string
	 */
	public function __toString() {
		return json_encode( [
			$this->name,
			$this->method,
			$this->params,
		] );
	}
}
