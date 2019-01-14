"use strict";

let table = document.querySelector("table");
let restart = document.querySelector("#button");
let out = document.querySelector("#out");

let count = 0;
let td;
let numbersX = [];
let numbersO = [];
let usedTd = [];

let x = `<span class="x">X</span>`;
let o = `<span class="o">O</span>`;

function game(e) {
	td = e.target;
	
	let trRows = td.closest("tr").rowIndex;
	let tdRows = td.cellIndex;
	let rows = trRows + "" + tdRows;
	
	if (td.tagName !== "TD") {
		return;
	}else if (td.children.length > 0) {
		return;
	}
	
    if (count % 2 === 0) {
		td.innerHTML = x;
		numbersX.push(rows);
		out.innerHTML = "Ход: O";
		
	}else {
		td.innerHTML = o;
	    numbersO.push(rows);
		out.innerHTML = "Ход: X";
	}
	count++;
	
	let winCombination = [
		["00", "01", "02"],
		["10", "11", "12"],
		["20", "21", "22"],
		["00", "10", "20"],
		["01", "11", "21"],
		["02", "12", "22"],
		["00", "11", "22"],
		["02", "11", "20"]
	];
	
	let move = td.children[0].innerHTML;
	
	if (move === "O" || move === "X") {
		winCombination.forEach(function(combination)  {
	let win = combination; 
			 
	if (win.every( function(item) {
		return numbersO.includes(item);
		})) {
        out.innerHTML = "Победил: O";
		table.removeEventListener("click", game);
			
	}else if (win.every( function(item){
		return numbersX.includes(item);
	}))	{
	    out.innerHTML = "Победил: X";
		table.removeEventListener("click", game);
			
	}else if (count === 9 && !(out.innerHTML.includes("Победил")) ) {
		out.innerHTML = "Ничья";
		}
	  })
	}
	
	usedTd.push(td);
}

table.addEventListener("click", game);

restart.onclick = function() {
	table.removeEventListener("click", game);
	
	usedTd.forEach(function(item) {
		item.innerHTML = "";
		numbersX = [];
		numbersO = [];
		count = 0;
		out.innerHTML = "Ход: X";
	})
	
	table.addEventListener("click", game);
}
 








	


