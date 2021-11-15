<?php

	require_once $_SERVER['DOCUMENT_ROOT'].'/include/base.php';
	$db = new mysqli($MYSQL_HOST, $MYSQL_USER, $MYSQL_PWD, $MYSQL_DBINTRANET) or die("Connect failed: %s ". mysqli_connect_error());
	$db->set_charset("utf8");
	$path = $_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/";


	$novo_nome_foto ="";
	if($_POST["foto"] != ''){
		$antigo_nome_foto = $_POST["foto"];
		$ext = explode('.',$antigo_nome_foto);
		$novo_nome_foto = rand(111111111,999999999).'.'.$ext[(sizeof($ext)-1)];
		
		try{
			$source = $path.$antigo_nome_foto;
			$destination = $path.$novo_nome_foto;
			if(rename($source, $destination) ){

				try {
					$sql_05 = " UPDATE  
									dq_painel_qualidade 
								SET 
									description = ?, 
									image = ?, 
									duration = ?, 
									banner_id = ?, 
									active = ?, 
									updated_by = ?, 
									updated_at = ?
								WHERE 
									id = '".$_GET["element_id"]."'";
					$stmt = $db->prepare($sql_05);

					$stmt->bind_param("ssiiiss", $description, $image, $duration, $banner_id, $active, $updatedBy, $updatedAt);

				
					$description	=	$_POST["description"]; 
					$image			=	$novo_nome_foto;
					$duration		=	$_POST["duracao"]; 
					$banner_id		=	$_GET["banner_id"]; 
					$active			=	$_POST["ativo"]; 
					$updatedBy 		=	$res_login;
					$updatedAt 		= 	date("Y-m-d H:i:s"); 

					if( $stmt->execute() ){ 
						$message = array("status" => 200, "msg" =>  $db->insert_id);
					}

				} catch (mysqli_sql_exception $exception) {
					$message = array("status" => 200, "msg" =>  array( $exception));
				// $db->rollback();
					throw $exception;
				}
			} else {
				throw new Exception('Can not rename file'.$archivo_salida);
			}
		}catch (Exception $e){
			$message = array("status" => 400, "msg" => $e);
			throw $e;
		}
	}
	echo json_encode( $message );
?>