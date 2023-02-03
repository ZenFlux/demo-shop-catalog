<?php

namespace Utils;

/**
 * Function str_replace_first() - Replace the first occurrence of a string.
 *
 * @author https://stackoverflow.com/a/2606638/974401
 *
 * @param string $search
 * @param string $replace
 * @param string $subject
 *
 * @return array|string|string[]
 */
function str_replace_first( $search, $replace, $subject ) {
	$pos = strpos( $subject, $search );

	if ( $pos !== false ) {
		return substr_replace( $subject, $replace, $pos, strlen( $search ) );
	}

	return $subject;
}
