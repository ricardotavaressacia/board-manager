<?php

	require_once $_SERVER['DOCUMENT_ROOT'].'/include/base.php';
	$db = new mysqli($MYSQL_HOST, $MYSQL_USER, $MYSQL_PWD, $MYSQL_DBINTRANET) or die("Connect failed: %s\n". mysqli_connect_error());


	header("Content-type: text/xml");
	echo('<?xml version="1.0" encoding="UTF-8"?>');
	echo('<menu>');		
		/*
		echo('<item id="dashboard" text="" img="home.png">');
			echo('<userdata name="permissoes">'.json_encode($permissoes).'</userdata>');
		echo('</item>');	
	*/
	echo('</menu> ');			
	$db->close();
?>
