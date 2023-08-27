//initiate DB


var db = openDatabase('smrpgitems', '1.0', 'tracker', 3 * 1024 * 1024);
db.transaction(function (tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS items (name text, type text, position integer)', []);
	tx.executeSql('CREATE TABLE IF NOT EXISTS locations (name text, map text, position integer)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS prefs (pref text, opt text)');
}, function(e) { console.log(e)});

db.transaction(function (tx) {
	tx.executeSql('SELECT * FROM items', [], function(tx, results) {
		if (results.rows.length == 0) {
			query = "INSERT INTO items (name, type, position) VALUES ";
			queryAddon = [];
			params = [];
			items.forEach(function(item) {
				queryAddon.push("(?, ?, null)");
				params.push(item.name, item.type);
			});
			query += queryAddon.join(", ");
			tx.executeSql(query, params);
		}
		if (results.rows.length == 234) {
		}
	}, function(e) { console.log(e);});
});

db.transaction(function (tx) {
	tx.executeSql('SELECT * FROM locations', [], function(tx, results) {
		if (results.rows.length == 0) {
			query = "INSERT INTO locations (name, map, position) VALUES ";
			queryAddon = [];
			params = [];
			for (var i = 0; i < locations.length; i++) {
				queryAddon.push("(?, ?, ?)");
				params.push(locations[i].name, locations[i].map, i+1);
			};
			query += queryAddon.join(", ");
			db.transaction(function (tx) {
				tx.executeSql(query, params);
			});
		}
	});
});

var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example


