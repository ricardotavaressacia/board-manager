var w1;
function init_banners_items(){
	toolbar_banners_items();
	grid_banners_items();
}

 

function toolbar_banners_items() {
 
	const myToolbar2 = myLayout2.cells("b").attachToolbar();
	myToolbar2.setIconset("awesome");

	myToolbar2.addButton("add", 10, "Add", "fa fa-file");
	myToolbar2.addButton("edit", 20, "Edit", "fa fa-edit");
	myToolbar2.addButton("delete", 30, "Delete", "fa fa-trash");

	myToolbar2.attachEvent("onClick", function (id) {

		const bannerId = myGrid.getSelectedRowId();
		const elementId = myGrid2.getSelectedRowId();

		if (id == 'add') {
			if( myGrid.getSelectedRowId() ){
				manage_board_items(bannerId, null);
			}else{
				error('Please, please select a banner'); 
			}
		}else if (id == 'edit') {
			if (elementId){
				manage_board_items(bannerId, elementId);
			}else{
				error("You must select a line to edit");
			}
		}else if (id == 'delete') {
			if (elementId){
				delete_board_items(bannerId, elementId);
			}else{
				error("You must select a line to delete");
			}
		}
	});
}



//----------------------------------------------------------------------------------------------------
//--- List of Banner Items 
//----------------------------------------------------------------------------------------------------
function grid_banners_items(){
	myGrid2 = myLayout2.cells("b").attachGrid();
	myGrid2.setImagesPath("./imgs/");
	myGrid2.setHeader("Image,Description,Duration,Active");
	myGrid2.setInitWidths("120,500,60,70");
	myGrid2.setColAlign("center,left,center,center");
	myGrid2.setColTypes("ro,ro,ro,ro");

	myGrid2.setStyle("text-align:center;vertical-align: middle !important;", "", "", "");
	myGrid2.init();

	myGrid2.clearAndLoad(`components/banner_items/data/data_board_items.php`, function() { 
		
	});
}


 
function manage_board_items( bannerId, elementId){

	let windowsText = ''; 
	let actionFile = ''; 
	if( !elementId ){
		windowsText = 'Insert ';
		actionFile = 'form_add_painel.php';
	}else{ 
		windowsText = 'Update ';
		actionFile = 'form_edit_painel.php';
	} 

	if (!myWins.window("w1")) {
		w1 = myWins.createWindow("w1",  150, 10, 400, 250);
	 
		myWins.window("w1").setText(`${windowsText} Element`);
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
				save_board_items(bannerId, elementId);
			} 
		});
	 
		myForm = myWins.window("w1").attachForm();
		myForm.loadStruct(`./components/banner_items/forms/${actionFile}?element_id=${elementId}`);
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