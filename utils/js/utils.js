

function searchMultiSelect(searchInput, multiSelectInput, myForm, control_return) {
	var temp = false;
	if (myForm.getItemValue(searchInput)) {
		var z = 0,
		x = 0;
		while (z < myForm.getSelect(multiSelectInput).options.length) {
			if (myForm.getSelect(multiSelectInput).options[z].selected == true)
				break;
			z++;
		}
		while (x < myForm.getSelect(multiSelectInput).options.length) {
			myForm.getSelect(multiSelectInput).options[x].selected = false;
			x++;
		}

		var y = z == myForm.getSelect(multiSelectInput).options.length ? 0 : (z + 1);
		while (y < myForm.getSelect(multiSelectInput).options.length) {
			if (myForm.getSelect(multiSelectInput).options[y].text.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1 ||
				myForm.getSelect(multiSelectInput).options[y].value.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1) {
				myForm.getSelect(multiSelectInput).options[y].selected = true;
				temp = true;
				break;
			}
			y++;
		}

		if (!control_return) {
			if (z != myForm.getSelect(multiSelectInput).options.length) {
				if (temp == false)
					searchMultiSelect(searchInput, multiSelectInput, myForm, '1');
			}
		}
	} else {
		var y = 0;
		while (y < myForm.getSelect(multiSelectInput).options.length) {
			myForm.getSelect(multiSelectInput).options[y].selected = false;
			y++;
		}
	}
}

function searchCombo(searchInput, comboInput, myForm) {

	if (myForm.getItemValue(searchInput)) {
		if (myForm.getItemValue(searchInput).toLowerCase() != '') {
			var temp = false;
			var y = 0;
			y = myForm.getCombo(comboInput).getSelectedIndex() != '' ? myForm.getCombo(comboInput).getSelectedIndex() + 1 : y;
			while (y < myForm.getCombo(comboInput).optionsArr.length) {
				if (myForm.getCombo(comboInput).optionsArr[y].text.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1 ||
					myForm.getCombo(comboInput).optionsArr[y].value.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1) {

					myForm.getCombo(comboInput).setComboValue(myForm.getCombo(comboInput).optionsArr[y].value);
					temp = true;
					break;
				}
				y++;
			}

			if (y == myForm.getCombo(comboInput).optionsArr.length && myForm.getCombo(comboInput).getSelectedIndex() != '') {
				if (temp == false) {
					myForm.getCombo(comboInput).selectOption(0);
					searchCombo(searchInput, comboInput, myForm);
				}
			}
		} else {
			myForm.getCombo(comboInput).setComboValue(myForm.getCombo(comboInput).optionsArr[0].value);
		}
	} else {
		myForm.getCombo(comboInput).setComboValue(myForm.getCombo(comboInput).optionsArr[0].value);
	}
}

function selectComboItemByValue(elmnt, value) {
	for (var i = 0; i < elmnt.options.length; i++) {
		if (elmnt.options[i].value === value)
			elmnt.selectedIndex = i;
		break;
	}
}

//GET URL paramt
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
			function (m, key, value) {
			vars[key] = value;
		});
	return vars;
}

//Verifica se sesão está ativa
function checkSession(callback) {
	window.dhx.ajax.get("checkSession.php", function (loader, response) {
		if (loader.xmlDoc.responseText == '0') {
			window.top.location.reload();
		} else {
			if (typeof callback === "function") {
				callback();
			}
		}
	});
}

//Mensagem de erro com callback
function error(msg, callback) {
	dhtmlx.alert({
		title: "Importante!",
		type: "alert-error",
		text: msg,
		callback: function () {
			if (typeof callback === "function") {
				callback();
			}
		}
	});
}

//Mensagem de alerta com callback
function error2(msg, callback) {
	dhtmlx.alert({
		title: "Aviso",
		text: msg,
		callback: function () {
			if (typeof callback === "function") {
				callback();
			}
		}
	});
}

//Devolve data (possibilidade de adicionar ou remover dias, meses, anos por parametros)
function _getDate(format, days, months, years) {
	//_getDate("yyyy-mm-dd",-30,-1,-1)
	var today = new Date();

	if (days)
		today.setDate(today.getDate() + days);

	if (months)
		today.setMonth(today.getMonth() + months);

	if (years)
		today.setFullYear(today.getFullYear() + years);

	if (!format)
		var format = 'yyyy-mm-dd';

	if (format.length == 10 || format.length == 8) {
		var parms = format.split(/[\.\-\/]/);
		if (parms.indexOf((format.length == 10 ? 'yyyy' : 'yy')) > -1) {
			format = format.replace((format.length == 10 ? 'yyyy' : 'yy'), (format.length == 10 ? today.getFullYear() : String(today.getFullYear()).substring(2, 4)));
			if (parms.indexOf('mm') > -1) {
				format = format.replace("mm", ((today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)));
				if (parms.indexOf('dd') > -1) {
					format = format.replace("dd", (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate()));
					return format;
				}
			}
		}
	}
	return today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate());
}

