<?php
	header("Content-type: text/xml");	
	echo('<?xml version="1.0" encoding="UTF-8"?>');
	echo("<rows>");	
        echo("<row id = '1'>"); 
            echo "<cell><![CDATA[Banner Qualidade]]></cell>";
        echo("</row>");	

        for( $i=2 ; $i<5 ; $i++ ){
            echo("<row id = '".$i."'>"); 
                echo "<cell><![CDATA[Banner xpto ".$i."]]></cell>";
            echo("</row>");	
        }
	echo("</rows>");		
?>