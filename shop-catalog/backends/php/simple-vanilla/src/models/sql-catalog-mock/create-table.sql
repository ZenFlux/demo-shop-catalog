DROP TABLE IF EXISTS `%1$s`;
CREATE TABLE `%1$s`
(
	`id`    int(11)      NOT NULL AUTO_INCREMENT,
	`name`  varchar(255) NOT NULL,
	`price` decimal(10, 2) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 12
  DEFAULT CHARSET = latin1;