//move registo entre multi selects
function _move_between_selects(block, myForm, multiselect1, multiselect2) {

	var ida = (block ? multiselect1 : multiselect2);
	var idb = (block ? multiselect2 : multiselect1);

	var sa = myForm.getSelect(ida);
	var sb = myForm.getSelect(idb);

	var t = myForm.getItemValue(ida);
	if (t.length == 0)
		return;
	eval("var k={'" + t.join("':true,'") + "':true};");

	var w = 0;
	var ind = -1;
	while (w < sa.options.length) {
		if (k[sa.options[w].value] && sa.options[w].value != 'rhumanos@silencor.pt' && sa.options[w].value != 'administracao@silencor.pt') {
			sb.options.add(new Option(sa.options[w].text, sa.options[w].value));
			sa.options.remove(w);
			ind = w;
		} else {
			w++;
		}
	}

	if (sa.options.length > 0 && ind >= 0)
		if (sa.options.length > 0)
			sa.options[t.length > 1 ? 0 : Math.min(ind, sa.options.length - 1)].selected = true;
}

//persquisa value ou texto nas combos e seleciona
function _searchCombo(inputName, comboName, form, recursive) {
	var dhxCombo = form.getCombo(comboName);
	var searchText = form.getItemValue(inputName).toLowerCase();
	var selectedIndex = dhxCombo.getSelectedIndex();
	var findResult = false;

	if (searchText != '') {
		dhxCombo.forEachOption(function (option) {
			if (findResult == false) {
				if (option.index > selectedIndex) {
					if (option.text.toLowerCase().indexOf(searchText) != -1 || option.value.toLowerCase().indexOf(searchText) != -1) {
						dhxCombo.selectOption(option.index, false, false);
						selectedIndex = dhxCombo.getSelectedIndex();
						findResult = true;
					}
				}
			}
		});

		if (findResult == false && recursive == null) {
			form.setItemValue(comboName, "");
			_searchCombo(inputName, comboName, form, '1');
		}
	} else {
		form.setItemValue(comboName, "");
	}
}


function _searchCombo2(inputName, comboName, form, recursive) {

	var opts = inputName.getOptions(comboName);
	// get the currently selected option and then its text attribute. 
	var text = (opts[opts.selectedIndex].text);

	alert(text);
	return ;

	var dhxCombo = form.getCombo(comboName);
	var searchText = dhxCombo.getComboText();
	//var selectedIndex = dhxCombo.getSelectedIndex();
	
	//alert("3" +selectedIndex  );
	alert("1" +dhxCombo  );
	alert("2" +searchText  );
	var findResult = false;

	if (searchText != '') {
		dhxCombo.forEachOption(function (option) {
			if (findResult == false) {
				if (option.index > selectedIndex) {
					if (option.text.toLowerCase().indexOf(searchText) != -1 || option.value.toLowerCase().indexOf(searchText) != -1) {
						dhxCombo.selectOption(option.index, false, false);
						selectedIndex = dhxCombo.getSelectedIndex();
						findResult = true;
					}
				}
			}
		});

		if (findResult == false && recursive == null) {
			form.setItemText(comboName, "");
			_searchCombo(inputName, comboName, form, '1');
		}
	} else {
		form.setItemText(comboName, "");
	}
}


//pesquisa value ou texto nos select e seleciona
function _searchSelect(searchInput, selectInput, myForm, control_return) {
	var temp = false;
	if (myForm.getItemValue(searchInput)) {
		var z = 0,
		x = 0;
		while (z < myForm.getSelect(selectInput).options.length) {
			if (myForm.getSelect(selectInput).options[z].selected == true)
				break;
			z++;
		}
		while (x < myForm.getSelect(selectInput).options.length) {
			myForm.getSelect(selectInput).options[x].selected = false;
			x++;
		}

		var y = z == myForm.getSelect(selectInput).options.length ? 0 : (z + 1);
		while (y < myForm.getSelect(selectInput).options.length) {
			if (myForm.getSelect(selectInput).options[y].text.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1 ||
				myForm.getSelect(selectInput).options[y].value.toLowerCase().indexOf(myForm.getItemValue(searchInput).toLowerCase()) != -1) {
				myForm.getSelect(selectInput).options[y].selected = true;
				temp = true;
				break;
			}
			y++;
		}

		if (!control_return) {
			if (z != myForm.getSelect(selectInput).options.length) {
				if (temp == false)
					_searchSelect(searchInput, selectInput, myForm, '1');
			}
		}
	} else {
		var y = 0;
		while (y < myForm.getSelect(selectInput).options.length) {
			myForm.getSelect(selectInput).options[y].selected = false;
			y++;
		}
	}
}

