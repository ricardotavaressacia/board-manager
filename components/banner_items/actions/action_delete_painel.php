<?php
	require_once $_SERVER['DOCUMENT_ROOT'].'/include/base.php';
	$db = new mysqli($MYSQL_HOST, $MYSQL_USER, $MYSQL_PWD, $MYSQL_DBINTRANET) or die("Connect failed: %s ". mysqli_connect_error());
 
	try {

        $elementId = $_GET["element_id"];
  
        $sql_05 = " UPDATE  
                        dq_painel_qualidade 
                    SET 
                        deleted_by = ?, 
                        deleted_at = ?
                    WHERE 
                        id = '".$elementId."'";
        $stmt = $db->prepare($sql_05);

        $stmt->bind_param("ss", $deletedBy, $deletedAt);

        $deletedBy 	=	$res_login;
        $deletedAt 	= 	date("Y-m-d H:i:s"); 

        if( $stmt->execute() ){ 
            $message = array("status" => 200, "msg" => '');
        }
	} catch (mysqli_sql_exception $exception) {
		$message = array("status" => 400, "msg" =>  array( $exception));
		throw $exception;
	}
	echo json_encode( $message );

?>