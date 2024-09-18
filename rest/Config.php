<?php
//DB Connection
define('DB_NAME', $_ENV['DB_NAME']);
define('DB_PORT',  $_ENV['DB_PORT'] );
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);
define('DB_HOST', $_ENV['DB_HOST']);
define('DB_USERNAME', $_ENV['DB_USERNAME']); 
define('MYSQL_ATTR_SSL_CA', $_ENV['MYSQL_ATTR_SSL_CA']); 

// JWT Secret
define('JWT_SECRET',  $_ENV['JWT_SECRET']); 

//email 
define('SMTP_HOST',  $_ENV['SMTP_HOST'] ); 
define('SMTP_USERNAME', $_ENV['SMTP_USERNAME']); 
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD']); 
define('SMTP_PORT', $_ENV['SMTP_PORT']); 
define('SMTP_ENCRYPTION', $_ENV['SMTP_ENCRYPTION']);// tls or ssl

//Open API
define('OPENAI_API_KEY', $_ENV['OPENAI_API_KEY']);