//verifica se dataI e timeI é menor que dataf e timeF
function _endAfterStart(startDate, endDate, startTime, endTime) {
	if (startDate != '' && endDate != '' && startTime != '' && endTime != '') {
		if (parseInt(startDate.replace(/-/g, ""), 10) < parseInt(endDate.replace(/-/g, ""), 10))
			return true;
		else if (parseInt(startDate.replace(/-/g, ""), 10) > parseInt(endDate.replace(/-/g, ""), 10))
			return false;
		else
			return startTime + ":00" >= endTime + ":00" ? false : true;
	} else {
		return true;
	}
}

//verifica se no intrevalo existe algum dia do fim de semana
function _isWeekend(date1, date2) {
	var d1 = new Date(date1),
	d2 = new Date(date2),
	saturday = false,
	sunday = false;
	while (d1 <= d2) {
		var day = d1.getDay();
		if (day == 6) {
			saturday = true;
		}
		if (day == 0) {
			sunday = true;
		}
		d1.setDate(d1.getDate() + 1);
	}

	if (saturday == true && sunday == true)
		return 3;
	else if (sunday == true)
		return 2;
	else if (saturday == true)
		return 1;
	else
		return 0;
}

//verifica se uma determinada horas está dentro de um intrevalo de tempos
function _checkTimeInRange(_time, _rangeDateFrom, _rangeTimeFrom, _rangeDateTo, _rangeTimeTo) {
	if (_rangeDateFrom == _rangeDateTo || new Date().setHours(_rangeTimeFrom.split(':')[0], _rangeTimeFrom.split(':')[1]) < new Date().setHours(_rangeTimeTo.split(':')[0], _rangeTimeTo.split(':')[1])) {
		var time = new Date().setHours(_time.split(':')[0], _time.split(':')[1]);
		var rangeFrom = new Date().setHours(_rangeTimeFrom.split(':')[0], _rangeTimeFrom.split(':')[1]);
		var rangeTo = new Date().setHours(_rangeTimeTo.split(':')[0], _rangeTimeTo.split(':')[1]);

		if (rangeFrom < time && time < rangeTo)
			return true;
		else
			return false;
	} else {
		var today = new Date();
		today.setDate(today.getDate() + 1);

		var time = new Date().setHours(_time.split(':')[0], _time.split(':')[1]);
		var rangeFrom = new Date().setHours(_rangeTimeFrom.split(':')[0], _rangeTimeFrom.split(':')[1]);
		var rangeTo = today.setHours(_rangeTimeTo.split(':')[0], _rangeTimeTo.split(':')[1]);

		if (rangeFrom < time && time < rangeTo)
			return true;
		else
			return false;
	}
}

function _searchCombo_registo_de_ausencias(inputName, comboName, form, recursive) {
	var dhxCombo = form.getCombo(comboName);
	var searchText = form.getItemValue(inputName).toLowerCase();
	var selectedIndex = dhxCombo.getSelectedIndex();
	var findResult = false;

	if (searchText != '') {
		dhxCombo.forEachOption(function (option) {
			if (findResult == false) {
				if (option.index > selectedIndex) {
					if (option.text.toLowerCase().indexOf(searchText) != -1 || option.value.toLowerCase().indexOf(searchText) != -1) {
						dhxCombo.selectOption(option.index, false, false);
						selectedIndex = dhxCombo.getSelectedIndex();
						findResult = true;
					}
				}
			}
		});

		if (findResult == false && recursive == null) {
			form.setItemValue(comboName, "");

			//seleciona tudo no c_blocked e remove o que nao interessa
			for (var x = 0; x < form.getSelect("c_blocked").options.length; x++)
				form.getSelect("c_blocked").options[x].selected = true;

			_move_between_selects(false, form, "c_all", "c_blocked");
			///////////

			_searchCombo(inputName, comboName, form, '1');
		}
	} else {
		form.setItemValue(comboName, "");
	}
}

function set_images_calendar(myForm, inputs) {
	myForm.forEachItem(function (name) {
		if (inputs.indexOf(name) !== -1) {
			myForm.getInput(name).style.backgroundImage = "url(imgs/icons/calendar.png)";
			myForm.getInput(name).style.backgroundPosition = "center right";
			myForm.getInput(name).style.backgroundRepeat = "no-repeat";
		}
	});

}

function setSens(inp, k) {
	if (k == "min") {
		myCalendar.setSensitiveRange(inp.value, null);
	} else {
		myCalendar.setSensitiveRange(null, inp.value);
	}
}

function set_images_input(myForm, inputs, image) {
	myForm.forEachItem(function (name) {
		if (inputs.indexOf(name) !== -1) {
			myForm.getInput(name).style.backgroundImage = "url(imgs/icons/" + image + ")";
			myForm.getInput(name).style.backgroundPosition = "center right";
			myForm.getInput(name).style.backgroundRepeat = "no-repeat";
		}
	});

}