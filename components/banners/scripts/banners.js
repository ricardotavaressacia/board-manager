function init_banners(){
	toolbar_banners();
	grid_banners();
}



function toolbar_banners() {
 
	const myToolbar2 = myLayout2.cells("a").attachToolbar();
	myToolbar2.setIconset("awesome");

	myToolbar2.addButton("add", 10, "Add", "fa fa-file");
	myToolbar2.addButton("edit", 20, "Edit", "fa fa-edit");
	myToolbar2.addButton("delete", 30, "Delete", "fa fa-trash");

	myToolbar2.attachEvent("onClick", function (id) {

		const bannerId = myGrid.getSelectedRowId();
	
		if (id == 'add') {
			manage_board(null);
		}else if (id == 'edit') {
			if (bannerId){
				manage_board(bannerId);
			}else{
				error("You must select a line to edit");
			}
		}else if (id == 'delete') {
			if (bannerId){
				delete_board_items(bannerId);
			}else{
				error("You must select a line to delete");
			}
		}
	});
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


function manage_board( bannerId ){

	let windowsText = ''; 
	let actionFile = ''; 
	if( !bannerId ){
		windowsText = 'Insert ';
		actionFile = 'form_add_banner.php';
	}else{ 
		windowsText = 'Update ';
		actionFile = 'form_edit_banner.php';
	} 

	if (!myWins.window("w1")) {
		w1 = myWins.createWindow("w1",  150, 10, 400, 150);
	 
		myWins.window("w1").setText(`${windowsText} Banner`);
		myWins.window("w1").centerOnScreen();
		myWins.window("w1").denyResize();
		myWins.window("w1").denyMove();
		myWins.window("w1").button("park").disable();
		myWins.window("w1").setModal(true);

		const myToolbar3 =  myWins.window("w1").attachToolbar();
		myToolbar3.setIconset("awesome");
	
		myToolbar3.addButton("back", 10, "Back", "fa fa-undo");
		myToolbar3.addSpacer("back");
		myToolbar3.addButton("save", 20, "Save", "fa fa-save");

	
		myToolbar3.attachEvent("onClick", function (id) {
			if (id == 'back') {
				w1.close();
			}else if (id == 'save') {
				save_board(bannerId);
			} 
		});
	 
		myForm = myWins.window("w1").attachForm();
		myForm.loadStruct(`./components/banners/forms/${actionFile}`);
	}
}


function save_board_items(bannerId, elementId){

	let windowsText = ''; 
	let actionFile = ''; 
	if( !elementId ){
		windowsText = 'Insert ';
		actionFile = `action_add_painel.php?banner_id=${bannerId}`;
	}else{ 
		windowsText = 'Update ';
		actionFile = `action_edit_painel.php?banner_id=${bannerId}&element_id=${elementId}`;
	} 

	if (myForm.validate()) {
		myWins.window("w1").progressOn();
		myForm.send(`./components/banner_items/actions/${actionFile}`, "post", function (response) {
			console.log(response);
			const obj = window.dhx4.s2j(response.xmlDoc.responseText);
 
			if (  obj.status == 200) {
				myGrid2.clearAndLoad(`./components/banner_items/data/data_board_items.php?banner_id=${bannerId}`, function() { 
					myWins.window("w1").progressOff();
					myWins.window("w1").close();
					myGrid2.selectRowById(obj.msg || elementId);

				});
			} else {
				error(obj.msg);
			}
		});
	} else {
		error("Incorrect data...");
	}
}

function delete_board_items(bannerId, elementId){
	if (elementId) {
		dhtmlx.confirm({
			title: "Delete Element",
			type: "confirm-warning",
			text: "Are you sure you want to delete this element?",
			callback: function (result) {
				if (result == true) {
					window.dhx.ajax.get(`./components/banner_items/actions/action_delete_painel.php?element_id=${elementId}`, function (response) {
						const obj = window.dhx4.s2j(response.xmlDoc.responseText);
						if (  obj.status == 200) {
							myGrid2.clearAndLoad(`components/banner_items/data/data_board_items.php?banner_id=${bannerId}`, function() { 
							});
						} else {
							error(obj.msg);
						}
					});
				}
			}
		});
	} else {
		error("Select a line to delete!");
	}
}


 