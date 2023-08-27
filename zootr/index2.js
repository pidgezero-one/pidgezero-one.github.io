"use strict";

const DESIRED_ITEMS = {
  Boomerang: {
    stages: [['oot.sav.inventory.boomerang = "Boomerang"']],
  },
  "Lens of Truth": {
    stages: [['oot.sav.inventory.lens_of_truth = "Lens of Truth"']],
  },
  "Megaton Hammer": {
    stages: [['oot.sav.inventory.megaton_hammer = "Megaton Hammer"']],
  },
  Hammer: {
    stages: [['oot.sav.inventory.megaton_hammer = "Megaton Hammer"']],
  },
  "Fire Arrows": {
    stages: [['oot.sav.inventory.fire_arrow = "Fire Arrow"']],
  },
  "Ice Arrows": {
    stages: [['oot.sav.inventory.ice_arrow = "Ice Arrow"']],
  },
  "Light Arrows": {
    stages: [['oot.sav.inventory.light_arrow = "Light Arrow"']],
  },
  "Dins Fire": {
    stages: [['oot.sav.inventory.dins_fire = "Dins Fire"']],
  },
  "Nayrus Love": {
    stages: [['oot.sav.inventory.nayrus_love = "Nayrus Love"']],
  },
  "Farores Wind": {
    stages: [['oot.sav.inventory.farores_wind = "Farores Wind"']],
  },
  "Progressive Hookshot": {
    stages: [
      ['oot.sav.inventory.hookshot = "Hookshot"'],
      ['oot.sav.inventory.hookshot = "Longshot"'],
    ],
    progression: ["None", "Hookshot", "Longshot"],
  },
  "Magic Bean Pack": {
    stages: [
      [
        'oot.sav.inventory.magic_beans = "Magic Beans"',
        "oot.sav.ammo.magic_beans = 10",
      ],
    ],
  },
  "Bomb Bag": {
    stages: [
      [
        'oot.sav.inventory.bombs = "Bombs"',
        'oot.sav.equipment.bomb_bag = "Bomb Bag"',
        "oot.sav.ammo.bombs = 20",
      ],
      [
        'oot.sav.inventory.bombs = "Bombs"',
        'oot.sav.equipment.bomb_bag = "Bigger Bomb Bag"',
        "oot.sav.ammo.bombs = 30",
      ],
      [
        'oot.sav.inventory.bombs = "Bombs"',
        'oot.sav.equipment.bomb_bag = "Biggest Bomb Bag"',
        "oot.sav.ammo.bombs = 40",
      ],
    ],
    progression: ["None", "Bomb Bag", "Bigger Bomb Bag", "Biggest Bomb Bag"],
  },
  Bow: {
    stages: [
      [
        'oot.sav.inventory.bow = "Bow"',
        'oot.sav.equipment.quiver = "Quiver"',
        "oot.sav.ammo.bow = 30",
      ],
      [
        'oot.sav.inventory.bow = "Bow"',
        'oot.sav.equipment.quiver = "Bigger Quiver"',
        "oot.sav.ammo.bow = 40",
      ],
      [
        'oot.sav.inventory.bow = "Bow"',
        'oot.sav.equipment.quiver = "Biggest Quiver"',
        "oot.sav.ammo.bow = 50",
      ],
    ],
    progression: ["None", "Quiver", "Bigger Quiver", "Biggest Quiver"],
  },
  Slingshot: {
    stages: [
      [
        'oot.sav.inventory.slingshot = "Slingshot"',
        'oot.sav.equipment.bullet_bag = "Bullet Seed Bag"',
        "oot.sav.ammo.slingshot = 30",
      ],
      [
        'oot.sav.inventory.slingshot = "Slingshot"',
        'oot.sav.equipment.bullet_bag = "Bigger Bullet Seed Bag"',
        "oot.sav.ammo.slingshot = 40",
      ],
      [
        'oot.sav.inventory.slingshot = "Slingshot"',
        'oot.sav.equipment.bullet_bag = "Biggest Bullet Seed Bag"',
        "oot.sav.ammo.slingshot = 50",
      ],
    ],
    progression: [
      "None",
      "Bullet Seed Bag",
      "Bigger Bullet Seed Bag",
      "Biggest Bullet Seed Bag",
    ],
  },
  Ocarina: {
    stages: [
      ['oot.sav.inventory.ocarina = "Fairy Ocarina"'],
      ['oot.sav.inventory.ocarina = "Ocarina of Time"'],
    ],
    progression: ["None", "Fairy Ocarina", "Ocarina of Time"],
  },
  //how to handle bombchus? small keys?

  Bottle: {
    keys: {
      Bottle: "Empty Bottle",
      "Bottle with Milk": "Lon Lon Milk",
      "Bottle with Letter": "Rutos Letter",
      "Bottle with Red Potion": "Red Potion",
      "Bottle with Green Potion": "Green Potion",
      "Bottle with Blue Potion": "Blue Potion",
      "Bottle with Fairy": "Bottled Fairy",
      "Bottle with Fish": "Fish",
      "Bottle with Blue Fire": "Blue Fire",
      "Bottle with Bugs": "Bug",
      "Bottle with Big Poe": "Big Poe",
      "Bottle with Poe": "Poe",
    },
    types: [
      "Bottle",
      "Bottle with Milk",
      "Bottle with Letter",
      "Bottle with Red Potion",
      "Bottle with Green Potion",
      "Bottle with Blue Potion",
      "Bottle with Fairy",
      "Bottle with Fish",
      "Bottle with Blue Fire",
      "Bottle with Bugs",
      "Bottle with Big Poe",
      "Bottle with Poe",
    ],
    stages: [
      ["oot.sav.inventory.bottle1"],
      ["oot.sav.inventory.bottle2"],
      ["oot.sav.inventory.bottle3"],
      ["oot.sav.inventory.bottle4"],
    ],
    count: true,
    max: 4,
  },
  "Adult Trade": {
    types: [
      "Cojiro",
      "Pocket Egg",
      "Pocket Cucco",
      "Odd Mushroom",
      "Odd Potion",
      "Poachers Saw",
      "Broken Sword",
      "Prescription",
      "Eyeball Frog",
      "Eyedrops",
      "Claim Check",
    ],
    stages: [["oot.sav.inventory.adult_trade"]],
  },
  "Weird Egg": {
    stages: [['oot.sav.inventory.child_trade = "Weird Egg"']],
  },
  Bombchus: {
    types: ["Bombchus (5)", "Bombchus (10)", "Bombchus (20)"],
    stages: [
      ['oot.sav.inventory.bombchus = "Bombchus"', "oot.sav.ammo.bombchus = #"],
    ],
    count: true,
    max: 50,
  },

  "Kokiri Sword": {
    stages: [["oot.sav.equipment.kokiri_sword = true"]],
  },
  "Mirror Shield": {
    stages: [["oot.sav.equipment.mirror_shield = true"]],
  },
  "Biggoron Sword": {
    stages: [
      [
        "oot.sav.equipment.biggoron_sword = true",
        "oot.sav.biggoron_sword_durable = true",
      ],
    ],
  },
  "Hylian Shield": {
    stages: [["oot.sav.equipment.hylian_shield = true"]],
  },
  "Deku Shield": {
    stages: [["oot.sav.equipment.kokiri_shield = true"]],
  },
  "Goron Tunic": {
    stages: [["oot.sav.equipment.goron_tunic = true"]],
  },
  "Zora Tunic": {
    stages: [["oot.sav.equipment.zora_tunic = true"]],
  },
  "Iron Boots": {
    stages: [["oot.sav.equipment.iron_boots = true"]],
  },
  "Hover Boots": {
    stages: [["oot.sav.equipment.hover_boots = true"]],
  },
  "Progressive Strength Upgrade": {
    stages: [
      ['oot.sav.equipment.strength = "Goron Bracelet"'],
      ['oot.sav.equipment.strength = "Silver Gauntlets"'],
      ['oot.sav.equipment.strength = "Golden Gauntlets"'],
    ],
    progression: [
      "None",
      "Goron Bracelet",
      "Silver Gauntlets",
      "Golden Gauntlets",
    ],
  },
  "Progressive Scale": {
    stages: [
      ['oot.sav.equipment.scale = "Silver Scale"'],
      ['oot.sav.equipment.scale = "Golden Scale"'],
    ],
    progression: ["None", "Silver Scale", "Golden Scale"],
  },
  "Progressive Wallet": {
    stages: [
      [`oot.sav.equipment.wallet = "Adult's Wallet"`, "oot.sav.rupees = 200"],
      [`oot.sav.equipment.wallet = "Giant's Wallet"`, "oot.sav.rupees = 500"],
      [`oot.sav.equipment.wallet = 0xc7`, "oot.sav.rupees = 999"],
    ],
    progression: [
      "Child's Wallet",
      "Adult's Wallet",
      "Giant's Wallet",
      "Tycoon's Wallet",
    ],
  },
  "Deku Stick Capacity": {
    stages: [
      [
        `oot.sav.equipment.stick_capacity = "20 Sticks"`,
        "oot.sav.ammo.deku_sticks = 20",
        'oot.sav.inventory.deku_sticks = "Deku Sticks"',
      ],
      [
        `oot.sav.equipment.stick_capacity = "30 Sticks"`,
        "oot.sav.ammo.deku_sticks = 30",
        'oot.sav.inventory.deku_sticks = "Deku Sticks"',
      ],
    ],
    progression: ["10 sticks", "20 sticks", "30 sticks"],
  },
  "Deku Nut Capacity": {
    stages: [
      [
        `oot.sav.equipment.nut_capacity = "30 Nuts"`,
        "oot.sav.ammo.deku_nuts = 30",
        'oot.sav.inventory.deku_nuts = "Deku Nuts"',
      ],
      [
        `oot.sav.equipment.nut_capacity = "40 Nuts"`,
        "oot.sav.ammo.deku_nuts = 40",
        'oot.sav.inventory.deku_nuts = "Deku Nuts"',
      ],
    ],
    progression: ["20 nuts", "30 nuts", "40 nuts"],
  },
  "Magic Meter": {
    stages: [
      [
        `oot.sav.magic_meter_size = 0x30`,
        "oot.sav.have_magic = true",
        "oot.sav.cur_magic = 0x30",
      ],
      [
        `oot.sav.magic_meter_size = 0x60`,
        "oot.sav.have_magic = true",
        "oot.sav.cur_magic = 0x60",
        "oot.sav.have_double_magic = true",
      ],
    ],
    progression: ["None", "Half meter", "Full meter"],
  },

  "Stone of Agony": {
    stages: [["oot.sav.quest_status.stone_of_agony = true"]],
  },
  "Gerudo Membership Card": {
    stages: [["oot.sav.quest_status.gerudo_card = true"]],
  },
  "Double Defense": {
    stages: [
      [
        "oot.sav.double_defense_hearts = 0x140",
        "oot.sav.double_defense = true",
      ],
    ],
  },

  "Minuet of Forest": {
    stages: [["oot.sav.quest_status.minuet_of_forest = true"]],
  },
  "Bolero of Fire": {
    stages: [["oot.sav.quest_status.bolero_of_fire = true"]],
  },
  "Serenade of Water": {
    stages: [["oot.sav.quest_status.seranade_of_water = true"]],
  },
  "Requiem of Spirit": {
    stages: [["oot.sav.quest_status.requiem_of_spirit = true"]],
  },
  "Nocturne of Shadow": {
    stages: [["oot.sav.quest_status.nocturne_of_shadow = true"]],
  },
  "Prelude of Light": {
    stages: [["oot.sav.quest_status.prelude_of_light = true"]],
  },
  "Zeldas Lullaby": {
    stages: [["oot.sav.quest_status.zeldas_lullaby = true"]],
  },
  "Eponas Song": {
    stages: [["oot.sav.quest_status.eponas_song = true"]],
  },
  "Sarias Song": {
    stages: [["oot.sav.quest_status.sarias_song = true"]],
  },
  "Suns Song": {
    stages: [["oot.sav.quest_status.suns_song = true"]],
  },
  "Song of Time": {
    stages: [["oot.sav.quest_status.song_of_time = true"]],
  },
  "Song of Storms": {
    stages: [["oot.sav.quest_status.song_of_storms = true"]],
  },

  "Gold Skulltula Token": {
    stages: [["oot.sav.gold_skulltulas = #"]],
    count: true,
    max: 100,
  },
  "Triforce Piece": {
    stages: [["oot.sav.triforce_pieces = 0x#"]],
    count: true,
  },

  "Boss Key (Forest Temple)": {
    stages: [["oot.sav.dungeon_items[0x03].boss_key = true"]],
  },
  "Boss Key (Fire Temple)": {
    stages: [["oot.sav.dungeon_items[0x04].boss_key = true"]],
  },
  "Boss Key (Water Temple)": {
    stages: [["oot.sav.dungeon_items[0x05].boss_key = true"]],
  },
  "Boss Key (Spirit Temple)": {
    stages: [["oot.sav.dungeon_items[0x06].boss_key = true"]],
  },
  "Boss Key (Shadow Temple)": {
    stages: [["oot.sav.dungeon_items[0x07].boss_key = true"]],
  },
  "Boss Key (Ganons Castle)": {
    stages: [["oot.sav.dungeon_items[0x0A].boss_key = true"]],
  },
  "Compass (Deku Tree)": {
    stages: [["oot.sav.dungeon_items[0x00].compass = true"]],
  },
  "Compass (Dodongos Cavern)": {
    stages: [["oot.sav.dungeon_items[0x01].compass = true"]],
  },
  "Compass (Jabu Jabus Belly)": {
    stages: [["oot.sav.dungeon_items[0x02].compass = true"]],
  },
  "Compass (Forest Temple)": {
    stages: [["oot.sav.dungeon_items[0x03].compass = true"]],
  },
  "Compass (Fire Temple)": {
    stages: [["oot.sav.dungeon_items[0x04].compass = true"]],
  },
  "Compass (Water Temple)": {
    stages: [["oot.sav.dungeon_items[0x05].compass = true"]],
  },
  "Compass (Spirit Temple)": {
    stages: [["oot.sav.dungeon_items[0x06].compass = true"]],
  },
  "Compass (Shadow Temple)": {
    stages: [["oot.sav.dungeon_items[0x07].compass = true"]],
  },
  "Compass (Bottom of the Well)": {
    stages: [["oot.sav.dungeon_items[0x08].compass = true"]],
  },
  "Compass (Ice Cavern)": {
    stages: [["oot.sav.dungeon_items[0x09].compass = true"]],
  },
  "Map (Deku Tree)": {
    stages: [["oot.sav.dungeon_items[0x00].map = true"]],
  },
  "Map (Dodongos Cavern)": {
    stages: [["oot.sav.dungeon_items[0x01].map = true"]],
  },
  "Map (Jabu Jabus Belly)": {
    stages: [["oot.sav.dungeon_items[0x02].map = true"]],
  },
  "Map (Forest Temple)": {
    stages: [["oot.sav.dungeon_items[0x03].map = true"]],
  },
  "Map (Fire Temple)": {
    stages: [["oot.sav.dungeon_items[0x04].map = true"]],
  },
  "Map (Water Temple)": {
    stages: [["oot.sav.dungeon_items[0x05].map = true"]],
  },
  "Map (Spirit Temple)": {
    stages: [["oot.sav.dungeon_items[0x06].map = true"]],
  },
  "Map (Shadow Temple)": {
    stages: [["oot.sav.dungeon_items[0x07].map = true"]],
  },
  "Map (Bottom of the Well)": {
    stages: [["oot.sav.dungeon_items[0x08].map = true"]],
  },
  "Map (Ice Cavern)": {
    stages: [["oot.sav.dungeon_items[0x09].map = true"]],
  },
  "Small Key (Forest Temple)": {
    stages: [["oot.sav.small_keys[0x03] = #"]],
    count: true,
    max: 5,
  },
  "Small Key (Fire Temple)": {
    stages: [["oot.sav.small_keys[0x04] = #"]],
    count: true,
    max: 8,
  },
  "Small Key (Water Temple)": {
    stages: [["oot.sav.small_keys[0x05] = #"]],
    count: true,
    max: 6,
  },
  "Small Key (Spirit Temple)": {
    stages: [["oot.sav.small_keys[0x06] = #"]],
    count: true,
    max: 5,
  },
  "Small Key (Shadow Temple)": {
    stages: [["oot.sav.small_keys[0x07] = #"]],
    count: true,
    max: 5,
  },
  "Small Key (Bottom of the Well)": {
    stages: [["oot.sav.small_keys[0x08] = #"]],
    count: true,
    max: 3,
  },
  "Small Key (Gerudo Fortress)": {
    stages: [["oot.sav.small_keys[0x0C] = #"]],
    count: true,
    max: 4,
  },
  "Small Key (Gerudo Training Grounds)": {
    stages: [["oot.sav.small_keys[0x09] = #"]],
    count: true,
    max: 9,
  },
  "Small Key (Ganons Castle)": {
    stages: [["oot.sav.small_keys[0x0D] = #"]],
    count: true,
    max: 2,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonLoaded: false,
      jsonError: undefined,
      locations: [],
      seedInfo: undefined,
      droppedOutPlayer: undefined,
      players: [],
      maxRupees: false,
      checkedPieces: [],
      collectedPieces: 0,
      viewingCodes: false,
	  desiredHearts: 3,
	  desiredHeartPieces: 0,
	  desiredTriforcePieces: 0,
	  desiredTokens: 0,
	  desiredForestTempleKeys: 0,
	  desiredFireTempleKeys: 0,
	  desiredWaterTempleKeys: 0,
	  desiredSpiritTempleKeys: 0,
	  desiredShadowTempleKeys: 0,
	  desiredBOTWKeys: 0,
	  desiredGTGKeys: 0,
	  desiredGerudoFortressKeys: 0,
	  desiredGanonsCastleKeys: 0
    };
    this.handleFileRead = this.handleFileRead.bind(this);
    this.handleFileChosen = this.handleFileChosen.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleWorldSelect = this.handleWorldSelect.bind(this);
    this.handleItemLevelSelect = this.handleItemLevelSelect.bind(this);
    this.handleMaxRupees = this.handleMaxRupees.bind(this);
    this.handleTriforcePieceAmount = this.handleTriforcePieceAmount.bind(this);
    this.handleTriforcePieceCheck = this.handleTriforcePieceCheck.bind(this);
    this.openCodeList = this.openCodeList.bind(this);
    this.reset = this.reset.bind(this);
	this.handleDesiredHeartPieceAmount = this.handleDesiredHeartPieceAmount.bind(this);
	this.handleDesiredHeartAmount = this.handleDesiredHeartAmount.bind(this);
	this.handleDesiredTriforcePieceAmount = this.handleDesiredTriforcePieceAmount.bind(this);
	this.handleDesiredTokenAmount = this.handleDesiredTokenAmount.bind(this);
	this.handleDesiredBOTWKeyAmount = this.handleDesiredBOTWKeyAmount.bind(this);
	this.handleDesiredForestTempleKeyAmount = this.handleDesiredForestTempleKeyAmount.bind(this);
	this.handleDesiredFireTempleKeyAmount = this.handleDesiredFireTempleKeyAmount.bind(this);
	this.handleDesiredWaterTempleKeyAmount = this.handleDesiredWaterTempleKeyAmount.bind(this);
	this.handleDesiredSpiritTempleKeyAmount = this.handleDesiredSpiritTempleKeyAmount.bind(this);
	this.handleDesiredShadowTempleKeyAmount = this.handleDesiredShadowTempleKeyAmount.bind(this);
	this.handleDesiredGTGKeyAmount = this.handleDesiredGTGKeyAmount.bind(this);
	this.handleDesiredGerudoFortressKeyAmount = this.handleDesiredGerudoFortressKeyAmount.bind(this);
	this.handleDesiredGanonsCastleKeyAmount = this.handleDesiredGanonsCastleKeyAmount.bind(this);
  }

  reset = () => {
    this.setState((s) => ({
      jsonLoaded: false,
      jsonError: undefined,
      locations: [],
      seedInfo: undefined,
      droppedOutPlayer: undefined,
      players: [],
      maxRupees: false,
      checkedPieces: [],
      collectedPieces: 0,
      viewingCodes: false,
	  desiredHearts: 20,
	  desiredHeartPieces: 0,
	  desiredTriforcePieces: 0,
	  desiredTokens: 0,
	  desiredForestTempleKeys: 0,
	  desiredFireTempleKeys: 0,
	  desiredWaterTempleKeys: 0,
	  desiredSpiritTempleKeys: 0,
	  desiredShadowTempleKeys: 0,
	  desiredBOTWKeys: 0,
	  desiredGTGKeys: 0,
	  desiredGerudoFortressKeys: 0,
	  desiredGanonsCastleKeys: 0
    }));
  };

  fileReader = new FileReader();

  handleMaxRupees = (event) => {
    event.persist();
    this.setState((s) => ({
      maxRupees: !s.maxRupees,
    }));
  };

  handleCheck = (event, id) => {
    event.persist();
    const identifiers = id.split(".");
    const [world, checkNum] = identifiers;
    let workingData = [...this.state.locations];

    this.state.locations.forEach((w) => {
      w.forEach((check) => {
        if (check.itemId === id) {
          workingData[world][checkNum].checked = !workingData[world][checkNum]
            .checked;
        }
      });
    });
    this.setState({
      locations: workingData,
    });
  };

  handleTriforcePieceCheck = (event, id) => {
    event.persist();
    let workingData = [...this.state.checkedPieces];
    if (!workingData.includes(id)) {
      workingData.push(id);
    } else {
      const indexToRemove = workingData.indexOf(id);
      workingData.splice(indexToRemove, 1);
    }
    console.log(workingData);
    this.setState({
      checkedPieces: workingData,
    });
  };

  handleWorldSelect(event) {
    event.persist();
    const world = !!event.target.value ? event.target.value : undefined;

    let workingData = [...this.state.locations];
    this.state.locations.forEach((w, wrld) => {
      w.forEach((check, index) => {
        workingData[wrld][index].checked = false;
      });
    });
    this.setState((c) => ({
      droppedOutPlayer: !!world ? parseInt(world) : undefined,
      locations: workingData,
    }));
  }

  handleTriforcePieceAmount(event) {
    event.persist();
    this.setState({
      collectedPieces: Math.max(0, parseInt(event.target.value)),
    });
  }
  
  handleDesiredHeartAmount(event) {
    event.persist();
    this.setState({
      desiredHearts: Math.min(20, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredHeartPieceAmount(event) {
    event.persist();
    this.setState({
      desiredHeartPieces: Math.min(3, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredTriforcePieceAmount(event) {
    event.persist();
    this.setState({
      desiredTriforcePieces: Math.max(0, parseInt(event.target.value || 0)),
    });
  }
  handleDesiredTokenAmount(event) {
    event.persist();
    this.setState({
      desiredTokens: Math.min(100, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredBOTWKeyAmount(event) {
    event.persist();
    this.setState({
      desiredBOTWKeys: Math.min(3, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredForestTempleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredForestTempleKeys: Math.min(5, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredFireTempleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredFireTempleKeys: Math.min(8, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredWaterTempleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredWaterTempleKeys: Math.min(6, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredSpiritTempleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredSpiritTempleKeys: Math.min(5, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredShadowTempleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredShadowTempleKeys: Math.min(5, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredGTGKeyAmount(event) {
    event.persist();
    this.setState({
      desiredGTGKeys: Math.min(9, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredGerudoFortressKeyAmount(event) {
    event.persist();
    this.setState({
      desiredGerudoFortressKeys: Math.min(4, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  handleDesiredGanonsCastleKeyAmount(event) {
    event.persist();
    this.setState({
      desiredGanonsCastleKeys: Math.min(2, Math.max(0, parseInt(event.target.value || 0))),
    });
  }
  
  
  handleItemLevelSelect(event, inputID) {
    event.persist();
    const [player, item] = inputID.split(".");
    let workingData = [...this.state.players];

    this.state.players.forEach((p, i) => {
      if (p.playerID === parseInt(player)) {
        workingData[i].items[item] = parseInt(event.target.value);
      }
    });
    this.setState({
      players: workingData,
    });
  }

  handleFileRead = (e) => {
    const content = this.fileReader.result;
    const data = !!content ? JSON.parse(content) : undefined;
    if (!content || !data || !data[":seed"]) {
      this.setState((s) => ({
        jsonError:
          "Error reading file. Make sure it is an OOT Randomizer spoiler log JSON file.",
      }));
    } else if (
      !!data.settings &&
      !!data.settings.world_count &&
      data.settings.world_count < 2
    ) {
      this.setState((s) => ({
        jsonError:
          "The selected spoiler log appears to be for a single-player seed.",
      }));
    } else {
      const id =
        data.hasOwnProperty(":seed_url") && data[":seed_url"].indexOf("=")
          ? data[":seed_url"].split("=")[1]
          : "(n/a)";

      const worlds = Object.values(data.locations).map((world, player) => {
        const items = Object.keys(world).map((check, i) => ({
          check,
          item: Object.values(world)[i].item,
          player: Object.values(world)[i].player,
          checked: false,
        }));
        const importantItems = items.filter(
          (j) =>
            j.item === "Triforce Piece" ||
            (player + 1 !== j.player &&
              (Object.keys(DESIRED_ITEMS).includes(j.item) ||
                !!Object.values(DESIRED_ITEMS).filter(
                  (x) => !!x.types && x.types.includes(j.item)
                ).length))
        );

        return importantItems.map((item, index) => ({
          ...item,
          itemId: `${player}.${index}`,
        }));
      });

      const players = Object.values(data.locations).map((_, player) => {
        const progressionItems = Object.keys(DESIRED_ITEMS).filter(
          (i) => !!DESIRED_ITEMS[i].count || !!DESIRED_ITEMS[i].progression
        );
        let playersCurrentItems = {};
        progressionItems.forEach((pi) => {
          playersCurrentItems[pi] = 0;
        });
        return {
          playerID: player + 1,
          items: playersCurrentItems,
        };
      });

      this.setState((s) => ({
        jsonLoaded: true,
        jsonError: undefined,
        locations: worlds,
        seedInfo: { seed: data[":seed"], id: id, hash: data.file_hash },
        triforceHunt: data.settings.triforce_hunt,
        checkedPieces: [],
        collectedPieces: 0,
        players,
	    desiredHearts: 20,
	    desiredHeartPieces: 0,
	    desiredTriforcePieces: 0
      }));
    }
  };

  handleFileChosen = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(file);
  };

  openCodeList = () => {
    this.reset();
    this.setState((s) => ({
      viewingCodes: true,
    }));
  };

  render() {
    return (
      <div className="App">
        {!this.state.jsonLoaded && !this.state.viewingCodes && (
          <React.Fragment>
            <h1>Choose your scenario</h1>
            <div className="scenarioContainer">
              <div className="scenario">
                <div className="descriptor">
                  <h2>1) A player left permanently without finishing</h2>
                  <p>
                    <b>
                      Upload a spoiler log and fill out info about everyone's
                      progress.
                    </b>
                  </p>
                  <p>
                    A set of lua codes for each remaining player will be
                    generated.
                    <br />
                    Enter your player-specific codes into your lua console to
                    receive your items, as if the missing player had
                    full-cleared.
                  </p>
                  <p>
                    The missing player's world will be spoiled, but no one
                    else's will be.
                  </p>
                </div>
                <label htmlFor="uploadLog" className="uploaderContainer">
                  <input
                    type="file"
                    className="input-file"
                    accept=".json"
                    id="uploadLog"
                    onChange={(e) => this.handleFileChosen(e.target.files[0])}
                  />
                  <div className="uploadButton">Upload Spoiler Log</div>
                </label>
                {!!this.state.jsonError && (
                  <div className="jsonError">{this.state.jsonError}</div>
                )}
              </div>
              <div className="scenario">
                <div className="descriptor">
                  <h2>2) All players still here, some items unsynced</h2>
                  <p>
                    <b>View a list of codes.</b>
                  </p>
                  <p>Great for situations like:</p>
                  <div>
                    - lost your saveram in a bizhawk crash;
                    <br />
                    - failed to receive an item sent while disconnected;
                    <br />
                    - triforce count is out of sync;
                    <br />
					- MW script granted you the same progressive item
                    twice due to connection problems;
					<br/>
					- horribly beefing an item glitch, or performing Talon Skip at a bad time
                  </div>
                  <p>
                    No spoiler log involved, just pick out the codes you need.
                  </p>
                </div>
                <button
                  className="showAllCodesButton"
                  id="showAllCodes"
                  onClick={() => {
                    this.openCodeList();
                  }}
                />
                <label htmlFor="showAllCodes" className="uploaderContainer">
                  <div className="uploadButton">View Code List</div>
                </label>
              </div>
            </div>
			<div>Ping @pidgezero_one#1337 if you run into any problems using this tool</div>
          </React.Fragment>
        )}
        {(!!this.state.jsonLoaded || !!this.state.viewingCodes) && (
          <div>
            <button
              id="showAllCodes"
              onClick={() => {
                this.reset();
              }}
            />
            <label htmlFor="showAllCodes" className="backButtonContainer">
              <div className="backButton">Back</div>
            </label>
          </div>
        )}
        {this.state.jsonLoaded && !this.state.viewingCodes && (
          <div className="seedInfo">
            <div>Seed: {this.state.seedInfo.seed}</div>
            {!!this.state.seedInfo.id && (
              <div>Seed ID: {this.state.seedInfo.id}</div>
            )}
            <div>Hash: {this.state.seedInfo.hash.join(", ")}</div>
          </div>
        )}
        {this.state.jsonLoaded && !this.state.viewingCodes && (
          <div className="chooseItems">
            <div className="maxRupeeContainer">
              <input
                id="toggleMaxRupees"
                type="checkbox"
                checked={this.state.maxRupees}
                onChange={(e) => this.handleMaxRupees(e)}
              />
              <label htmlFor="toggleMaxRupees">
                "Start with max rupees" is enabled in the randomizer settings
              </label>
            </div>

            <div className="playerSelectContainer">
              <label htmlFor="playerSelect">Missing player:</label>
              <select
                id="playerSelect"
                placeholder="Choose..."
                onChange={(e) => this.handleWorldSelect(e, "type")}
              >
                <option value="">Choose...</option>
                {this.state.locations.map((l, index) => (
                  <option value={index + 1} key={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            {!!this.state.droppedOutPlayer && (
              <div>
                Below is a list of all of the potentially important items and
                their specific locations in Player {this.state.droppedOutPlayer}
                's world, grouped by recipient.
                <br />
                Check off the items for each player that you suspect Player{" "}
                {this.state.droppedOutPlayer} has not found yet.
                <br />
                You can also fill out details on what items the recipients
                already have, which will help with giving the right codes for
                progressive items.
                <br />
                A list of Lua codes will generate on the fly. The recipient
                should then enter them one-by-one in the Output textbox of their
                Lua console window.
                <br />
                You can ignore error messages in the Lua output window.
                <br />
                <img src={`https://pidgezero.one/zootr/window.png`} />
                <br />
                <br />
                You will not see an animation for receiving these items, but you
                will notice them appearing in your pause menu.
                <br />
                <br />
              </div>
            )}

            {!!this.state.droppedOutPlayer && (
              <div>
                {this.state.triforceHunt && (
                  <div className="playerArea" key="th">
                    <div className="playerSectionHeader">Triforce pieces</div>
                    <div className="PlayerControlPanel">
                      <div className="warning">
                        ***Triforce Hunt lua codes will NOT WORK unless you've
                        updated your Bizhawk MW scripts since 2020-12-07***
                      </div>
                      <div className="PlayerCheckboxes">
                        {this.state.locations[this.state.droppedOutPlayer - 1]
                          .filter((l) => l.item == "Triforce Piece")
                          .map((check, checkIndex) => {
                            const inputId = `0.${checkIndex}`;
                            return (
                              <div className="item_row" key={check.itemId}>
                                <div>
                                  {
                                    <input
                                      type="checkbox"
                                      checked={this.state.checkedPieces.includes(
                                        inputId
                                      )}
                                      onChange={(e) =>
                                        this.handleTriforcePieceCheck(
                                          e,
                                          inputId
                                        )
                                      }
                                      id={inputId}
                                    />
                                  }
                                </div>
                                <label htmlFor={inputId}>
                                  <div className="foundItem">
                                    Player {this.state.droppedOutPlayer}'s{" "}
                                    {check.check}
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                      </div>
                      <div className="PlayerCurrentItems">
                        <div className="existingItemHeader">
                          Current # of triforce pieces:
                        </div>
                        <div key="Triforce Piece">
                          <input
                            type="text"
                            placeholder="Triforce Piece"
                            defaultValue={0}
                            onChange={(e) => this.handleTriforcePieceAmount(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.state.players.map((p) => {
                  if (this.state.droppedOutPlayer === p.playerID) {
                    return null;
                  } else {
                    let aggregatedItems = {};
                    this.state.locations.forEach((world) => {
                      world.forEach((check) => {
                        if (check.checked && check.player === p.playerID) {
                          const itemName = !!DESIRED_ITEMS[check.item]
                            ? check.item
                            : Object.keys(DESIRED_ITEMS).find(
                                (d) =>
                                  !!DESIRED_ITEMS[d] &&
                                  !!DESIRED_ITEMS[d].types &&
                                  DESIRED_ITEMS[d].types.includes(check.item)
                              );
                          const itemProperties = DESIRED_ITEMS[itemName];

                          const isTypeMatch =
                            !DESIRED_ITEMS[check.item] &&
                            DESIRED_ITEMS[itemName] &&
                            DESIRED_ITEMS[itemName].types.includes(check.item);

                          const value = () => {
                            if (
                              itemName === "Bottle" ||
                              itemName === "Adult Trade"
                            ) {
                              return check.item;
                            } else if (!isTypeMatch) {
                              if (
                                itemProperties.count ||
                                itemProperties.progression
                              ) {
                                return 1;
                              } else {
                                return true;
                              }
                            } else {
                              if (itemProperties.count) {
                                const match = check.item.match(/(\d+)/);
                                if (!!match && match.length) {
                                  return parseInt(match[0]);
                                } else {
                                  return check.item;
                                }
                              } else if (!!itemProperties.progression) {
                                return 1;
                              } else {
                                return true;
                              }
                            }
                          };

                          const val = value();
                          if (itemName === "Bottle") {
                            if (!aggregatedItems[itemName]) {
                              aggregatedItems[itemName] = [];
                            }
                            aggregatedItems[itemName].push(check.item);
                          } else if (itemName === "Adult Trade") {
                            aggregatedItems[itemName] = val;
                          } else if (!!aggregatedItems[itemName]) {
                            if (
                              aggregatedItems[itemName] === true ||
                              aggregatedItems[itemName] === false
                            ) {
                              aggregatedItems[itemName] = val;
                            } else if (!isNaN(aggregatedItems[itemName])) {
                              aggregatedItems[itemName] += val;
                            }
                          } else {
                            aggregatedItems[itemName] = val;
                          }
                        }
                      });
                    });

                    Object.keys(p.items).forEach((key) => {
                      const max = !!DESIRED_ITEMS[key].max
                        ? DESIRED_ITEMS[key].max
                        : DESIRED_ITEMS[key].stages.length - 1;
                      if (
                        aggregatedItems[key] &&
                        key !== "Bottle" &&
                        key !== "Adult Trade"
                      ) {
                        aggregatedItems[key] += !!DESIRED_ITEMS[key].max
                          ? p.items[key] || 0
                          : (p.items[key] || 0) - 1;
                        if (aggregatedItems[key] > max) {
                          aggregatedItems[key] = max;
                        }
                      }
                    });

                    return (
                      <div className="playerArea" key={p.playerID}>
                        <div className="playerSectionHeader">
                          Player {p.playerID}'s items
                        </div>
                        <div className="PlayerControlPanel">
                          <div className="PlayerCheckboxes">
                            {this.state.locations[
                              this.state.droppedOutPlayer - 1
                            ]
                              .filter((l) => l.player === p.playerID)
                              .sort((a, b) => {
                                if (a.item < b.item) {
                                  return -1;
                                }
                                if (a.item > b.item) {
                                  return 1;
                                }
                                return 0;
                              })
                              .map((check, checkIndex) => {
                                const inputId = `${p.playerID}.${checkIndex}`;
                                return (
                                  <div className="item_row" key={check.itemId}>
                                    <div>
                                      {
                                        <input
                                          type="checkbox"
                                          checked={check.checked}
                                          onChange={(e) =>
                                            this.handleCheck(e, check.itemId)
                                          }
                                          id={inputId}
                                        />
                                      }
                                    </div>
                                    <label htmlFor={inputId}>
                                      <div className="foundItem">
                                        {check.item}
                                      </div>
                                      <div className="foundItemLocation">
                                        Player {this.state.droppedOutPlayer}'s{" "}
                                        {check.check}
                                      </div>
                                    </label>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="PlayerCurrentItems">
                            <div className="existingItemHeader">
                              Player {p.playerID}'s existing items:
                            </div>
                            {Object.keys(p.items)
                              .filter((k) => k != "Triforce Piece")
                              .map((existingItem) => {
                                const itemModel = DESIRED_ITEMS[existingItem];
                                const elementId = `${p.playerID}.${existingItem}`;
                                const placeholder = /^Small Key/.test(
                                  existingItem
                                )
                                  ? `${existingItem} (excluding used keys)`
                                  : existingItem;
                                if (!!itemModel.count) {
                                  return (
                                    <div key={existingItem}>
                                      <label>{placeholder}</label>
                                      <input
                                        type="text"
                                        placeholder={placeholder}
                                        defaultValue={p.items[existingItem]}
                                        onChange={(e) =>
                                          this.handleItemLevelSelect(
                                            e,
                                            elementId
                                          )
                                        }
                                      />
                                    </div>
                                  );
                                } else if (!!itemModel.progression) {
                                  return (
                                    <div key={existingItem}>
                                      <label>{placeholder}</label>
                                      <select
                                        defaultValue={p.items[existingItem]}
                                        onChange={(e) =>
                                          this.handleItemLevelSelect(
                                            e,
                                            elementId
                                          )
                                        }
                                      >
                                        {itemModel.progression.map(
                                          (name, level) => (
                                            <option value={level} key={level}>
                                              {name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                          </div>
                        </div>
                        {(!!Object.keys(aggregatedItems).length ||
                          (this.state.triforceHunt &&
                            parseInt(this.state.collectedPieces) +
                              this.state.checkedPieces.length >
                              0)) && (
                          <div className="LuaCodeContainer">
                            <div className="PlayerLuaCodes">
                              <div className="LuaHeader">
                                Lua codes for Player {p.playerID}:
                              </div>
                              {Object.keys(aggregatedItems).map((lc) => {
                                const lua = () => {
                                  if (lc === "Bottle") {
                                    let numBottles = p.items[lc] || 0;
                                    const bottleCodes = [];
                                    aggregatedItems[lc].forEach((b) => {
                                      if (numBottles <= 3) {
                                        bottleCodes.push(
                                          `${DESIRED_ITEMS[lc].stages[numBottles][0]} = "${DESIRED_ITEMS[lc].keys[b]}"`
                                        );
                                        numBottles++;
                                      }
                                    });
                                    return bottleCodes;
                                  } else if (lc === "Adult Trade") {
                                    return DESIRED_ITEMS[lc].stages[0].map(
                                      (code) =>
                                        `${code} = "${aggregatedItems[lc]}"`
                                    );
                                  } else if (DESIRED_ITEMS[lc].count) {
                                    return DESIRED_ITEMS[
                                      lc
                                    ].stages[0].map((code) =>
                                      code.replace("#", aggregatedItems[lc])
                                    );
                                  } else if (
                                    DESIRED_ITEMS[lc].stages.length > 1 &&
                                    !isNaN(aggregatedItems[lc])
                                  ) {
                                    if (
                                      lc === "Progressive Wallet" &&
                                      !this.state.maxRupees
                                    ) {
                                      return DESIRED_ITEMS[lc].stages[
                                        aggregatedItems[lc]
                                      ].slice(0, -1);
                                    } else {
                                      return DESIRED_ITEMS[lc].stages[
                                        aggregatedItems[lc]
                                      ];
                                    }
                                  } else {
                                    return DESIRED_ITEMS[lc].stages[0];
                                  }
                                };

                                const luaCodes = lua();
                                return (
                                  <span>
                                    {luaCodes.map((code, codeIndex) => (
                                      <div className="LuaCode" key={codeIndex}>
                                        {code}
                                      </div>
                                    ))}
                                  </span>
                                );
                              })}
                              {this.state.triforceHunt &&
                                parseInt(this.state.collectedPieces) +
                                  this.state.checkedPieces.length >
                                  0 && (
                                  <div className="LuaCode" key="_">
                                    {DESIRED_ITEMS[
                                      "Triforce Piece"
                                    ].stages[0].map((code) =>
                                      code.replace(
                                        "#",
                                        (
                                          parseInt(this.state.collectedPieces) +
                                          this.state.checkedPieces.length
                                        )
                                          .toString(16)
                                          .padStart(2, "0")
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}

        {!this.state.jsonLoaded && this.state.viewingCodes && (
          <React.Fragment>
            <div className="seedInfo">OOT Randomizer Item Retrieval Lua Code Table</div>
			<div>
			Below is a table of lua codes you can use to fix anything amiss in your inventory.<br/>
			In case of errors, codes to undo erroneous grants are included.<br/>
			Note that it is possible to overwrite a progressive item with an earlier form (i.e. hookshot over longshot). <br/>
			Some grants/removals require the use of multiple codes, it is recommended you use all the codes given for the action you are trying to take.<br/>
			For items like triforce pieces, skulltula tokens, heart pieces, and small keys, you will be prompted to give the amount you want the code to grant you.<br/>
			Enter all necessary codes one-by-one in the Output textbox of your Lua console window. You can ignore error messages that appear.
                <br />
                <img src={`https://pidgezero.one/zootr/window.png`} />
			</div>
            <div>
              <table className="codeTable">
			    <thead>
					<tr>
					  <th>
					  Item
					  </th>
					  <th>
					  Quantity
					  </th>
					  <th>
					  Code
					  </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
						Items - Deku Sticks
						</td>
						<td>
						10
						</td>
						<td>
						oot.sav.equipment.stick_capacity = "10 Sticks"<br/>
						oot.sav.ammo.deku_sticks = 10<br/>
						oot.sav.inventory.deku_sticks = "Deku Sticks"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						20
						</td>
						<td>
						oot.sav.equipment.stick_capacity = "20 Sticks"<br/>
						oot.sav.ammo.deku_sticks = 20<br/>
						oot.sav.inventory.deku_sticks = "Deku Sticks"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						30
						</td>
						<td>
						oot.sav.equipment.stick_capacity = "30 Sticks"<br/>
						oot.sav.ammo.deku_sticks = 30<br/>
						oot.sav.inventory.deku_sticks = "Deku Sticks"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.stick_capacity = "No Sticks"<br/>
						oot.sav.ammo.deku_sticks = 0<br/>
						oot.sav.inventory.deku_sticks = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Slingshot
						</td>
						<td>
						30
						</td>
						<td>
						oot.sav.equipment.bullet_bag = "Bullet Seed Bag"<br/>
						oot.sav.ammo.slingshot = 30<br/>
						oot.sav.inventory.slingshot = "Slingshot"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						40
						</td>
						<td>
						oot.sav.equipment.bullet_bag = "Bigger Bullet Seed Bag"<br/>
						oot.sav.ammo.slingshot = 40<br/>
						oot.sav.inventory.slingshot = "Slingshot"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						50
						</td>
						<td>
						oot.sav.equipment.bullet_bag = "Biggest Bullet Seed Bag"<br/>
						oot.sav.ammo.slingshot = 50<br/>
						oot.sav.inventory.slingshot = "Slingshot"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.bullet_bag = "No Bullet Bag"<br/>
						oot.sav.ammo.slingshot = 0<br/>
						oot.sav.inventory.slingshot = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Boomerang
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.boomerang = "Boomerang"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.boomerang = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Deku Nuts
						</td>
						<td>
						20
						</td>
						<td>
						oot.sav.equipment.nut_capacity = "20 Nuts"<br/>
						oot.sav.ammo.deku_nuts = 20<br/>
						oot.sav.inventory.deku_nuts = "Deku Nuts"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						30
						</td>
						<td>
						oot.sav.equipment.nut_capacity = "30 Nuts"<br/>
						oot.sav.ammo.deku_nuts = 30<br/>
						oot.sav.inventory.deku_nuts = "Deku Nuts"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						40
						</td>
						<td>
						oot.sav.equipment.nut_capacity = "40 Nuts"<br/>
						oot.sav.ammo.deku_nuts = 40<br/>
						oot.sav.inventory.deku_nuts = "Deku Nuts"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.nut_capacity = "No Nuts"<br/>
						oot.sav.ammo.deku_nuts = 0<br/>
						oot.sav.inventory.deku_nuts = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Ocarina
						</td>
						<td>
						Fairy Ocarina
						</td>
						<td>
						oot.sav.inventory.ocarina = "Fairy Ocarina"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Ocarina of Time
						</td>
						<td>
						oot.sav.inventory.ocarina = "Ocarina of Time"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.ocarina = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Lens of Truth
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.lens_of_truth = "Lens of Truth"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.lens_of_truth = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Bombs
						</td>
						<td>
						20
						</td>
						<td>
						oot.sav.equipment.bomb_bag = "Bomb Bag"<br/>
						oot.sav.ammo.bombs = 20<br/>
						oot.sav.inventory.bombs = "Bombs"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						30
						</td>
						<td>
						oot.sav.equipment.bomb_bag = "Bigger Bomb Bag"<br/>
						oot.sav.ammo.bombs = 30<br/>
						oot.sav.inventory.bombs = "Bombs"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						40
						</td>
						<td>
						oot.sav.equipment.bomb_bag = "Biggest Bomb Bag"<br/>
						oot.sav.ammo.bombs = 40<br/>
						oot.sav.inventory.bombs = "Bombs"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.bomb_bag = "No Bomb Bag"<br/>
						oot.sav.ammo.bombs = 0<br/>
						oot.sav.inventory.bombs = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Bombchus
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.bombchus = "Bombchus"<br/>
						oot.sav.ammo.bombchus = 50
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.bombchus = 0xFF<br/>
						oot.sav.ammo.bombchus = 0
						</td>
					</tr>
					<tr>
						<td>
						Items - Magic Beans
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.magic_beans = "Magic Beans"<br/>
						oot.sav.ammo.magic_beans = 10
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.magic_beans = 0xFF<br/>
						oot.sav.ammo.magic_beans = 0
						</td>
					</tr>
					<tr>
						<td>
						Items - Bow
						</td>
						<td>
						30
						</td>
						<td>
						oot.sav.equipment.quiver = "Quiver"<br/>
						oot.sav.ammo.bow = 30<br/>
						oot.sav.inventory.bow = "Bow"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						40
						</td>
						<td>
						oot.sav.equipment.quiver = "Bigger Quiver"<br/>
						oot.sav.ammo.bow = 40<br/>
						oot.sav.inventory.bow = "Bow"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						50
						</td>
						<td>
						oot.sav.equipment.quiver = "Biggest Quiver"<br/>
						oot.sav.ammo.bow = 50<br/>
						oot.sav.inventory.bow = "Bow"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.quiver = "No Quiver"<br/>
						oot.sav.ammo.bow = 0<br/>
						oot.sav.inventory.bow = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Hookshot
						</td>
						<td>
						Hookshot
						</td>
						<td>
						oot.sav.inventory.hookshot = "Hookshot"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Longshot
						</td>
						<td>
						oot.sav.inventory.hookshot = "Longshot"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.hookshot = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Megaton Hammer
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.megaton_hammer = "Megaton Hammer"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.megaton_hammer = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Fire Arrows
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.fire_arrow = "Fire Arrow"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.fire_arrow = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Ice Arrows
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.ice_arrow = "Ice Arrow"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.ice_arrow = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Light Arrows
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.light_arrow = "Light Arrow"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.light_arrow = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Din's Fire
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.dins_fire = "Dins Fire"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.dins_fire = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Nayru's Love
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.nayrus_love = "Nayrus Love"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.nayrus_love = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Farore's Wind
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.inventory.farores_wind = "Farores Wind"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.farores_wind = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Bottle<br/>
						</td>
						<td>
						Ruto's Letter
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Rutos Letter"<br/>
						oot.sav.inventory.bottle2 = "Rutos Letter"<br/>
						oot.sav.inventory.bottle3 = "Rutos Letter"<br/>
						oot.sav.inventory.bottle4 = "Rutos Letter"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Milk
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Lon Lon Milk"<br/>
						oot.sav.inventory.bottle2 = "Lon Lon Milk"<br/>
						oot.sav.inventory.bottle3 = "Lon Lon Milk"<br/>
						oot.sav.inventory.bottle4 = "Lon Lon Milk"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Red Potion
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Red Potion"<br/>
						oot.sav.inventory.bottle2 = "Red Potion"<br/>
						oot.sav.inventory.bottle3 = "Red Potion"<br/>
						oot.sav.inventory.bottle4 = "Red Potion"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Green Potion
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Green Potion"<br/>
						oot.sav.inventory.bottle2 = "Green Potion"<br/>
						oot.sav.inventory.bottle3 = "Green Potion"<br/>
						oot.sav.inventory.bottle4 = "Green Potion"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Blue Potion
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Blue Potion"<br/>
						oot.sav.inventory.bottle2 = "Blue Potion"<br/>
						oot.sav.inventory.bottle3 = "Blue Potion"<br/>
						oot.sav.inventory.bottle4 = "Blue Potion"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Fairy
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Bottled Fairy"<br/>
						oot.sav.inventory.bottle2 = "Bottled Fairy"<br/>
						oot.sav.inventory.bottle3 = "Bottled Fairy"<br/>
						oot.sav.inventory.bottle4 = "Bottled Fairy"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Fish
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Fish"<br/>
						oot.sav.inventory.bottle2 = "Fish"<br/>
						oot.sav.inventory.bottle3 = "Fish"<br/>
						oot.sav.inventory.bottle4 = "Fish"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Bug
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Bug"<br/>
						oot.sav.inventory.bottle2 = "Bug"<br/>
						oot.sav.inventory.bottle3 = "Bug"<br/>
						oot.sav.inventory.bottle4 = "Bug"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Blue Fire
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Blue Fire"<br/>
						oot.sav.inventory.bottle2 = "Blue Fire"<br/>
						oot.sav.inventory.bottle3 = "Blue Fire"<br/>
						oot.sav.inventory.bottle4 = "Blue Fire"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Poe
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Poe"<br/>
						oot.sav.inventory.bottle2 = "Poe"<br/>
						oot.sav.inventory.bottle3 = "Poe"<br/>
						oot.sav.inventory.bottle4 = "Poe"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Big Poe
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Big Poe"<br/>
						oot.sav.inventory.bottle2 = "Big Poe"<br/>
						oot.sav.inventory.bottle3 = "Big Poe"<br/>
						oot.sav.inventory.bottle4 = "Big Poe"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Empty
						</td>
						<td>
						oot.sav.inventory.bottle1 = "Empty Bottle"<br/>
						oot.sav.inventory.bottle2 = "Empty Bottle"<br/>
						oot.sav.inventory.bottle3 = "Empty Bottle"<br/>
						oot.sav.inventory.bottle4 = "Empty Bottle"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.bottle1 = 0xFF<br/>
						oot.sav.inventory.bottle2 = 0xFF<br/>
						oot.sav.inventory.bottle3 = 0xFF<br/>
						oot.sav.inventory.bottle4 = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Adult Trade
						</td>
						<td>
						Pocket Egg
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Pocket Egg"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Pocket Cucco
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Pocket Cucco"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Cojiro
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Cojiro"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Odd Mushroom
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Odd Mushroom"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Odd Potion
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Odd Potion"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Poacher's Saw
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Poachers Saw"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Broken Sword
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Broken Sword"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Prescription
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Prescription"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Eyeball Frog
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Eyeball Frog"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Eyedrops
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Eyedrops"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Claim Check
						</td>
						<td>
						oot.sav.inventory.adult_trade = "Claim Check"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.adult_trade = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Items - Child Trade
						</td>
						<td>
						Weird Egg
						</td>
						<td>
						oot.sav.inventory.child_trade = "Weird Egg"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Chicken
						</td>
						<td>
						oot.sav.inventory.child_trade = "Chicken"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Zelda's Letter
						</td>
						<td>
						oot.sav.inventory.child_trade = "Zeldas Letter"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Keaton Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Keatan Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Skull Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Skull Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Spooky Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Spooky Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Bunny Hood
						</td>
						<td>
						oot.sav.inventory.child_trade = "Bunny Hood"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Mask of Truth
						</td>
						<td>
						oot.sav.inventory.child_trade = "Mask of Truth"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Goron Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Goron Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Zora Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Zora Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Gerudo Mask
						</td>
						<td>
						oot.sav.inventory.child_trade = "Gerudo Mask"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Sold Out
						</td>
						<td>
						oot.sav.inventory.child_trade = "Sold Out"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.inventory.child_trade = 0xFF
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Kokiri Sword
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.kokiri_sword = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.kokiri_sword = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Master Sword
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.master_sword = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.master_sword = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Giant's Knife
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.biggoron_sword = true<br/>
						oot.sav.biggoron_sword_durable = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.biggoron_sword = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Biggoron's Sword
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.biggoron_sword = true<br/>
						oot.sav.biggoron_sword_durable = true<br/>
						oot.sav.equipment.broken_sword_icon = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.biggoron_sword = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Deku Shield
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.kokiri_shield = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.kokiri_shield = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Hylian Shield
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.hylian_shield = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.hylian_shield = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Mirror Shield
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.mirror_shield = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.mirror_shield = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Kokiri Tunic
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.kokiri_tunic = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.kokiri_tunic = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Goron Tunic
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.goron_tunic = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.goron_tunic = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Zora Tunic
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.zora_tunic = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.zora_tunic = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Kokiri Boots
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.kokiri_boots = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.kokiri_boots = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Iron Boots
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.iron_boots = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.iron_boots = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Hover Boots
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.equipment.hover_boots = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.hover_boots = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Strength
						</td>
						<td>
						Goron Bracelet
						</td>
						<td>
						oot.sav.equipment.strength = "Goron Bracelet"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Silver Gauntlets
						</td>
						<td>
						oot.sav.equipment.strength = "Silver Gauntlets"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Golden Gauntlets
						</td>
						<td>
						oot.sav.equipment.strength = "Golden Gauntlets"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.strength = "No Strength Upgrade"
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Scale
						</td>
						<td>
						Silver Scale
						</td>
						<td>
						oot.sav.equipment.scale = "Silver Scale"
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Golden Scale
						</td>
						<td>
						oot.sav.equipment.scale = "Golden Scale"
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.equipment.scale = "No Scale"
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Stone of Agony
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.stone_of_agony = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.stone_of_agony = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Gerudo Membership Card
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.gerudo_card = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.gerudo_card = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Equipment - Heart Pieces/Containers
						</td>
						<td>
						desired total hearts in health bar (current + owed): 
						<input
								type="text"
								placeholder="1-20"
								defaultValue={20}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredHeartAmount(e)}
							  /><br/>
						desired # of incomplete heart pieces:
						<input
								type="text"
								placeholder="0-3"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredHeartPieceAmount(e)}
							  />
						</td>
						<td>
						oot.sav.max_health = 0x{(this.state.desiredHearts * 16).toString(16).padStart(2, "0")}<br/>
						oot.sav.cur_health = 0x{(this.state.desiredHearts * 16).toString(16).padStart(2, "0")}<br/>
						oot.sav.heart_pieces = {this.state.desiredHeartPieces}
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Double Defense
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.double_defense_hearts = 0x140<br/>
						oot.sav.double_defense = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.double_defense_hearts = 0<br/>
						oot.sav.double_defense = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Magic Meter
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.have_magic = true<br/>
						oot.sav.have_double_magic = false<br/>
						oot.sav.magic_meter_size = 0x30<br/>
						oot.sav.cur_magic = 0x30
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						double
						</td>
						<td>
						oot.sav.have_magic = true<br/>
						oot.sav.have_double_magic = true<br/>
						oot.sav.magic_meter_size = 0x60<br/>
						oot.sav.cur_magic = 0x60
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.magic_meter_size = 0<br/>
						oot.sav.cur_magic = 0<br/>
						oot.sav.have_double_magic = false<br/>
						oot.sav.have_magic = false
						</td>
					</tr>
					<tr>
						<td>
						Equipment - Wallet
						</td>
						<td>
						Adult's Wallet
						</td>
						<td>
						oot.sav.equipment.wallet = "Adult's Wallet"<br/>
						oot.sav.rupees = 200
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Giant's Wallet
						</td>
						<td>
						oot.sav.equipment.wallet = "Giant's Wallet"<br/>
						oot.sav.rupees = 500
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
						Tycoon's Wallet
						</td>
						<td>
						oot.sav.equipment.wallet = 0xc7<br/>
						oot.sav.rupees = 999
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						reset
						</td>
						<td className="undo">
						oot.sav.equipment.wallet = "Child's Wallet"<br/>
						oot.sav.rupees = 99
						</td>
					</tr>
					<tr>
						<td>
						Songs - Zelda's Lullaby
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.zeldas_lullaby = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.zeldas_lullaby = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Epona's Song
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.eponas_song = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.eponas_song = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Saria's Song
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.sarias_song = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.sarias_song = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Sun's Song
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.suns_song = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.suns_song = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Song of Time
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.song_of_time = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.song_of_time = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Song of Storms
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.song_of_storms = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.song_of_storms = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Minuet of Forest
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.minuet_of_forest = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.minuet_of_forest = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Bolero of Fire
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.bolero_of_fire = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.bolero_of_fire = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Serenade of Water
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.seranade_of_water = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.seranade_of_water = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Requiem of Spirit
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.requiem_of_spirit = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.requiem_of_spirit = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Nocturne of Shadow
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.nocturne_of_shadow = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.nocturne_of_shadow = false
						</td>
					</tr>
					<tr>
						<td>
						Songs - Prelude of Light
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.prelude_of_light = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.prelude_of_light = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Collections - Gold Skulltula Tokens
						</td>
						<td>
						desired total tokens (current + owed): 
						<input
								type="text"
								placeholder="0-100"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredTokenAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.gold_skulltulas = {this.state.desiredTokens}<br/>
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Collections - Triforce Pieces<br/>
						<span class="codeTableNote">(bizhawk-co-op 2020-12-07 or later)</span>
						</td>
						<td>
						desired total pieces (current + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredTriforcePieceAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.triforce_pieces = 0x{(this.state.desiredTriforcePieces).toString(16).padStart(2, "0")}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Kokiri's Emerald
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.kokiri_emerald = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.kokiri_emerald = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Goron's Ruby
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.goron_ruby = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.goron_ruby = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Zora's Sapphire
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.zora_sapphire = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.zora_sapphire = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Light Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.light_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.light_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Forest Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.forest_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.forest_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Fire Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.fire_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.fire_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Water Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.water_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.water_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Spirit Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.spirit_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.spirit_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Rewards - Shadow Medallion
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.quest_status.shadow_medallion = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.quest_status.shadow_medallion = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Deku Tree Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x00].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x00].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Deku Tree Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x00].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x00].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Dodongo's Cavern Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x01].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x01].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Dodongo's Cavern Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x01].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x01].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Jabu Jabu's Belly Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x02].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x02].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Jabu Jabu's Belly Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x02].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x02].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Bottom of the Well Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x08].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x08].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Bottom of the Well Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x08].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x08].compass = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Bottom of the Well Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredBOTWKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x08] = {this.state.desiredBOTWKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Forest Temple Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x03].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x03].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Forest Temple Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x03].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x03].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Forest Temple Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x03].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x03].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Forest Temple Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredForestTempleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x03] = {this.state.desiredForestTempleKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Fire Temple Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x04].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x04].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Fire Temple Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x04].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x04].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Fire Temple Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x04].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x04].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Fire Temple Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredFireTempleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x04] = {this.state.desiredFireTempleKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Water Temple Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x05].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x05].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Water Temple Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x05].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x05].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Water Temple Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x05].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x05].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Water Temple Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredWaterTempleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x05] = {this.state.desiredWaterTempleKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Spirit Temple Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x06].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x06].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Spirit Temple Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x06].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x06].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Spirit Temple Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x06].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x06].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Spirit Temple Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredSpiritTempleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x06] = {this.state.desiredSpiritTempleKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Shadow Temple Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x07].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x07].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Shadow Temple Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x07].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x07].compass = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Shadow Temple Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x07].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x07].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Shadow Temple Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredShadowTempleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x07] = {this.state.desiredShadowTempleKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Ice Cavern Map
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x09].map = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x09].map = false
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Ice Cavern Compass
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x09].compass = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x09].compass = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Gerudo Training Grounds Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredGTGKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x0B] = {this.state.desiredGTGKeys}<br/>
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Gerudo Fortress Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredGerudoFortressKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x0C] = {this.state.desiredGerudoFortressKeys}<br/>
						</td>
					</tr>
					<tr>
						<td>
						Dungeons - Ganon's Tower Boss Key
						</td>
						<td>
						obtain
						</td>
						<td>
						oot.sav.dungeon_items[0x0A].boss_key = true
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						</td>
						<td>
						remove
						</td>
						<td className="undo">
						oot.sav.dungeon_items[0x0A].boss_key = false
						</td>
					</tr>
					<tr className="itemSeparator">
						<td>
						Dungeons - Ganon's Castle Small Keys<br/>
						</td>
						<td>
						desired total small keys (current unused + owed): 
						<input
								type="text"
								defaultValue={0}
								className="inlineTextbox"
								onChange={(e) => this.handleDesiredGanonsCastleKeyAmount(e)}
							  /><br/>
						</td>
						<td>
						oot.sav.small_keys[0x0D] = {this.state.desiredGanonsCastleKeys}<br/>
						</td>
					</tr>
				</tbody>
              </table>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
