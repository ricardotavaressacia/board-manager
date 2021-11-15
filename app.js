function app() {

    create_layout();
	
	init_banners(); 
 	init_banners_items(); 
}


function create_layout(){
    myLayout.cells("a").showHeader();
	//myLayout.cells("a").setText("HSTA - Dashboard");

	myLayout2 = null;
	myLayout2 = myLayout.cells("a").attachLayout("2U");
	myLayout2.cells("a").showHeader();
	myLayout2.cells("a").setText("Banners");
	myLayout2.cells("a").setHeight(90);
  
	myLayout2.cells("a").setWidth(350);
	myLayout2.cells("a").fixSize(true, true);
	myLayout2.cells("a").hideArrow();
	myLayout2.cells("b").hideArrow();
	myLayout2.cells("b").setText("Elements");

}