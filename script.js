window.onload = function () {
    var container = {};
	
    container.generatNewPerson = function () {
        var data = container.getPersonData()
            , stringWithData = container.createNewLabelOfTable(data);
        container.pushInTable(stringWithData);
        container.showTotalPerson();
        container.bindDelete();
    }
    container.createNewTD = function (a) {
        var td = document.createElement('td');
        td.innerHTML = a;
        return td;
    }
    container.createNewTDButton = function () {
        var buttonDel = document.createElement("button");
        buttonDel.value = "DELETE";
        buttonDel.className = "classButtonDel";
        buttonDel.name = "Delete";
        buttonDel.innerHTML = "Del\nUser";
        return buttonDel;
    }
    container.clearInputs = function () {
        personName.value = "";
        var inputs = document.querySelectorAll('.testClass');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }
    container.pushInTable = function (a) {
        tableBody.appendChild(a);
        container.clearInputs();
    }
	container.showTotalPerson = function () {
        var totalPerson = document.querySelectorAll("tr").length - 1;
        exitAllPerson.innerHTML = " " + totalPerson;
    }
    container.pushDataFromLocalStorage = function (localData) {
        var tableRowLS = document.createElement('tr')
            , tableCellNameLS = container.createNewTD(localData[0])
            , tableCellSuperPowerLS = container.createNewTD(localData[1])
            , tableCellRichLS = container.createNewTD(localData[2])
            , tableCellGeniusLS = container.createNewTD(localData[3])
            , buttonDel = container.createNewTD("");
        buttonDel.appendChild(container.createNewTDButton());
        tableRowLS.appendChild(tableCellNameLS);
        tableRowLS.appendChild(tableCellSuperPowerLS);
        tableRowLS.appendChild(tableCellRichLS);
        tableRowLS.appendChild(tableCellGeniusLS);
        tableRowLS.appendChild(buttonDel);
        container.pushInTable(tableRowLS);
		container.bindDelete();
		container.showTotalPerson();
    }
    container.checkLocolStorage = function () {
        if (window.localStorage) {
            var localStorageData = localStorage;
            for (var i = 0; i < localStorageData.length; i++) {
                var keyName = localStorageData.key(i);
                var localStorageDataKeyNameParam = localStorageData[keyName].split(','); 
                localStorageDataKeyNameParam.unshift(keyName);
                container.pushDataFromLocalStorage(localStorageDataKeyNameParam);
            }
        }
    }
	
	container.bindDelete = function (e) {
        var buttons = document.querySelectorAll(".classButtonDel");
        for (var i = 0, n = buttons.length; i < n; i++) {
            buttons[i].addEventListener("click", function (e) {
                e.target.parentNode.parentNode.remove();
                container.showTotalPerson();
				var keyNameLS = e.target.parentNode.parentNode.firstChild.textContent;
				localStorage.removeItem(keyNameLS);	
            }, false);
        }	
    }
    container.checkLocolStorage();
    container.getPersonData = function () {
        var personName = document.getElementById('personName').value;
		if (localStorage.getItem(personName)){
			container.clearInputs();
			return false
			}
        var personSuperPower = checkPersonSuperPower.checked
            , personRich = checkPersonRich.checked
            , personGenius = checkPersonGenius.checked
            , personData = [personName, personSuperPower, personRich, personGenius];
        return {
            personData
        }
    }
    container.createNewLabelOfTable = function (a) {
        var arr = [];
        for (var index in a) {
            arr.push(a[index])
        }
        container.pushInLocolStorage(arr[0]);
        var tableRow = document.createElement('tr')
            , tableCellName = container.createNewTD(arr[0][0])
            , tableCellSuperPower = container.createNewTD(arr[0][1])
            , tableCellRich = container.createNewTD(arr[0][2])
            , tableCellGenius = container.createNewTD(arr[0][3])
            , buttonDel = container.createNewTD("");
        buttonDel.appendChild(container.createNewTDButton());
        tableRow.appendChild(tableCellName);
        tableRow.appendChild(tableCellSuperPower);
        tableRow.appendChild(tableCellRich);
        tableRow.appendChild(tableCellGenius);
        tableRow.appendChild(buttonDel);
        return tableRow;
    }
    
    
    container.sortData = function (e) {
        var columnSort = e.target;
        switch (columnSort) {
        case sort1:
            var cellNamber = 0
                , paramA = 1
                , paramB = -1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML > rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort2:
            var cellNamber = 1
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort3:
            var cellNamber = 2
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        case sort4:
            var cellNamber = 3
                , paramA = -1
                , paramB = 1
                , compare = function (rowA, rowB) {
                    return rowA.cells[cellNamber].innerHTML < rowB.cells[cellNamber].innerHTML
                }
            break;
        }
        var tbody = document.getElementById('table').getElementsByTagName('tbody')[0];
        var rowsArray = [].slice.call(tbody['rows']);
        rowsArray.sort(compare);
        table.removeChild(tbody);
        for (var i = 0; i < rowsArray.length; i++) {
            tbody.appendChild(rowsArray[i]);
        }
        table.appendChild(tbody);
		container.hideCells(columnSort, cellNamber, tbody);
    }
    container.pushInLocolStorage = function (arr) {
        localStorage.setItem(arr[0], arr[1] + "," + arr[2] + "," + arr[3]);
    }
    container.buttonAddNewPerson = document.getElementById('addId');
    container.buttonAddNewPerson.addEventListener("click", container.generatNewPerson, false);
    
	container.buttonSort = document.getElementsByClassName("sortButtons");
    for (var i = 0, n = container.buttonSort.length; i < n; i++) {
        container.buttonSort[i].addEventListener("click", container.sortData, false);
    }
	
	container.hideCells = function(a, b, c){
	if (b === 0) {container.showAllCells(); return;}
		container.showAllCells();	
			for (var i = 1, k = c.childNodes.length; i < k; i++) {
			   if (c.childNodes[i].childNodes[b].textContent === 'false'){
					c.childNodes[i].className = "hidenCells";
				};
			}
	}
	container.showAllCells = function(){
		//console.log("HI");
		var tab = document.getElementById("table").rows;
			for (var i = 1; i < tab.length; i++) {
					if(tab[i].classList.contains('hidenCells')){
						tab[i].classList.remove('hidenCells');
						console.log("HI");
					}		
			}
	}
}