function init_banners(){
	grid_banners();
}




//----------------------------------------------------------------------------------------------------
//--- List of Banners 
//----------------------------------------------------------------------------------------------------
function grid_banners(){
	myGrid = myLayout2.cells("a").attachGrid();
	
	myGrid.setImagesPath("./imgs/");
	myGrid.setHeader("Name");
	myGrid.setInitWidths("250");
	myGrid.setColAlign("left");
	myGrid.setColTypes("ro");
	
	myGrid.setStyle("text-align:center;vertical-align: middle !important;", "", "", "");
	myGrid.init();
	myGrid.clearAndLoad(`components/banners/data/data_banners.php`, function() { 
	});

 
	myGrid.attachEvent("onRowSelect", function(id,ind){

		myLayout2.cells("a").progressOn();
		myGrid2.clearAndLoad(`components/banner_items/data/data_board_items.php?banner_id=${id}`, function() { 
			myLayout2.cells("a").progressOff();
		
		});
	});
	 
}



/*
function painel() {
	myLayout.cells("b").progressOn();
	myLayout.cells("b").setText("DQ > Gerir");
 
	toolbar_paineis();
	grid_paineis();
}


function toolbar_paineis(){
	myToolbar = myLayout.cells("b").attachToolbar();
	myToolbar.addButton("add_painel", 1, "Adicionar", "imgs/new.gif");
	myToolbar.addButton("edit_painel", 2, "Editar", "imgs/edit.png");
	myToolbar.addButton("delete_painel", 3, "Apagar", "imgs/del.png");

	myToolbar.attachEvent("onClick", function (id) {
		switch (id) {
			case 'add_painel':
				add_painel();
				break;
			case 'edit_painel':
				edit_painel(myGrid.getSelectedRowId());
				break;
			case 'delete_painel':
				delete_painel(myGrid.getSelectedRowId());
				break;
			default:
				break;
		}
	});
}

function grid_paineis(){
	myGrid = myLayout.cells("b").attachGrid();
	//myGrid.setImagePath("./imgs/icons/");
	myGrid.setSkin("dhx_skyblue");
	myGrid.setHeader("Imagem,Descrição,Duração,Ativo");
	myGrid.setInitWidths("120,500,60,70");
	myGrid.setColAlign("center,left,center,center");
	myGrid.setColTypes("ro,ro,ro,ro");
	myGrid.setEditable(false);
	myGrid.init();
	myGrid.setSkin("dhx_skyblue");
	myGrid.loadXML("./administrar/painel/data/grid_painel.php");

	myGrid.attachEvent("onRowDblClicked", function (rId, cInd) {
		edit_painel(rId);
	});

	myGrid.attachEvent("onRowCreated", function (rId, rObj, rXml) {
		myGrid.setRowTextStyle(rId, "border-width: 0px 0px 1px 1px;border-color : #FDFDFD #A4BED4 #A4BED4 #FDFDFD;");
	});

	myGrid.attachEvent("onXLE", function (grid_obj, count) {
		myLayout.cells("b").progressOff();
	});
}

function add_painel() {
	if (!dhxWins.window("w1")) {
		
		var w1 = dhxWins.createWindow("w1",  150, 10, 400, 250);
		w1.setText("Adicionar Painel");
		dhxWins.setSkin("dhx_skyblue");
		dhxWins.window("w1").centerOnScreen();
		dhxWins.window("w1").denyResize();
		dhxWins.window("w1").denyMove();
		dhxWins.window("w1").button("park").disable();
		dhxWins.window("w1").setModal(true);
		w1.progressOn();

		const formHtml =`	<form id="realForm2" method="POST" target="upload_target" enctype="multipart/form-data" action="">
								<div id="formAtt"></div>
							</form>
							<iframe id="upload_target" name="upload_target"  style="width:0;height:0;border:0px solid #fff;">
							</iframe>`;
		w1.attachHTMLString(formHtml);
		myForm = new dhtmlXForm("formAtt");
		myForm.loadStruct("./administrar/painel/forms/form_add_painel.php", function () {

			const image1 = myForm.getContainer("image1");
			console.log(image1);
			image1.innerHTML = `<div style="width:410px;">
										<div style="float:left; width:55px;">Anexo</div>
										<input type="file" name="file1" id="file1" style="width:300px;" />
								</div>`;
			w1.progressOff();
		});
 
		 
		  
		 
	}
}
 */