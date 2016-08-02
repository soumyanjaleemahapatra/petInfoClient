var getPetInfo = function() {
	var petTable = document.getElementById('pTable');
	//var rowLen = petTable.rows.length;
	console.log(petTable.rows.length);
		for (var i = 1; i < petTable.rows.length-1; i++) {
			console.log("Inside loop; "+ petTable.rows.length);
			petTable.deleteRow(i);
		}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			var tableInfo = JSON.parse(xhr.responseText);
			var createTable = function() {
				//var petTable = document.createElement('table');
				//var petTable = document.getElementById('pTable');

				// Add CSS styling

                petTable.classList.add('jsTable');

				for(var i=1; i<tableInfo.length; i++) {
					var dataRow = document.createElement('tr');

					// Creating columns for each record of pet
					var petID = document.createElement('td');
					var petName = document.createElement('td');
					var petCategory = document.createElement('td');
					var petTag = document.createElement('td'); 

					dataRow.appendChild(petID);
					dataRow.appendChild(petName);
					dataRow.appendChild(petCategory);
					dataRow.appendChild(petTag);

					petID.textContent = tableInfo[i].id;
					petName.textContent = tableInfo[i].name;
					petCategory.textContent = tableInfo[i].category === undefined ? "n/a" : tableInfo[i].category.id;
					petTag.textContent = tableInfo[i].tags[0] === undefined ? "n/a" : tableInfo[i].tags[0].id;

					//Adding dataRow to petTable
					petTable.appendChild(dataRow);
				}

				// Adding sorttable library
                var pTable = document.getElementById('pTable');
                sorttable.makeSortable(pTable);

			}();
		};
	};
	xhr.open("GET", "http://petstore.swagger.io/v2/pet/findByStatus?status=available", true);
    xhr.send();
};
var clickButton = document.getElementById('petButton');
clickButton.addEventListener('click', getPetInfo);
