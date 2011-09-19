# Bill Budget
## Simple monthly bill tracker

My first application with NodeJS. Wanted to build something simple but useful. 

### To Install

Install the following modules:
*dateformat
*ejs
*express
*mysql
*node-date

Load the following sql:

	CREATE TABLE `bills` (
	  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
	  `name` varchar(255) DEFAULT NULL,
	  `amount` float DEFAULT NULL,
	  `paid` tinyint(1) DEFAULT '0',
	  `date` datetime DEFAULT NULL,
	  PRIMARY KEY (`id`)
	) ENGINE=MyISAM DEFAULT CHARSET=utf8;

Edit the config.js to match your database needs and what port you want.

Run `node app.js`

Then go to http://localhost:4000 (assuming you used port 4000)