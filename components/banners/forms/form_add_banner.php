<?php
	header("Content-type: text/xml");
	echo('<?xml version="1.0" encoding="UTF-8"?>'); 
	echo('<items>');
		echo('<item type="block" width="auto" blockOffset="5">');
 
			echo('<item type="block" width="auto" blockOffset="5">');
				echo('<item label="Name" 				labelWidth="110"	name="name"  	type="input" width="180"	required="true" value=""  />');	
				echo('<item label="Duration/Element" 	labelWidth="110"	name="duration"	type="input" width="50"  	required="true" validate="NotEmpty,ValidInteger" value=""   />');	
				echo('<item label="Active" 				labelWidth="110"  	name="ativo" 	type="combo" width="50" 	required="true" validate="NotEmpty"  readonly="true"  >');
				echo('<option value="1" text="Sim" selected="true" />');			
				echo('<option value="0" text="Não" />');					
				echo('</item>');
			echo('</item>');		
		echo('</item>');		
	echo('</items>');

?>