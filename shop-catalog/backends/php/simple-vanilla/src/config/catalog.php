<?php
/**
 * @author Leonid Vinikov <leonidvinikov@gmail.com>
 **/
namespace Config;

class Catalog {
	const TABLE = 'catalog_items';

	const ITEMS_PER_PAGE = 8;

    const IMAGE_PATH_FORMAT = __DIR__  . '/../../public/products/product-%d.jpg';
}