$(document).ready(function() {
	

	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM items', [], function(tx, results) {
			if (results.rows.length == 234) {
				$('#234Item').removeClass('hidden');
			}
		}, function(e) { console.log(e);});
	});

	var mapSelectorStyle = "block";
	var mapBehaviourStyle = "click";
	var autoAddStyle = "yes";
	var compact = "no";
	var autoSort = "no";
	
	var locationsOrdered = [];
	var loadedItems = [];
	
	function generateRows(preloadedItems) {
		preloadedItems.forEach(function(item) {
			$('#list').append(
				'<li class="display-row item-row" style="width: 100% !important;">' +
					'<div class="item-container display-cell hidden item-id">' + item.id + '</div>' +
					'<div class="item-container display-cell icon-container"><div class="icon ' + item.type +'"></div></div>' +
					'<div class="item-container display-cell item-name name-column">' + item.name + '</div>' +
					'<div class="item-container display-cell location-container">' +
						'<span class="display-location location selected"><span>shop</span><div class="noshop"><div class="pic"><div class="img"></div></div></div></span>' +
						//todo ^ map locator
						'<div class="location-selector hidden">' +
							'<div class="linear-location-selector display-table ' + (mapSelectorStyle != "linear" ? "hidden" : "") + '">' +
								'<div class="display-row">' +
									'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
									'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
									'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
									'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
									'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
									'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
									'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
									'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
									'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
									'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
									'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
									'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
									'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
									'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
									'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
									'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
									'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
									'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
								'</div>' +
							'</div>' +
							'<div class="vertical-location-selector display-table ' + (mapSelectorStyle != "vertical" ? "hidden" : "") + '">' +
								'<div class="display-row">' +
									'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
								'</div>' +
							'</div>' +
							'<div class="block-location-selector display-table ' + (mapSelectorStyle != "block" ? "hidden" : "") + '">' +
								'<div class="display-row">' +
									'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
									'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
									'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
									'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
									'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
									'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
									'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
									'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
									'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
									'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
									'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
									'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
									'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
									'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
								'</div>' +
								'<div class="display-row">' +
									'<div class="display-cell"></div>' +
									'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
									'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
									'<div class="display-cell"></div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="display-cell remove-button-container">' +
						'<div class="remove-button">' +
							'x' +
						'</div>' +
					'</div>' +
				'</li>'
			);
		});
	}
	
	function createEmptyRow() {
		$('#list').append(
			'<li class="display-row item-row" style="width: 100% !important;">' +
				'<div class="item-search display-cell">' +
				'</div>' +
				'<div class="item-search display-cell name-column">' +
					'<input type="text" placeholder="Search item"/>' +
					'<div class="search-results-container">' +
						'<div class="search-results display-table">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="item-container display-cell hidden item-id"></div>' +
				'<div class="item-container display-cell hidden icon-container"><div class="icon"></div></div>' +
				'<div class="item-container display-cell item-name hidden name-column"></div>' +
				'<div class="item-container display-cell location-container hidden">' +
					'<span class="display-location location selected"><span>shop</span><div class="noshop"><div class="pic"><div class="img"></div></div></div></span>' +
					//todo ^ map locator
					'<div class="location-selector hidden">' +
						'<div class="linear-location-selector display-table ' + (mapSelectorStyle != "linear" ? "hidden" : "") + '">' +
							'<div class="display-row">' +
								'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
								'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
								'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
								'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
								'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
								'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
								'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
								'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
								'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
								'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
								'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
								'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
								'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
								'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
								'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
								'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
								'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
								'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
							'</div>' +
						'</div>' +
						'<div class="vertical-location-selector display-table ' + (mapSelectorStyle != "vertical" ? "hidden" : "") + '">' +
							'<div class="display-row">' +
								'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
							'</div>' +
						'</div>' +
						'<div class="block-location-selector display-table ' + (mapSelectorStyle != "block" ? "hidden" : "") + '">' +
							'<div class="display-row">' +
								'<div class="M-Kingdom display-cell"><span class="default">M-Kingdom</span><div class="pic" title="Mushroom Kingdom Shop"><div class="img"></div></div></div>' +
								'<div class="Tadpole-JB display-cell"><span class="semilocked">Tadpole-JB</span><div class="pic" title="Juice Bar"><div class="img"></div></div></div>' +
								'<div class="Rose-Item display-cell"><span class="default">Rose-Item</span><div class="pic" title="Rose Town Item Shop"><div class="img"></div></div></div>' +
								'<div class="Rose-Arm display-cell"><span class="default">Rose-Arm</span><div class="pic" title="Rose Town Armor Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Moleville display-cell"><span class="default">Moleville</span><div class="pic" title="Moleville"><div class="img"></div></div></div>' +
								'<div class="Marrymore display-cell"><span class="default">Marrymore</span><div class="pic" title="Marrymore"><div class="img"></div></div></div>' +
								'<div class="Seaside-1 display-cell"><span class="missable">Seaside-1</span><div class="pic" title="Occupied Seaside Town Shop"><div class="img"></div></div></div>' +
								'<div class="Sea-Ship display-cell"><span class="default">Sea-Ship</span><div class="pic" title="Sea/Ship Shaman"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Monstro-Item display-cell"><span class="default">Monstro-Item</span><div class="pic" title="Monstro Shop"><div class="img"></div></div></div>' +
								'<div class="Monstro-Trip display-cell"><span class="default">Monstro-Trip</span><div class="pic" title="Monstro Triplets Shop"><div class="img"></div></div></div>' +
								'<div class="Nimbus display-cell"><span class="default">Nimbus</span><div class="pic" title="Nimbus Shop"><div class="img"></div></div></div>' +
								'<div class="Croco-1 display-cell"><span class="default">Croco-1</span><div class="pic" title="Bowser\'s Keep first shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Seaside-Item display-cell"><span class="locked">Seaside-Item</span><div class="pic" title="Seaside Town Item Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Wpn display-cell"><span class="locked">Seaside-Wpn</span><div class="pic" title="Seaside Town Weapon Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Arm display-cell"><span class="locked">Seaside-Arm</span><div class="pic" title="Seaside Town Armor Shop"><div class="img"></div></div></div>' +
								'<div class="Seaside-Acc display-cell"><span class="locked">Seaside-Acc</span><div class="pic" title="Seaside Town Accessory Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="Volcano-Item display-cell"><span class="locked">Volcano-Item</span><div class="pic" title="Hinopio Item Shop"><div class="img"></div></div></div>' +
								'<div class="Volcano-Arm display-cell"><span class="locked">Volcano-Arm</span><div class="pic" title="Hinopio Armor Shop"><div class="img"></div></div></div>' +
								'<div class="Croco-2 display-cell"><span class="locked">Croco-2</span><div class="pic" title="Bowser\'s Keep second shop"><div class="img"></div></div></div>' +
								'<div class="Toad display-cell"><span class="locked">Toad</span><div class="pic" title="Factory Shop"><div class="img"></div></div></div>' +
							'</div>' +
							'<div class="display-row">' +
								'<div class="display-cell"></div>' +
								'<div class="Tadpole-FCE display-cell"><span class="frog">Tadpole-FCE</span><div class="pic" title="Frog Coin Emporium"><div class="img"></div></div></div>' +
								'<div class="Seaside-FC display-cell"><span class="frog">Seaside-FC</span><div class="pic" title="Frog Disciple"><div class="img"></div></div></div>' +
								'<div class="display-cell"></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="display-cell remove-button-container hidden">' +
					'<div class="remove-button">' +
						'x' +
					'</div>' +
				'</div>' +
			'</li>'
		);
		$('#list li:last-child input').focus();
	}
	
	function autosort() {
		end = {};
		start = {};
		var endrow;
		$('#list').children('li').each(function() {
			var x = $(this);
			var isSearchRow = x.children('.name-column').children('input[type="text"]');
			if (isSearchRow.length > 0 && x.is(':last-child')) {
				endrow = x;
			}
			else {
				var id = x.children('.item-id').text();
				var noshops = x.children('.location-container').children('.display-location').children('.noshop');
				if (noshops.length > 0) {
					end[id] = x;
				}
				else {
					start[id] = x;
				}
			}
		});
		$('#list').empty();
		db.transaction(function (tx) {
			tx.executeSql('SELECT rowid, * FROM items WHERE position IS NOT NULL ORDER BY position', [], function(tx, results) {
				for (i = 0; i < results.rows.length; i++) {
					if (start.hasOwnProperty(results.rows.item(i).rowid)) {
						$('#list').append(start[results.rows.item(i).rowid]);
					}
				}
				for (i = 0; i < results.rows.length; i++) {
					if (end.hasOwnProperty(results.rows.item(i).rowid)) {
						$('#list').append(end[results.rows.item(i).rowid]);
					}
				}
				$('#list').append(endrow);
			});
		});
	}
	
	function resort() {
		end = {};
		var endrow;
		$('#list').children('li').each(function() {
			var x = $(this);
			var isSearchRow = x.children('.name-column').children('input[type="text"]');
			if (isSearchRow.length > 0 && x.is(':last-child')) {
				endrow = x;
			}
			else {
				var id = x.children('.item-id').text();
				end[id] = x;
			}
		});
		$('#list').empty();
		db.transaction(function (tx) {
			tx.executeSql('SELECT rowid, * FROM items WHERE position IS NOT NULL ORDER BY position', [], function(tx, results) {
				for (i = 0; i < results.rows.length; i++) {
					if (end.hasOwnProperty(results.rows.item(i).rowid)) {
						$('#list').append(end[results.rows.item(i).rowid]);
					}
				}
				$('#list').append(endrow);
			});
		});
	}
	
	//initialize from DB
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM prefs WHERE pref = "map-selector"', [], function(tx, results) {
			if (results.rows.length > 0) {
				mapSelectorStyle = results.rows.item(results.rows.length - 1).opt;
			}
			else {
				tx.executeSql("INSERT INTO prefs VALUES (?, ?)", ['map-selector', 'block']);
			}
			if (mapSelectorStyle == "block") {
				$('#selectLinearMap, #selectVerticalMap').removeClass('selected');
				$('#selectBlockMap').addClass('selected');
			}
			else if (mapSelectorStyle == "vertical") {
				$('#selectLinearMap, #selectBlockMap').removeClass('selected');
				$('#selectVerticalMap').addClass('selected');
			}
			else {
				$('#selectLinearMap').addClass('selected');
				$('#selectBlockMap, #selectVerticalMap').removeClass('selected');
			}
		});
		
		tx.executeSql('SELECT * FROM prefs WHERE pref = "map-behaviour"', [], function(tx, results) {
			if (results.rows.length > 0) {
				mapBehaviourStyle = results.rows.item(results.rows.length - 1).opt;
			}
			else {
				tx.executeSql("INSERT INTO prefs VALUES (?, ?)", ['map-behaviour', 'click']);
			}
			if (mapBehaviourStyle == "click") {
				$('#selectHoverMap').removeClass('selected');
				$('#selectClickMap').addClass('selected');
			}
			else {
				$('#selectHoverMap').addClass('selected');
				$('#selectClickMap').removeClass('selected');
			}
		});
		
		tx.executeSql('SELECT * FROM prefs WHERE pref = "auto-add"', [], function(tx, results) {
			if (results.rows.length > 0) {
				autoAddStyle = results.rows.item(results.rows.length - 1).opt;
			}
			else {
				tx.executeSql("INSERT INTO prefs VALUES (?, ?)", ['auto-add', 'yes']);
			}
			if (autoAddStyle == "yes") {
				$('#selectClickAdd').removeClass('selected');
				$('#selectAutoAdd').addClass('selected');
			}
			else {
				$('#selectClickAdd').addClass('selected');
				$('#selectAutoAdd').removeClass('selected');
			}
		});
		
		
		tx.executeSql('SELECT * FROM prefs WHERE pref = "compact"', [], function(tx, results) {
			if (results.rows.length > 0) {
				compact = results.rows.item(results.rows.length - 1).opt;
			}
			else {
				tx.executeSql("INSERT INTO prefs VALUES (?, ?)", ['compact', 'no']);
			}
			if (compact == "no") {
				$('#selectCompactIcons').removeClass('selected');
				$('#selectTownNames').addClass('selected');
				if ($('body').hasClass('compact-icons')) {
					$('body').removeClass('compact-icons');
				}
			}
			else {
				$('#selectCompactIcons').addClass('selected');
				$('#selectTownNames').removeClass('selected');
				if (!$('body').hasClass('compact-icons')) {
					$('body').addClass('compact-icons');
				}
			}
		});
		
		
		tx.executeSql('SELECT * FROM prefs WHERE pref = "autosort"', [], function(tx, results) {
			if (results.rows.length > 0) {
				autoSort = results.rows.item(results.rows.length - 1).opt;
			}
			else {
				tx.executeSql("INSERT INTO prefs VALUES (?, ?)", ['autosort', 'no']);
			}
			if (autoSort == "no") {
				$('#selectAutoSort').removeClass('selected');
				$('#dontAutoSort').addClass('selected');
				$('#list').sortable('enable');
				resort();
			}
			else {
				$('#selectAutoSort').addClass('selected');
				$('#dontAutoSort').removeClass('selected');
				$('#list').sortable('disable');
				autosort();
			}
		});
			
		tx.executeSql('SELECT * FROM locations ORDER BY position', [], function(tx, res) {
			if (res.rows.length > 0) {
				for (var i = 0; i < res.rows.length; i++) {
					locationsOrdered.push({name: res.rows.item(i).name, map: res.rows.item(i).map});
				}
			}
			else {
				locationsOrdered = locations;
			}
			
			tx.executeSql('SELECT rowid As id, * FROM items WHERE position IS NOT NULL ORDER BY position', [], function(tx, res2) {
				if (res2.rows.length > 0) {
					var preloadedItems = [];
					for (var i = 0; i < res2.rows.length; i++) {
						preloadedItems.push({id: res2.rows.item(i).id, name: res2.rows.item(i).name, type: res2.rows.item(i).type});
						loadedItems.push(res2.rows.item(i).id);
					}
					generateRows(preloadedItems);
				}
				else {
					locationsOrdered = locations;
				}
				
				createEmptyRow();
				
				
				
			});
		});
	});
	
	
	$('body').on('keydown', 'input[type="text"]', function(e) {
		clearTimeout(typingTimer);
	});
	
	$('body').on('keyup', 'input[type="text"]', function(e) {
		searchterm = $(this).val();
		par = $(this).closest(".item-row");
		srwindow = par.find('.search-results');
		if (searchterm.length >= 3) {
			db.transaction(function (tx) {
				loadedItemsQuery = "";
				similar = [];
				if (loadedItems.length > 0)
					loadedItemsQuery = "AND rowid NOT IN (" + loadedItems.join(", ") + ") ";
				tx.executeSql('SELECT rowid AS id, * FROM items WHERE LOWER(name) LIKE LOWER(?) ' + loadedItemsQuery + 'ORDER BY name ASC, type ASC', [searchterm], function(tx, results) {
					for (var i = 0; i < results.rows.length; i++) {
						similar.push({id: results.rows.item(i).id, name: results.rows.item(i).name, type: results.rows.item(i).type});
					}
					tx.executeSql('SELECT rowid AS id, * FROM items WHERE LOWER(name) LIKE LOWER(?) AND LOWER(name) != LOWER(?) ' + loadedItemsQuery + 'ORDER BY name ASC, type ASC', [searchterm + "%", searchterm], function(tx, results2) {
						for (var i = 0; i < results2.rows.length; i++) {
							similar.push({id: results2.rows.item(i).id, name: results2.rows.item(i).name, type: results2.rows.item(i).type});
						}
						tx.executeSql('SELECT rowid AS id, * FROM items WHERE LOWER(name) LIKE LOWER(?) AND LOWER(name) NOT LIKE LOWER(?) AND LOWER(name) != LOWER(?)' + loadedItemsQuery + 'ORDER BY name ASC, type ASC', ["%" + searchterm + "%",searchterm + "%", searchterm], function(tx, results3) {
							for (var i = 0; i < results3.rows.length; i++) {
								similar.push({id: results3.rows.item(i).id, name: results3.rows.item(i).name, type: results3.rows.item(i).type});
							}
							
							srwindow.empty();
							srwindow.show();
							
							if (similar.length > 0) {
								similar.forEach(function(foundItem) {
									srwindow.append(
										"<div class='display-row item-container clickable'>" +
											'<div class="display-cell hidden item-id">' + foundItem.id + '</div>' +
											'<div class="display-cell hidden item-type">' + foundItem.type + '</div>' +
											'<div class="display-cell"><div class="icon ' + foundItem.type + '"></div></div>' +
											'<div class="display-cell item-name">' + foundItem.name + '</div>' +
										"</div>"
									);
								});
							}
							else {
								srwindow.append(
									"No items found"
								);
							}
							
							function doAdd() {
								selectedId = similar[0].id;
								selectedName = similar[0].name;
								selectedType = similar[0].type;
								thisRow = par.index() + 1;
								db.transaction(function (tx) {
									tx.executeSql("UPDATE items SET position = ? WHERE rowid = ?", [thisRow, selectedId], function(tx, results) {
										tx.executeSql("SELECT rowid, * FROM items WHERE position IS NOT NULL ORDER BY position", [], function(tx, results2) {
											loadedItems = [];
											for (var i = 0; i < results2.rows.length; i++) {
												loadedItems.push(results2.rows.item(i).rowid);
											}
											
											par.find(".item-search").hide();
											par.find(".item-container.item-id").text(selectedId);
											par.find(".item-container.icon-container").removeClass("hidden");
											par.find(".item-container.location-container").removeClass("hidden");
											par.find(".item-container.icon-container .icon").addClass(selectedType);
											par.find(".item-container.item-name").text(selectedName).removeClass("hidden");
											par.find(".remove-button-container").removeClass("hidden");
											createEmptyRow();
											
											
										}, function(tx, e) { console.log(e);});
									}, function(tx, e) { console.log(e);});
								});
							}
							
							var code = (e.keyCode ? e.keyCode : e.which);
							
							if (similar.length == 1 && code == 13) {
								if (autoAddStyle == "yes")
									clearTimeout(typingTimer);
								doAdd();
							}
							else if (similar.length == 1 && autoAddStyle == "yes") {
								clearTimeout(typingTimer);
								typingTimer = setTimeout(doAdd, doneTypingInterval);
							}
							
						}, function(tx, e) { console.log(e);});
					}, function(tx, e) { console.log(e);});
				}, function(tx, e) { console.log(e);});
			});
		}
		else {
			srwindow.hide();
		}
	});
	
	var townsChanged = false;
	
	$('body').on('click', '.item-container.clickable', function() {
		selectedId = $(this).children(".item-id").text();
		selectedName = $(this).children(".item-name").text();
		selectedType = $(this).children(".item-type").text();
		par = $(this).closest(".item-row");
		thisRow = par.index() + 1;
		db.transaction(function (tx) {
			tx.executeSql("UPDATE items SET position = ? WHERE rowid = ?", [thisRow, selectedId], function(tx, results) {
				tx.executeSql("SELECT rowid, * FROM items WHERE position IS NOT NULL ORDER BY position", [], function(tx, results2) {
					loadedItems = [];
					for (var i = 0; i < results2.rows.length; i++) {
						loadedItems.push(results2.rows.item(i).rowid);
					}
					
					par.find(".item-search").hide();
					par.find(".item-container.item-id").text(selectedId);
					par.find(".item-container.icon-container").removeClass("hidden");
					par.find(".item-container.location-container").removeClass("hidden");
					par.find(".item-container.icon-container .icon").addClass(selectedType);
					par.find(".item-container.item-name").text(selectedName).removeClass("hidden");
					par.find(".remove-button-container").removeClass("hidden");
					createEmptyRow();
					
					
				}, function(tx, e) { console.log(e);});
			}, function(tx, e) { console.log(e);});
		});
	});
	
	$('body').on('click', '.remove-button', function() {
		par = $(this).closest(".item-row");
		selectedId = par.find(".item-id").text();
		thisRow = par.index() + 1;
		console.log(thisRow);
		db.transaction(function (tx) {
			tx.executeSql("UPDATE items SET position = NULL WHERE position = ?", [thisRow], function(tx, results) {
				tx.executeSql("SELECT rowid, * FROM items WHERE position > ? ORDER BY position", [thisRow], function(tx, results2) {
					resetRows = [];
					rowids = [];
					
					if (results2.rows.length > 0) {
					
						query = "UPDATE items SET position = CASE rowid ";
						for (var i = 0; i < results2.rows.length; i++) {
							query += "WHEN ? THEN ? ";
							resetRows.push(results2.rows.item(i).rowid, results2.rows.item(i).position - 1);
							rowids.push(results2.rows.item(i).rowid);
						}
						query += "ELSE null END WHERE rowid IN(" + rowids.join(", ") + ")";
						tx.executeSql(query, resetRows);
					}
					par.remove();
					
					tx.executeSql("SELECT rowid, * FROM items WHERE position IS NOT NULL ORDER BY position", [], function(tx, results2) {
						loadedItems = [];
						for (var i = 0; i < results2.rows.length; i++) {
							loadedItems.push(results2.rows.item(i).rowid);
						}
						
						
					}, function(tx, e) { console.log(e);});
					
				}, function(tx, e) { console.log(e);});
			}, function(tx, e) { console.log(e);});
		});
	});
	
	$('body').on("mouseenter", ".location-container", function() {
		if (mapBehaviourStyle == "hover") {
			$(this).children('.location-selector').removeClass('hidden');
			
			var offset = $(this).offset().left;
			var children = $(this).children('.location-selector');
			var windowwidth = $(window).width();
			var childwidth;
			var ls;
			children.each(function() {
				childwidth = $(this).width();
				ls = $(this);
			});
			console.log(offset, childwidth);
			console.log(offset + childwidth);
			console.log(windowwidth);
			if (offset + childwidth > windowwidth) {
				ls.css({left: windowwidth - (offset + childwidth)});
			}
			else {
				ls.css({left: 0});
			}
		}
	});
	$('body').on("mouseleave", ".location-container", function() {
		if (mapBehaviourStyle == "hover") {
			$(this).children('.location-selector').addClass('hidden').css({left: 0});
			if (autoSort == "yes" && townsChanged) {
				autosort();
			}
			townsChanged = false;
		}
	});
	$('body').on("click", ".location-container", function() {
		if (mapBehaviourStyle == "click") {
			$(this).children('.location-selector').removeClass('hidden');
			
			var offset = $(this).offset().left;
			var children = $(this).children('.location-selector');
			var windowwidth = $(window).width();
			var childwidth;
			var ls;
			children.each(function() {
				childwidth = $(this).width();
				ls = $(this);
			});
			if (offset + childwidth > windowwidth) {
				ls.css({left: windowwidth - (offset + childwidth)});
			}
			else {
				ls.css({left: 0});
			}
		}
	});
	$(document).mouseup(function(e) {
		if (mapBehaviourStyle == "click") {
			var container = $(".location-selector");
			if (!container.is(e.target) && container.has(e.target).length === 0) 
				{
					$(".location-selector").each(function() {
						if (!$(this).hasClass('hidden')) {
							$(this).addClass('hidden');
							$(this).css({left: 0});
						}
					});
					if (autoSort == "yes" && townsChanged) {
						autosort();
					}
					townsChanged = false;
				}
		}
	});
	
	
	$('body').on("click", ".location-selector .display-cell > *", function() {
		if (!$(this).hasClass("empty")) {
			var par = $(this).closest(".display-table");
			var sp = $(this);
			var cell = $(this).closest(".display-cell");
			var span = cell.find('span');
			var town;
			span.each(function() {
				town = $(this).text();
			});
			allChange = sp.closest(".location-selector").find("." + town);
			if (cell.hasClass("selected")) {
				allChange.removeClass("selected");
			}
			else {
				allChange.addClass("selected");
			}
			var displaySpan = $(this).closest(".location-container").children(".display-location");
			var getTowns = par.find(".selected");
			towns = [];
			getTowns.each(function() {
				spans = $(this).find('span');
				spans.each(function() {
					x = $(this).text();
				});
				var filteredArray = locations.filter(function(itm){
				  return itm.name == x;
				});
				towns.push("<span class='" + filteredArray[0].map + "'>" + x + "</span><div class='" + x + "'><div class='pic' title='" + x + "'><div class='img'></div></div></div>");
			});
			if (towns.length > 0) {
				displaySpan.each(function() {
					$(this).html(towns.join("<span class='comma'>, </span>"));
				});
			}
			else {
				displaySpan.each(function() {
					$(this).html("<span>shop</span><div class='noshop'><div class='pic'><div class='img'></div></div></div>");
				});
			}
			townsChanged = true;
		}
	});
	
	$('#list').sortable({
		update: function(event, ui) {
			db.transaction(function (tx) {
				tx.executeSql("UPDATE items SET position = NULL WHERE position IS NOT NULL", [], function(tx, results) {
					loadedItems = [];
					resetRows = [];
					
					query = "UPDATE items SET position = CASE rowid ";
					$('#list > li').each(function() {
						var id = $(this).children('.item-id').text();
						if (id.length > 0) {
							query += "WHEN ? THEN ? ";
							resetRows.push(id, $(this).index() + 1);
							loadedItems.push(id);
						}
					});
					query += "ELSE null END WHERE rowid IN(" + loadedItems.join(", ") + ")";
					tx.executeSql(query, resetRows, function(tx, result) {}, function(tx, e) { console.log(e)});
				}, function(tx, e) { console.log(e);});
			});
		}
	})
	
	$('#selectLinearMap').click(function() {
		mapSelectorStyle = "linear";
		$('#selectLinearMap').removeClass('selected');
		$(this).addClass('selected');
		$('#selectBlockMap, #selectVerticalMap').removeClass('selected');
		$('.linear-location-selector, .block-location-selector, .vertical-location-selector').removeClass('hidden');
		$('.block-location-selector, .vertical-location-selector').addClass('hidden');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "linear" WHERE pref = "map-selector"');
		});
	});
	$('#selectBlockMap').click(function() {
		mapSelectorStyle = "block";
		$('#selectBlockMap').removeClass('selected');
		$(this).addClass('selected');
		$('#selectLinearMap, #selectVerticalMap').removeClass('selected');
		$('.linear-location-selector, .block-location-selector, .vertical-location-selector').removeClass('hidden');
		$('.linear-location-selector, .vertical-location-selector').addClass('hidden');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "block" WHERE pref = "map-selector"');
		});
	});
	$('#selectVerticalMap').click(function() {
		mapSelectorStyle = "vertical";
		$('#selectVerticalMap').removeClass('selected');
		$(this).addClass('selected');
		$('#selectLinearMap, #selectBlockMap').removeClass('selected');
		$('.linear-location-selector, .block-location-selector, .vertical-location-selector').removeClass('hidden');
		$('.linear-location-selector, .block-location-selector').addClass('hidden');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "vertical" WHERE pref = "map-selector"');
		});
	});
	$('#selectHoverMap').click(function() {
		mapBehaviourStyle = "hover";
		$('#selectHoverMap').removeClass('selected');
		$(this).addClass('selected');
		$('#selectClickMap').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "hover" WHERE pref = "map-behaviour"');
		});
	});
	$('#selectClickMap').click(function() {
		mapBehaviourStyle = "click";
		$('#selectClickMap').removeClass('selected');
		$(this).addClass('selected');
		$('#selectHoverMap').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "click" WHERE pref = "map-behaviour"');
		});
	});
	$('#selectClickAdd').click(function() {
		autoAddStyle = "no";
		$('#selectClickAdd').removeClass('selected');
		$(this).addClass('selected');
		$('#selectAutoAdd').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "no" WHERE pref = "auto-add"');
		});
	});
	$('#selectAutoAdd').click(function() {
		autoAddStyle = "yes";
		$('#selectAutoAdd').removeClass('selected');
		$(this).addClass('selected');
		$('#selectClickAdd').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "yes" WHERE pref = "auto-add"');
		});
	});
	$('#selectAutoSort').click(function() {
		autoSort = "yes";
		$('#selectAutoSort').removeClass('selected');
		$(this).addClass('selected');
		$('#dontAutoSort').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "yes" WHERE pref = "autosort"');
		});
		$('#list').sortable('disable');
		autosort();
	});
	$('#dontAutoSort').click(function() {
		autoSort = "no";
		$('#dontAutoSort').removeClass('selected');
		$(this).addClass('selected');
		$('#selectAutoSort').removeClass('selected');
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "no" WHERE pref = "autosort"');
		});
		$('#list').sortable('enable');
		resort();
	});
	
	$('#clearAll').click(function() {
		if(confirm("Are you sure you want to remove all saved items?")) {
			db.transaction(function (tx) {
				tx.executeSql('UPDATE items SET position = NULL WHERE position IS NOT NULL');
			});
			$('#list').empty();
			createEmptyRow();
		}
	});
	$('#selectCompactIcons').click(function() {
		compact = "yes";
		$('#selectCompactIcons').removeClass('selected');
		$(this).addClass('selected');
		$('#selectTownNames').removeClass('selected');
		if (!$('body').hasClass('compact-icons')) {
			$('body').addClass('compact-icons');
		}
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "yes" WHERE pref = "compact"');
		});
	});
	$('#selectTownNames').click(function() {
		compact = "yes";
		$('#selectTownNames').removeClass('selected');
		$(this).addClass('selected');
		$('#selectCompactIcons').removeClass('selected');
		if ($('body').hasClass('compact-icons')) {
			$('body').removeClass('compact-icons');
		}
		db.transaction(function (tx) {
			tx.executeSql('UPDATE prefs SET opt = "no" WHERE pref = "compact"');
		});
	});
	
	
});