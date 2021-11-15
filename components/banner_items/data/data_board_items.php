<?php
	require_once $_SERVER['DOCUMENT_ROOT'].'/include/base.php';
	$db = new mysqli($MYSQL_HOST, $MYSQL_USER, $MYSQL_PWD, $MYSQL_DBINTRANET) or die("Connect failed: %s ". mysqli_connect_error());
	$db->set_charset("utf8");
	$bannerId = $_GET["banner_id"];

	$sql_00 = "	SELECT 
					*
				FROM
					dq_painel_qualidade as t1
				WHERE 
						(t1.deleted_at IS NULL OR t1.deleted_at = '')
					AND t1.banner_id = '".$bannerId."'
				ORDER BY
					t1.created_at  DESC";
	$result_00 = $db->query($sql_00) or die($sql_00 . '-' . $db->error  );

	header("Content-type: text/xml");
	echo('<?xml version="1.0" encoding="UTF-8"?>'); 
	echo('<rows>');
		if( $result_00 ){
			while( $row_00 = $result_00->fetch_array() ){
				print("<row id=\"".$row_00["id"]."\">");
				$image = ( $row_00["image"] ? 'components/banner_items/assets/images/'.$row_00["image"] : '../img/no_image.png');
				print("<cell><![CDATA[".utf8_encode("<a href='".$image."' class='highslide' onClick='return hs.expand(this)' ><img src='".$image."'  height='80'  /></a>")."]]></cell>");
 
					print("<cell><![CDATA[".$row_00["description"]."]]></cell>");
					print("<cell><![CDATA[".$row_00["duration"]."]]></cell>");
					$status = ($row_00["active"] == 1 ? 'Sim' : 'Não' );
					print("<cell><![CDATA[".$status."]]></cell>"); 
				print("</row>");
			}
			if( $result_00->num_rows == 0 ){
				print("<row id=\"".$row_00["id"]."\">");
					print("<cell></cell>");
					print("<cell><![CDATA[No data avaliable in table]]></cell>");
					print("<cell></cell>");
				print("</row>");
			}
		}
	echo '</rows>';	
?>