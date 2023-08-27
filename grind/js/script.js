function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}


$(document).ready(function() {
	
	$('#NoX').change(function() {
        if(this.checked) {
            $('.NoX-options').show();
			$('#X').prop("checked", false);
			$('.X-options').hide();
        }
        else {
			$('.NoX-options').hide();
		}
		unsetResults();
    });
	$('#X').change(function() {
        if(this.checked) {
            $('.X-options').show();
			$('#NoX').prop("checked", false);
			$('.NoX-options').hide();
        }
        else {
			$('.X-options').hide();
		}
		unsetResults();
    });
	$('#Character').change(function() {
		setOptions(this.value);
		unsetResults();
	});
	$('#median2').change(function() {
        if(this.checked && $('#median3').prop("checked")) {
			$('#median3').prop("checked", false);
			unsetResults();
		}			
    });
	$('#median3').change(function() {
        if(this.checked && $('#median2').prop("checked")) {
			$('#median2').prop("checked", false);
		}
		unsetResults();
    });
	
	$('input[type="number"], input[type="text"], #10KI, #JFlag, input[type=radio]').change(function() {
		setOptions($('#Character').val());
		unsetResults();
	});
	$('#calc').click(function() {
		calculate();
	});
	
	$('#TargetLevel').focus(function() {
		$('input[type=radio]').prop("checked", false);
		$('#radio_level').prop("checked", true);
	});
	
	$('#TargetHP').focus(function() {
		$('input[type=radio]').prop("checked", false);
		$('#radio_hp').prop("checked", true);
	});
	
	$('#TargetAgi').focus(function() {
		$('input[type=radio]').prop("checked", false);
		$('#radio_agi').prop("checked", true);
	});
	
	if ($('input[type=radio]:checked').is(":hidden")) {
		$('input[type=radio]').prop("checked", false);
		$('#radio_level').prop("checked", true);
	}
	
	$('#calcLevel').click(function() {
		charname = $('#Character').val();
		hp = $('#GivenHP').val();
		if (hp == null || hp == 0) {
			alert("Set HP first, then click 'Unknown?' again to guess level.");
		}
		else if (hp < characters[charname].hpmin[$('#GivenLevel').val() - characters[charname].base] || hp > 9999) {
			alert("The HP value you wrote seems to be out of range for this character, double check the value.");
		}
		else {
			var apples = undefined;
			while (isNaN(apples) && apples !== '') {
				var apples = prompt("Make sure you've already entered your current max HP.\r\nHow much HP was added from AgApples/AuApples?\r\nType a multiple of 50, or type 0 if you didn't use any. Leave blank if you don't remember.\r\nNOTE: This estimator will assume the minimum possible level for your HP, or the min number of apples if left blank.");
			}
			if (apples === null) { }
			else if (!isNaN(apples) && apples != '') {
				apples = (Math.round(apples / 50) * 50)
				found = false;
				adjustedhp = hp - apples;
				guessedLevel = 0;
				for (i = 0; i < characters[charname].hpmin.length; i++) {
					if (adjustedhp >= characters[charname].hpmin[i] && adjustedhp <= characters[charname].hpmax[i]) {
						if (!found) {
							found = true;
							guessedLevel = characters[charname].base + i;
						}
					}
				}
				if (found) {
					$('#GivenLevel').val(guessedLevel);
				}
				else {
					alert("Base HP without apples does not seem to match any HP range for this character, please try again with a different value of apples.");
				}
			}
			else if (apples == '') {
				var adjustedhp = hp;
				var found = false;
				while ((adjustedhp - 50) > 0 && !found) {
					for (i = 0; i < characters[charname].hpmin.length; i++) {
						if (adjustedhp >= characters[charname].hpmin[i] && adjustedhp <= characters[charname].hpmax[i]) {
							if (!found) {
								guessedLevel = characters[charname].base + i;
								found = true;
							}
						}
					}
					adjustedhp -= 50;
				}
				if (found) {
					$('#GivenLevel').val(guessedLevel);
				}
				else {
					alert("Can't figure out the level with or without apples, please double check your HP value.");
				}
			}
		}
	});
	
	function calculate() {
		if (!$('.errormsg').hasClass('hidden'))
			$('.errormsg').addClass('hidden');
		if (!$('.results').hasClass('hidden'))
			$('.results').addClass('hidden');
		
		var character = $('#Character').val();
		
		var dmachin = 0;
		var siren = 0;
		var trapdoor = false;
		var dmachinnote = "";
		var eggnote = "";
		var trapdoornote = "";
		$("#TrapDoorNote").text(null);
		$('#TotalDMachin').text(null);
		$('#TotalEgg').text(null);
		$('#TotalRyus').text(null);
		$('#DMachinNote').text(null);
		$('#EggNote').text(null);
		
		var desired = $("input[type='radio'][name='target']:checked").val();
		level = parseInt($('#GivenLevel').val());
		if (isNaN(level)) {
			alert("Current level cannot be blank.");
		}
		else if ($('#NoX').prop('checked') &&
					(
						isNaN(parseInt($('#NumParty').val()))
						|| 
						parseInt($('#NumParty').val()) < 1
						||
						parseInt($('#NumParty').val()) > 5
					)
		) {
						alert("Party size must be between 1 and 5.");
					}
		else {
			var cont = null;
			if (desired == "level") {
				target = parseInt($('#TargetLevel').val());
				given = parseInt($('#GivenLevel').val());
				if (target <= given) {
					alert("Target level must be higher than current level.");
				}
				else if (isNaN(target) || isNaN(given)) {
					alert("Current and target level cannot be blank.");
				}
				else {
					cont = true;
					index = target - characters[character].base;
					targetExp = characters[character].exp[index];
				}
			}
			else if (desired == "hp") {
				target = parseInt($('#TargetHP').val());
				given = parseInt($('#GivenHP').val());
				
				if (target <= given) {
					alert("Target HP must be higher than current HP.");
				}
				if (target > 9999) {
					alert("Target HP cannot be that high.");
				}
				else if (isNaN(target) || isNaN(given)) {
					alert("Current and target HP cannot be blank.");
				}
				else {
				
				//get apples from current hp
				
					var adjustedhp = given;
					var found = false;
					while ((adjustedhp - 50) > 0 && !found) {
						if (adjustedhp >= characters[character].hpmin[level - characters[character].base] && adjustedhp <= characters[character].hpmax[level - characters[character].base]) {
							if (!found) {
								baseHP = characters[character].hpmin[level - characters[character].base];
								found = true;
							}
						}
						adjustedhp -= 50;
					}
					if (found) {
						apples = (Math.round((given - baseHP) / 50) * 50)
						for (var i = 0; i < characters[character].hpmin.length; i++) {
							if (!cont) {
								if (characters[character].hpmin[i] >= target - apples) {
									targetExp = characters[character].exp[i];
									index = i;
									cont = true;
								}
							}
						}
						if (!cont) {
							index = characters[character].hpmin.length - 1;
							targetExp = characters[character].exp[index];
							var appleExp = target - characters[character].hpmin[index];
							var auappleexp = Math.ceil((target - characters[character].hpmin[index]) / 100);
							var agappleexp = Math.ceil((target - characters[character].hpmin[index]) / 50);
							cont = true;
						}
					}
					else {
						alert("HP value does not seem to be possible for this level with or without the use of apples");
					}
				}
			}
			else if (desired == "agi") {
				target = parseInt($('#TargetAgi').val());
				if (isNaN(target)) {
					alert("Target AGI cannot be blank.");
				}
				else if (characters[character].agi[characters[character].agi.length - 1] < target) {
					alert("Slow down a sec, " + characters[character].name + " can't go that fast.");
				}
				else if (characters[character].agi[level - characters[character].base] >= target) {
					alert(characters[character].name + " has already surpassed that agi threshold.");
				}
				else {
					for (var i = 0; i < characters[character].agi.length; i++) {
						if (!cont) {
							if (characters[character].agi[i] >= target) {
								targetExp = characters[character].exp[i];
								index = i;
								cont = true;
							}
						}
					}
				}
			}
			else {
				var spell = desired;
				var version = ($('#JFlag').is(":checked") ? "j" : "u");
				if (characters[character].spells.hasOwnProperty(version)) {
					if (level >= characters[character].spells[version][spell]) {
						alert(characters[character].name + " already has this spell.");
					}
					else {
						index = characters[character].spells[version][spell] - characters[character].base;
						targetExp = characters[character].exp[index];
						cont = true;
					}
					
				}
				else {
					alert("I'm not sure why you're seeing this, but " + characters[character].name + " can't learn " + spell);
				}
			}
			
			if (cont !== null) {
				if (cont) {
					$('.results').removeClass('hidden');
					$('.results').removeClass('half');
					currentExp = characters[character].exp[level - characters[character].base];
					totalExp = targetExp - currentExp;
					
					var multiplier = 1;
					var bmultiplier = 1;
					eggmsg = "";
					if ($('#X').prop('checked')) {
						if ($('#X').prop('checked')) {
							if ($('#10KI').prop('checked')) {
								multiplier *= 2;
								bmultiplier *= 2;
							}
							if ($('#median2').prop('checked')) {
								multiplier *= 2;
							}
							else if ($('#median3').prop('checked')) {
								multiplier *= 3;
							}
						}
						eggmsg = "Depending on your party median, you might not need quite this many."
					}
					else if ($('#NoX').prop('checked')) {
						multiplier *= (1 / parseInt($('#NumParty').val()));
						bmultiplier *= (1 / parseInt($('#NumParty').val()));
					}
					dmachin = Math.ceil((totalExp - multiplier * 24700) / (41500 * multiplier));
					if (dmachin == 0) dmachin = 1;
					siren = Math.ceil(totalExp / (34000 * bmultiplier));
					ryus = Math.ceil(totalExp / (90000 * bmultiplier));
					console.log(ryus);
					if (siren == 0) siren = 1;
					$('#TotalDMachin').text(dmachin);
					$('#TotalEgg').text(siren);
					$('#TotalRyus').text(ryus);
					if (typeof appleExp !== 'undefined') {
						eggmsg += " You'll also need " + auappleexp + " AuApples or " + agappleexp + " AgApples.";
					}
					$('#EggNote').text(eggmsg);
					if (desired != "hp") {
						if (31100 * 15 * bmultiplier < totalExp) {
							$("#SealedVerdict").text("cannot");
							var excess = totalExp - (31100 * 15 * bmultiplier);
							if (34000 * 15 * bmultiplier > totalExp) {
								
								fights = Math.ceil(excess / ((34000 - 31100) * bmultiplier));
								
								trapdoornote = "However if you make the TrapDoors summon at least " + fights + " YellowDs or Manticores, it is doable.";
								if (typeof appleExp !== 'undefined') {
									trapdoornote += "Then, use " + auappleexp + " AuApples or " + agappleexp + " AgApples.";
								}
								
								$("#TrapDoorNote").text(trapdoornote);
							}
							else if (35000 * 15 * bmultiplier > totalExp) {
								
								fights = Math.ceil(excess / ((35000 - 31100) * bmultiplier));
								trapdoornote = "You would need " + fights + " TrapDoor fights to summon Manticores.";
								if (typeof appleExp !== 'undefined') {
									trapdoornote += "Then, use " + auappleexp + " AuApples or " + agappleexp + " AgApples.";
								}
								$("#TrapDoorNote").text(trapdoornote);
							}
						}
						else {
							$("#SealedVerdict").text("can");
						}
					}
					else {
						endpoint = null;
						var start = level - characters[character].base;
						findExp = currentExp + (31100 * 15 * bmultiplier);
						snark = null;
						checkExp = null;
						i = 0;
						while (checkExp === null && i < characters[character].exp.length) {
							if (characters[character].exp[i] >= findExp) {
								checkExp = i - 1;
							}
							i++;
						}
						if (checkExp === null) {
							checkExp = characters[character].exp.length - 1;
						}
						snark = characters[character].hpmin[checkExp];
						if (checkExp <= characters[character].hpmin.length && snark >= target) {
							$("#SealedVerdict").text("can");
						}
						else {
							$("#SealedVerdict").text("can");
							auappleexp2 = Math.ceil((target - snark) / 100);
							agappleexp2 = Math.ceil((target - snark) / 50);
							trapdoornote += "You must also use " + auappleexp2 + " AuApples or " + agappleexp2 + " AgApples.";
							$("#TrapDoorNote").text(trapdoornote);
						}
					}
				}
				else {
					alert("Something went wrong, please send a screenshot of your options to @pidgezero_one#1337");
				}
			}
		}
		
	}
	
	function unsetResults() {
		$('.results').addClass('half');
	}

	function setOptions(charname) {
		$('.charoption').hide();
		$('.' + charname).toggle();
		if ($('input[type=radio]:checked').is(":hidden")) {
			$('input[type=radio]').prop("checked", false);
			$('#radio_level').prop("checked", true);
		}
		if ($('#GivenLevel').val() < characters[charname].base || $('#GivenLevel').val() == null) {
			$('#GivenLevel').val(characters[charname].base);
		}
		if ($('#GivenLevel').val() >= characters[charname].base + characters[charname].exp.length || $('#GivenLevel').val() == null) {
			$('#GivenLevel').val(characters[charname].base + characters[charname].exp.length - 1);
		}
		if ($('#GivenHP').val() < characters[charname].hpmin[$('#GivenLevel').val() - characters[charname].base] || $('#GivenLevel').val() == null) {
			$('#GivenHP').val(characters[charname].hpmin[$('#GivenLevel').val() - characters[charname].base]);
		}
		if ($('#GivenHP').val() > 9999) {
			$('#GivenHP').val(9999);
		}
	};

	Object.keys(characters).forEach(function(key) {

	  $('#Character').append("<option value='" + key + "'>" + characters[key].name + "</option>");

	});
	sortSelect(document.getElementById('Character'));
	//$('#TargetLevel').val(40);
	//$('#TargetHP').val(2000);
	//$('#TargetAgi').val(24);
	$('#NumParty').val(5);
	$('.NoX-options').hide();
	
	setOptions('dkc');
	while ($('#GivenLevel').val() != '10');
	//unsetResults();

});