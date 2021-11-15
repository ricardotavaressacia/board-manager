function menu() {

	if (myMenu != null) {
		myLayout.detachMenu();
		myMenu = null;
	}

	if (statusBar != null) {
		myLayout.cells("a").detachStatusBar();
		statusBar = null;
	}
 
	myMenu = myLayout.attachMenu();
	myMenu.setSkin("dhx_web");
	myMenu.setIconsPath("./imgs/icons/");

	myMenu.loadStruct("menu/menu.php", function () {
		/*
		permissoes = jQuery.parseJSON(myMenu.getUserData("dashboard", "permissoes")); //PERMISSOE
		if(getUrlVars()["incidentes"] && getUrlVars()["incidentes"] != ''){
			incidentes(getUrlVars()["incidentes"]);
			view_incidentes(getUrlVars()["incidentes"]);
		}else{
			app();
		}
		*/
		app();

	});

	myMenu.attachEvent("onClick", function (opt) {

		if (statusBar != null) {
			myLayout.cells("a").detachStatusBar();
			statusBar = null;
		}

		if (myLayout2 != null) {
			myLayout.cells("a").detachObject(true);
			myLayout2 = null;
		}

		if (myToolbar != null)
			myLayout.cells("a").detachToolbar();

		myLayout.cells("a").detachObject();

		myLayout.cells("a").showHeader();

		switch (opt) {
				//Menu
			case "dashboard":
				window.location.reload();
				break;

			case "machines_equipments":
				machines_equipments();
				break;
		

			default:
				window.location.reload();
				break;
			}
	});
}

 