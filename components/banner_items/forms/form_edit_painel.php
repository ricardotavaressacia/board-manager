<?php
	require_once $_SERVER['DOCUMENT_ROOT'].'/include/base.php';
	$db = new mysqli($MYSQL_HOST, $MYSQL_USER, $MYSQL_PWD, $MYSQL_DBINTRANET) or die("Connect failed: %s ". mysqli_connect_error());
	$db->set_charset("utf8");

	$elementId = $_GET["element_id"];

	$sql_00 = "	SELECT 
					*
				FROM
					dq_painel_qualidade as t1
				WHERE 
						(t1.deleted_at IS NULL OR t1.deleted_at = '')
					AND t1.id = '".$elementId."'
				ORDER BY
					t1.created_at  DESC";
	$result_00 = $db->query($sql_00) or die($sql_00 . '-' . $db->error  );

	if( $result_00 ){
		$row_00 = $result_00->fetch_array();
		$image = $row_00["image"];
		$duration = $row_00["duration"];
		$active = $row_00["active"];
		$description = $row_00["description"];
	}

	header("Content-type: text/xml");
	echo('<?xml version="1.0" encoding="UTF-8"?>'); 
	echo('<items>');
		echo('<item type="block" width="auto" blockOffset="5">');
 
			echo('<item type="block" width="auto" blockOffset="5">');
				echo('<item type="block" width="auto" blockOffset="0">');
					echo('<item type="button" name="remove" value="Remover Imagem" width="130" offsetLeft="0" position="absolute" inputLeft="4" inputTop="138"/>');
					echo ('<item type="image" id="foto" name="foto" url="components/banner_items/actions/manage_photo.php" value="'.$image.'" required="true" imageWidth="150" imageHeight="150" inputWidth="130" inputHeight="130" offsetLeft="2" />');
					echo ('<item type="hidden" name="nome_foto" value="" />');
				echo('</item>');
				echo('<item type="newcolumn"  offset="40" />');
	
				echo('<item label="Duração" 	labelWidth="70"  name="duracao"  type="input" width="85"  validate="NotEmpty,ValidInteger" value="'.$duration.'"  required="true" />');	

				echo('<item label="Ativo" labelWidth="70"  name="ativo" type="combo" width="85" validate="NotEmpty"  readonly="true" required="true" >');
					if( $active ){
						echo('<option value="1" text="Sim" selected="true" />');			
						echo('<option value="0" text="Não" />');					
					}else{
						echo('<option value="1" text="Sim" />');			
						echo('<option value="0" text="Não" selected="true" />');	
					}
				echo('</item>');
				echo('<item label="Descrição" 	labelWidth="70"  name="description"  type="input" width="158"  value="'.$description.'" position="label-top" rows="4"/>');	
			echo('</item>');		
			echo('</item>');		
	
	echo('</items>');

?>