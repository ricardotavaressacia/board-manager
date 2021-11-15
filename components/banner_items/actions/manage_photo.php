<?php
 
if(@$_REQUEST["action"] == "loadImage" && @$_REQUEST["itemValue"] == "") 
{
	header("Content-Type: image/jpg");
    print_r(file_get_contents($_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/no_image.jpg"));
}
elseif (@$_REQUEST["action"] == "loadImage" && @$_REQUEST["itemValue"] != "") 
{

    $i = $_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/no_image.jpg";

    $k = $_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/".@$_REQUEST["itemValue"];
    if (file_exists($k)) $i = $k;
 
    // output image
    header("Content-Type: image/jpg");
    print_r(file_get_contents($i));
}
elseif(@$_REQUEST["action"] == "uploadImage"){	
	$files = glob($_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/".$_SERVER['REMOTE_ADDR'].".*"); // get all file names
	foreach($files as $file){ 
		if(is_file($file))
			unlink($file); 
	}

	$source_img = $_FILES["file"]["tmp_name"];
	$destination_img =$_FILES["file"]["tmp_name"];
	$d = compress($source_img, $destination_img,100,400);					
	$photo_name = $_SERVER['REMOTE_ADDR'].'.'.pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    copy($d, $_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/".$photo_name);
 
    header("Content-Type: text/html; charset=utf-8");
    print_r("{state: true, itemId: '".@$_REQUEST["itemId"]."', itemValue: '".$photo_name."', extra: '".$photo_name."' }");
}
elseif(@$_REQUEST["action"] == "remove"){
	$files = glob($_SERVER['DOCUMENT_ROOT']."/board_manager/components/banner_items/assets/images/".$_SERVER['REMOTE_ADDR'].".*"); // get all file names
	foreach( $files as $file ){ 
		if( is_file($file) )
			unlink($file); 
	}
}else{
	echo "ESLE";
}


function compress($source, $destination, $quality,$newWidth) 
{
    $info = getimagesize($source);

    if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);

    elseif ($info['mime'] == 'image/gif') 
        $image = imagecreatefromgif($source);

    elseif ($info['mime'] == 'image/png') 
        $image = imagecreatefrompng($source);
		
	//resize	
	list($width, $height) = getimagesize($source);
	$newHeight = ($height / $width) * $newWidth;
	
	if( $newWidth < $width ){
		$tmp = imagecreatetruecolor($newWidth, $newHeight);
		imagecopyresampled($tmp, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
		//quality
		imagejpeg($tmp, $destination, $quality);
		return $destination;
	}else{
		//quality
		imagejpeg($image, $destination, $quality);
		return $destination;
	}
}

?>