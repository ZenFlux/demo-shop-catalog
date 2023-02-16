<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/

namespace Core;

use Exception;
use Modules\Command;

class Core {

	/**
	 * The controller instance.
	 */
	private Controller $controller;

	/**
	 * Command to execute.
	 */
	private Command $command;

	/**
	 * Function __construct() : Create new core.
	 *
	 * @param string Command
	 *
	 * @throws \Exception
	 */
	public function __construct( Command $cmd ) {
		$this->command = $cmd;
		$this->controller = new Controller( $cmd->getName() );
	}

	/**
	 * Function execute() Execute command.
	 *
	 * @throws \Exception
	 *
	 * @return mixed
	 */
	public function execute() {
		$cmd = $this->command;

		if ( ! $this->controller->available() ) {
			throw new Exception( "controller: `{$cmd->getName()}` not found, in: " . __FILE__ . '(' . __LINE__ . ')' );
		}

		if ( $this->controller->load() ) {
			if ( ! $this->controller->method_exists( $cmd->getMethod() ) ) {
				throw new Exception( "method: `{$cmd->getMethod()}` not found in controller: `{$cmd->getName()}` in: " . __FILE__ . '(' . __LINE__ . ')' );
			}

			$response = $this->controller->call_method( $cmd->getMethod(), $cmd->getParameters() );

			if ( $response instanceof \Exception ) {
				throw $response;
			}

			echo json_encode( $response );

			return $response;
		}

		return false;
	}
}
