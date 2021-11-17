<?php
	header("Content-type: text/xml");
	echo('<?xml version="1.0" encoding="UTF-8"?>'); 
	echo('<items>');
		echo('<item type="block" width="auto" blockOffset="5">');
 
			echo('<item type="block" width="auto" blockOffset="5">');
				echo('<item type="block" width="auto" blockOffset="0">');
					echo('<item type="button" name="remove" value="Remover Imagem" width="130" offsetLeft="0" position="absolute" inputLeft="4" inputTop="138"/>');
					echo ('<item type="image" id="foto" name="foto" url="components/banner_items/actions/manage_photo.php" value="" imageWidth="150"  required="true" imageHeight="150" inputWidth="130" inputHeight="130" offsetLeft="2" />');
					echo ('<item type="hidden" name="nome_foto" value="" />');
				echo('</item>');
				echo('<item type="newcolumn"  offset="40" />');
	
				echo('<item label="Description" 		labelWidth="70"  	name="description"  type="input" width="158"  value="" position="label-top" rows="4"/>');	
				echo('<item label="Duration(seconds)" 	labelWidth="105"	name="duracao"  	type="input" width="50"  validate="NotEmpty,ValidInteger" value=""  required="true" />');	
				
				
				echo('<item label="Active" labelWidth="105"  name="ativo" type="combo" width="50" validate="NotEmpty"  readonly="true" required="true" >');
				echo('<option value="1" text="Sim" selected="true" />');			
				echo('<option value="0" text="Não" />');					
				echo('</item>');
			echo('</item>');		
		echo('</item>');		
	echo('</items>');

?>