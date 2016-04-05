/*
 * Monopoly - Socialism Plugin
 *
 * Guise on Couch
 *
 * Author: Travis Heller
 *
 * Version 0.2.1 - March 30, 2016
 *
 * Monopoly main JavaScript port
 *
 * Includes player data handling and some gameplay
 */

var Players;

/*
 * PlayerList linked list of Player nodes
 */
var PlayerList = function() {
	var front = null;
	var size = 0;
	var totalScore = 0;
	var curr = null;
	var baseMoney = 1500;

	/*
	 * Adds a player to the game
	 */
	this.add = function(name) {
		if (size == 0) {
			size += 1;
			var thePlayer = new Player(name);
			front = thePlayer;
			curr = this.getFront();
			totalScore += Number(baseMoney);
			return;
		}
		var current = front;

		for (var i = 0; i < size-1; i++) {
			current = current.getNext();
		}
		size += 1;
		var playerTemp = new Player(name);
		current.setNext(playerTemp);
		totalScore += Number(baseMoney);
	}

	this.getPlayerByName = function(name) {
		var current = front;
		for (var i = 0; i < size; i++) {
			if (current.getName() === name) {
				return current;
			}
		}
		return null;
	}

	this.next = function() {
		curr = curr.getNext();
	}

	this.getTotalScore = function() {
		return totalScore;
	}

	this.setFront = function(aPlayer) {
		front = aPlayer;
	}

	this.getFront = function() {
		return front;
	}

	this.getSize = function() {
		return size;
	}

	this.setSize = function(newSize) {
		size = newSize;
	}

	this.getCurr = function() {
		return curr;
	}

	this.displayPlayers = function() {
		var playerStr = "";
		for (var i = 0; i < size; i++) {

			playerStr += curr.getName();
			if (i != size -1) {
				playerStr += ", ";
			}
		
		this.next();
		
		}
		alert("Players: " + playerStr);
	}

	this.getFront = function() {
		return front;
	}

	this.setBaseMoney = function(money) {
		baseMoney = money;
	}

	/*
	 * Player node data class
	 */
	var Player = function(aName) {
		var score = baseMoney;
		var money = baseMoney;
		var id = 0;
		var next = front;
		var name;

		if (aName == "") {
	        name = "Player " + size;
	        } else {
	           name = aName;
	        }
	    id = size;

	    this.getName = function() {
	    	return name;
	    }

	    this.getNext = function() {
	    	return next;
	    }

	    this.setNext = function(object) {
	    	next = object;
	    }

	    this.getMoney = function() {
	    	return money;
	    }

	    this.getScore = function() {
	    	return score;
	    }

	    this.changeMoney = function(change) {
	    	money = Number(money) + Number(change);
	    	score = Number(score) + Number(change);
	    	totalScore = Number(totalScore) + Number(change);
	    }
	}

	/*
	function Player(name, baseMoney) {
		var score = baseMoney;
		var money = baseMoney;
		var id = 0;
		var next = front;

		if (name == "") {
	        this.name = "Player " + (size+1);
	        } else {
	           this.name = name;
	        }
	    id = size+1;

	    this.getName = function() {
	    	return name;
	    }

	    this.getNext = function() {
	    	return next;
	    }
	}
	*/
}



function handlePlayers() {
	var numPlayers = document.getElementById("numPlayers").value;
	Players = new PlayerList();
	Players.setBaseMoney(document.getElementById("startMoney").value)
	for (var i = 1; i <= numPlayers; i++) {
		Players.add(prompt("Player " + i + " name:"));
	}

	//Players.displayPlayers();
	//alert("Size: " + Players.getSize());
	play();


}

function validatePlayers() {
	var num = document.getElementById("numPlayers").value;
	if (num < 1) {
		num = 1;
	}
}

function play() {
	var currentPlayer = Players.getCurr();
	document.getElementById("setup").style.display = "none";
	document.getElementById("game").style.display = "block";

	document.getElementById("playerName").innerHTML = currentPlayer.getName();
	//document.getElementById("playerImg").src = currentPlayer.getImg();
	document.getElementById("money").innerHTML = "$" + currentPlayer.getMoney();
	document.getElementById("score").innerHTML = currentPlayer.getScore();
	document.getElementById("totalScore").innerHTML = Players.getTotalScore();
}

function nextPlayer() {
	Players.next();
	play();
}

function changeMoney() {
	var currentPlayer = Players.getCurr();
	Players.getCurr().changeMoney(prompt("How much?"));
	document.getElementById("money").innerHTML = "$" + currentPlayer.getMoney();
	document.getElementById("score").innerHTML = currentPlayer.getScore();
	document.getElementById("totalScore").innerHTML = Players.getTotalScore();
}
