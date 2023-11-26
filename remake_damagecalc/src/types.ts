export enum Party {
  MARIO = "mario",
  MALLOW = "mallow",
  GENO = "geno",
  BOWSER = "bowser",
  PEACH = "peach",
}

export enum LevelupBonus {
  ATTACK = 0,
  HP = 1,
  SP = 2,
}

export interface Formula {
  function: Function;
  written: string;
}

export enum HitType {
  HIT = "0",
  BLOCK = "1",
}

export enum ChainLevel {
  ZERO = "0",
  TWO = "2",
  THREE = "3",
  FIVE = "5",
}

export enum AttackTimingModifier {
  PERFECT = "2",
  PARTIAL = "1.5",
  NONE = "1",
}

export enum AttackElement {
  FIRE = "Fire",
  THUNDER = "Thunder",
  ICE = "Ice",
  JUMP = "Jump",
  CRITICAL = "Critical",
  WATER = "Pure Water",
  NONE = "None",
  ALL = "All",
}

export enum AttackStatus {
  NONE = "None",
  MUTE = "Mute",
  SLEEP = "Sleep",
  FEAR = "Fear",
  POISON = "Poison",
}

export enum AttackType {
  PHYSICAL = 0,
  SPELL = 1,
  TRIPLE = 2,
  ITEM = 3,
}

export enum TimingType {
  THREE_TIER = "3 tier",
  FIVE_TIER = "5 tier",
  JUMP = "Regular Jump",
  BUTTON_PRESSES = "button presses",
  CRITICAL = "critical",
  NONE = "none",
}

export enum GenoBuff {
  NO_CHAIN = "1",
  TWO_CHAIN = "1.03",
  THREE_CHAIN = "1.06",
  FIVE_CHAIN = "1.12",
}
export enum SpeedBuff {
  NO_CHAIN = "1",
  TWO_CHAIN = "1.1",
  THREE_CHAIN = "1.2",
  FIVE_CHAIN = "1.24",
}
export enum MallowBuff {
  NO_CHAIN = "1",
  TWO_CHAIN = "1.1",
  SSS_BUFF = "1.12",
  THREE_CHAIN = "1.2",
  FIVE_CHAIN = "1.25",
}
export enum BowserBuff {
  NO_CHAIN = "1",
  TWO_CHAIN = "1.1",
  THREE_CHAIN = "1.2",
  FIVE_CHAIN = "1.25",
}
export enum PeachBuff {
  NO_CHAIN = "1",
  TWO_CHAIN = "1.1",
  THREE_CHAIN = "1.2",
  FIVE_CHAIN = "1.25",
}

export interface Attack {
  name: AttackName;
  type: AttackType;
  basepower: number;
  minLevel: number;
  element: AttackElement;
  timingType: TimingType;
  hosei: number;
  per_hit: number;
  cap?: number;
  tiers?: string[];
  defaultTier?: string;
}

export enum EnemyAttackName {
  PHYSICAL = "Physical",
  PHYSICAL_1_5X = "Physical 1.5x",
  PHYSICAL_2X = "Physical 2x",
  ARROW_RAIN = "Arrow Rain",
  AURORA_FLASH = "Aurora Flash",
  BACKFIRE = "Backfire",
  BIG_BANG = "Big Bang",
  BLAST = "Blast",
  BLAZER = "Blazer",
  BLIZZARD = "Blizzard",
  BODY_SLAM = "Body Slam",
  BOLT = "Bolt",
  BOMBS_AWAY = "Bombs Away",
  BOULDER = "Boulder",
  BREAKER_BEAM = "Breaker Beam",
  CARD_TOSS = "Card Toss",
  CARD_RAIN = "Card Rain",
  CARNI_KISS = "Carni-Kiss",
  CELEBRATION_SHOT = "Celebration Shot",
  CHEST_HEAD_SCARECROW_SPELL = "Chest head scarecrow spell",
  CHOMP = "Chomp",
  CLAW = "Claw",
  CRYSTAL = "Crystal",
  DARK_CLAW = "Dark Claw",
  DARK_STAR = "Dark Star",
  DEATHSICKLE = "Deathsickle",
  DIAMOND_SAW = "Diamond Saw",
  ECHOFINDER = "Echofinder",
  ELECTROSHOCK = "Electroshock",
  FANGS = "Fangs",
  FEAR_ROULETTE = "Fear Roulette",
  FINAL_CLAW = "Final Claw",
  FIRE_SABER = "Fire Saber",
  FLAME_STONE = "Flame Stone",
  FLAME_WALL = "Flame Wall",
  FLAME = "Flame",
  FLARE = "Flare",
  FUN_AND_RUN = "Fun & Run",
  FUNGUSPIKE = "Funguspike",
  GRINDER = "Grinder",
  GUNK_BALL = "Gunk Ball",
  HAMMER_TIME = "Hammer Time",
  HOT_SHOT = "Hot Shot",
  ICE_ROCK = "Ice Rock",
  INK_BLAST = "Ink Blast",
  JINXED = "Jinxed",
  LAST_SHOT = "Last Shot!",
  LIGHT_BUBBLE = "Light Bubble",
  LIGHTNING_ORB = "Lightning Orb",
  LOCO_EXPRESS = "Loco Express",
  LOCO_EXPRESS_023 = "Loco Express 023",
  MAGNUM = "Magnum",
  MEGA_RECOVER = "Mega Recover",
  METEOR = "Meteor",
  METEOR_BLAST = "Meteor Blast",
  METEOR_SWARM = "Meteor Swarm",
  MIGRAINE = "Migraine",
  MISSED_ME = "Missed me!",
  MULTISTRIKE = "Multistrike",
  PAIN_SPOUT = "Pain Spout",
  PETAL_BLAST = "Petal Blast",
  PIERCE = "Pierce",
  POISON = "Poison",
  PSYCHE = "Psyche!",
  QUICKSILVER = "Quicksilver",
  RECOVER = "Recover",
  SAND_STORM = "Sand Storm",
  REAPER_SICKLE = "Reaper Scicke",
  SHAKER = "Shaker",
  SILVER_BULLET = "Silver Bullet",
  SKEWER = "Skewer",
  SLEDGE = "Sledge",
  SOLIDIFY = "Solidify",
  SPEAR_RAIN = "Spear Rain",
  SPRITZ_BOMB = "Spritz Bomb",
  STATIC_ELECTRICITY = "Static Electricity",
  STORM = "Storm",
  SWORD_RAIN = "Sword Rain",
  TERRAPUNCH = "Terrapunch",
  THORNET = "Thornet",
  TRIPLE_KICK = "Triple Kick",
  VA_VA_VOOM = "Va Va Voom",
  WATER_BLAST = "Water Blast",
  WEIRD_MUSHROOM = "Weird Mushroom",
  WILL_O_WISP = "Will-o-Wisp",
}
export interface EnemyAttack {
  name: EnemyAttackName;
  basepower: number;
  element: AttackElement;
  multiplier: number;
  blockable: boolean;
  type: AttackType;
}

export interface Weapon {
  name: WeaponName;
  basepower: number;
  magicAttack?: number;
  variance: number;
}

export interface Armor {
  name: ArmorName;
  defense: number;
  magicDefense: number;
  attack: number;
  magicAttack: number;
  speed: number;
}
export interface Accessory {
  name: AccessoryName;
  defense: number;
  magicDefense: number;
  attack: number;
  magicAttack: number;
  speed: number;
}

export enum AttackName {
  PHYSICAL = "Physical",
  JUMP = "Jump (ジャンプ)",
  FIREBALL = "Fireball (ファイアボール)",
  SUPER_JUMP = "Super Jump (スーパージャンプ)",
  SUPER_FIREBALL = "Super Fireball (スーパーファイア)",
  ULTRA_JUMP = "Ultra Jump (ウルトラジャンプ)",
  ULTRA_FIREBALL = "Ultra Fireball (ウルトラファイア)",
  THUNDERBOLT = "Thunderbolt (でんげきビリリ)",
  SHOCKER = "Shocker (かみなりドッカン)",
  SNOWY = "Snowy (ユキやこんこん)",
  STAR_RAIN = "Star Rain (キラキラおとし)",
  GENO_BEAM = "Geno Beam (ジーノビーム)",
  GENO_WHIRL = "Geno Whirl (ジーノカッター)",
  GENO_BLAST = "Geno Blast (ジーノブラスト)",
  GENO_FLASH = "Geno Flash (ジーノフラッシュ)",
  TERRORIZE = "Terrorize (きょうふのしょうげき)",
  POISON_GAS = "Poison Gas (どくガスもくもく)",
  CRUSHER = "Crusher (つきでろボボーン)",
  MECHAKOOPA_STOMP = "Mechakoopa Stomp (メカクッパプレス)",
  PSYCH_BOMB = "Psych Bomb (ヒステリックボム)",
  STAR_GUST = "Star Gust (ほしのあめ)",
  STAR_RIDERS = "Star Riders (スターライダーズ)",
  CLOWN_CAR_BARRAGE = "Clown Car Barrage (ビリひやファイアビッグボム)",
  SHOOTING_STAR_SHOT = "Shooting Star Shot (シューティングスターショット)",
  STARRY_SHELL_SPIKE = "Starry Shell Spike (ムテキこうらスパイク)",
  BAD_MUSHROOM = "Bad Mushroom",
  FRIGHT_BOMB = "Fright Bomb",
  STAR_EGG = "Star Egg",
  FIRE_BOMB = "Fire Bomb",
  ICE_BOMB = "Ice Bomb",
  ROCK_CANDY = "Rock Candy"
}

export enum WeaponName {
  UNARMED = "Unarmed (すで)",
  CHAIN_CHOMP = "Chain Chomp (ワンワン)",
  CYMBALS = "Cymbals (シンバル)",
  DOUBLE_PUNCH = "Double Punch (スーパーダブルパンチ)",
  DRILL_CLAW = "Drill Claw (ドリルクロー)",
  FAKE_CHOMP = "Fake Chomp (ワンワンのぬけがら)",
  FINGER_SHOT = "Finger Shot (フィンガーショット)",
  FROGGIE_STICK = "Froggie Stick (ケロケロのつえ)",
  FRYING_PAN = "Frying Pan (フライパン)",
  HAMMER = "Hammer (ハンマー)",
  HAND_CANNON = "Hand Cannon (ハンドキャノン)",
  HAND_GUN = "Hand Gun (ハンドガン)",
  HURLY_GLOVES = "Hurly Gloves (ぶんなげグローブ)",
  LAZY_SHELL = "Lazy Shell (ひまんパタこうら)",
  LUCKY_HAMMER = "Lucky Hammer (ラッキーハンマー)",
  MASHER = "Masher (ムラっけハンマー)",
  MEGA_GLOVE = "Mega Glove (でかパンチグローブ)",
  KOOPA_SHELL = "Koopa Shell (ノコノコこうら)",
  PARASOL = "Parasol (パラソル)",
  PARATROOPA_SHELL = "Paratroopa Shell (パタパタこうら)",
  PUNCH_GLOVE = "Punch Glove (パンチグローブ)",
  RIBBIT_STICK = "Ribbit Stick (ゲコゲコのつえ)",
  SAGE_STICK = "Sage Stick (せんにんのつえ)",
  SLAP_GLOVE = "Slap Glove (ビンタグローブ)",
  SONIC_CYMBALS = "Sonic Cymbals (ソニックシンバル)",
  SPIKED_CHOMP = "Spiked Chomp (トゲワンワン)",
  STAR_GUN = "Star Gun (スターガン)",
  STELLA_023 = "Stella 023 (ステラ023)",
  STICKY_GLOVE = "Sticky Glove (くっつきグローブ)",
  SUPER_HAMMER = "Super Hammer (スーパーハンマー)",
  SUPER_SLAP = "Super Slap (ちょービンタグローブ)",
  ULTRA_HAMMER = "Ultra Hammer (ウルトラハンマー)",
  WAR_FAN = "War Fan (センス)",
  WHOMP_GLOVE = "Whomp Glove (のびパンチグローブ)",
  WONDER_CHOMP = "Wonder Chomp (すごいワンワン)",
}

export enum ArmorName {
  NONE = "(NONE)",
  FIRE_SHIRT = "Fire Shirt (ファイアつなぎ)",
  FUZZY_SHIRT = "Fuzzy Shirt (ふかふかつなぎ)",
  HAPPY_SHIRT = "Happy Shirt (ハッピーつなぎ)",
  HERO_SHIRT = "Hero Shirt (ヒーローつなぎ)",
  LAZY_SHELL = "Lazy Shell (ひまんパタこうら)",
  MEGA_SHIRT = "Mega Shirt (ばっちりつなぎ)",
  SAILOR_SHIRT = "Sailor Shirt (セーラーつなぎ)",
  SHIRT = "Shirt (ふつうのつなぎ)",
  SUPER_SUIT = "Super Suit (スーパージャンパー)",
  THICK_SHIRT = "Thick Shirt (しっかりつなぎ)",
  WORK_PANTS = "Work Pants (ばっちいパンツ)",
  FIRE_PANTS = "Fire Pants (ファイアパンツ)",
  FUZZY_PANTS = "Fuzzy Pants (ふかふかパンツ)",
  HAPPY_PANTS = "Happy Pants (ハッピーパンツ)",
  MEGA_PANTS = "Mega Pants (ばっちりパンツ)",
  PRINCE_PANTS = "Prince Pants (プリンスパンツ)",
  SAILOR_PANTS = "Sailor Pants (セーラーパンツ)",
  PANTS = "Pants (ふつうのパンツ)",
  THICK_PANTS = "Thick Pants (しっかりパンツ)",
  STAR_CAPE = "Star Cape (スターマント)",
  FIRE_CAPE = "Fire Cape (ファイアマント)",
  FUZZY_CAPE = "Fuzzy Cape (ふかふかマント)",
  HAPPY_CAPE = "Happy Cape (ハッピーマント)",
  MEGA_CAPE = "Mega Cape (ばっちりマント)",
  SAILOR_CAPE = "Sailor Cape (セーラーマント)",
  CAPE = "Cape (ふつうのマント)",
  COURAGE_SHELL = "Courage Shell (むてきのこうら)",
  FIRE_SHELL = "Fire Shell (ファイアシェル)",
  HAPPY_SHELL = "Happy Shell (ハッピーシェル)",
  HEEL_SHELL = "Heel Shell (ヒールシェル)",
  WORK_PANTS_BOWSER = "Work Pants (ばっちいパンツ)",
  FIRE_DRESS = "Fire Dress (ファイアドレス)",
  FUZZY_DRESS = "Fuzzy Dress (ふかふかドレス)",
  SAILOR_DRESS = "Sailor Dress (セーラードレス)",
  LOVELY_DRESS = "Lovely Dress (ラブラブドレス)",
  ROYAL_DRESS = "Royal Dress (プリンセスドレス)",
}

export enum AccessoryName {
  NONE = "(NONE)",
  ANTIDOTE_PIN = "Antidote Pin (どくふせぎバッジ)",
  ATTACK_SCARF = "Attack Scarf (ジャンパースカーフ)",
  BOOSTERS_CHARM = "Booster's Charm (ブッキーのおまもり)",
  COIN_TRICK = "Coin Trick (かがやけるひのために)",
  DEFENSE_SCARF = "Defense Scarf (ぼうぎょスカーフ)",
  ECHO_SIGNAL_RING = "Echo Signal Ring (もっとおしらせリング)",
  ENDURING_BROOCH = "Enduring Brooch (ふんばりブローチ)",
  EXP_BOOSTER = "Exp. Booster (あなたをこえたくて)",
  FEARLESS_PIN = "Fearless Pin (きょうふふせぎバッジ)",
  FEATHER = "Feather (ドドのはね)",
  FLOWER_RING = "Flower Ring (きみがいてくれたから)",
  GHOST_MEDAL = "Ghost Medal (ゆうれいくんしょう)",
  JINX_BELT = "Jinx Belt (ジャッキーベルト)",
  JUMP_SHOES = "Jump Shoes (かいてんシューズ)",
  NURTURE_RING = "Nurture Ring (ラブラブリング)",
  QUARTZ_CHARM = "Quartz Charm (クリスタルのおまもり)",
  SAFETY_BADGE = "Safety Badge (あんしんバッジ)",
  SAFETY_RING = "Safety Ring (セーフティーリング)",
  SIGNAL_RING = "Signal Ring (おしらせリング)",
  TEAMWORK_BAND = "Teamwork Band (ねっけつハチマキ)",
  TROOPA_MEDAL = "Troopa Medal (パタパタくんしょう)",
  TRUEFORM_PIN = "Trueform Pin (へんしんふせぎバッジ)",
  WAKE_UP_PIN = "Wake Up Pin (ぼんやりふせぎバッジ)",
  ZOOM_SHOES = "Zoom Shoes (シュビビンシューズ)",
}

export interface StatCollection {
  hp: number;
  attack: number;
  defense: number;
  magicAttack: number;
  magicDefense: number;
}

export interface LevelStats extends StatCollection {
  speed: number;
}

export interface StatBonus {
  pow: { attack: number; defense: number };
  hp: { hp: number };
  sp: { magicAttack: number; magicDefense: number };
}
export interface Level {
  stats: StatCollection;
  bonus: StatBonus;
}

export interface Character {
  id: Party;
  name: string;
  levelBonuses: Level[];
  statbonuses: LevelupBonus[];
  level: number;
  minLevel: number;
  attacks: AttackName[];
  weapons: WeaponName[];
  armors: ArmorName[];
  accessories: AccessoryName[];
  activeWeapon: WeaponName;
  activeArmor: ArmorName;
  activeAccessory: AccessoryName;
  activeAttack: AttackName;
  hasAttackBoost: boolean;
  hasDefenseBoost: boolean;
  isFeared: boolean;
  speed: number;
}

export enum EnemyNames {
  ALLEY_RAT = "Alley Rat",
  AMANITA = "Amanita",
  AMEBOID = "Ameboid",
  APPRENTICE = "Apprentice",
  ARACHNE = "Arachne",
  ARMORED_ANT = "Armored Ant",
  ARTICHOKER = "Artichoker",
  AXEM_BLACK = "Axem Black",
  AXEM_BLACK_MACHINE_MADE = "Axem Black (Machine Made)",
  AXEM_GREEN = "Axem Green",
  AXEM_GREEN_MACHINE_MADE = "Axem Green (Machine Made)",
  AXEM_PINK = "Axem Pink",
  AXEM_PINK_MACHINE_MADE = "Axem Pink (Machine Made)",
  AXEM_RED = "Axem Red",
  AXEM_RED_MACHINE_MADE = "Axem Red (Machine Made)",
  AXEM_YELLOW = "Axem Yellow",
  AXEM_YELLOW_MACHINE_MADE = "Axem Yellow (Machine Made)",
  BAD_ADDER = "Bad Adder",
  BAHAMUTT = "Bahamutt",
  BANDANA_BLUE = "Bandana Blue",
  BANDANA_RED = "Bandana Red",
  BEEZO = "Beezo",
  BELOME_1 = "Belome 1",
  BELOME_2 = "Belome 2",
  BELOME_SCRATCHY_THROAT = "Belome (Scratchy Throat)",
  BIG_BLASTER = "Big Blaster",
  BIG_TROOPA = "Big Troopa",
  BIRDO = "Birdo",
  BIRDY = "Birdy",
  BLASTER = "Blaster",
  BLOOPER = "Blooper",
  BLUEBIRD = "Bluebird",
  BOB_OMB = "Bob-omb",
  BOB_OMB_STRONG = "Bob-omb (Strong)",
  BODY = "Body",
  BODYGUARD = "Bodyguard",
  BODYGUARD_MACHINE_MADE = "Bodyguard (Machine Made)",
  BOO = "Boo",
  BOOMER_RED = "Boomer (red)",
  BOOMER_BLUE = "Boomer (blue)",
  BOOSTER = "Booster",
  BOOSTER_ENGINE_023 = "Booster (Engine 023)",
  BOWSER = "Bowser",
  BOWSER_CLONE = "Bowser Clone",
  BOWSER_CLONE_STRONG = "Bowser Clone (Strong)",
  BOWYER = "Bowyer",
  BOWYER_MACHINE_MADE = "Bowyer (Machine Made)",
  BUNDT = "Bundt",
  BUNDT_EXTRA_FANCY = "Bundt (Extra-Fancy, 0 candles)",
  BUNDT_1 = "Bundt (Extra-Fancy, 1 candle)",
  BUNDT_2 = "Bundt (Extra-Fancy, 2 candles)",
  BUNDT_3 = "Bundt (Extra-Fancy, 3 candles)",
  BUNDT_4 = "Bundt (Extra-Fancy, 4 candles)",
  BUNDT_5 = "Bundt (Extra-Fancy, 5 candles)",
  BUZZER = "Buzzer",
  CARROBOSCIS = "Carroboscis",
  CHAIN_CHOMP = "Chain Chomp",
  CHAINDELIER = "Chaindelier",
  CHAINED_KONG = "Chained Kong",
  CHEEP_CHEEP = "Cheep Cheep",
  CHEWY = "Chewy",
  CHOMP_CHOMP = "Chomp Chomp",
  CHOW = "Chow",
  CLAYMORTON = "Claymorton",
  CLAYMORTON_MACHINE_MADE = "Claymorton (Machine Made)",
  CLERK = "Clerk",
  CLOAKER = "Cloaker",
  CLOAKER_2 = "Cloaker (fused)",
  CLUSTER = "Cluster",
  COMEON = "Comeon",
  COUNT_DOWN = "Count Down",
  CROCO_1 = "Croco 1",
  CROCO_2 = "Croco 2",
  CROOK = "Crook",
  CRUSTY = "Crusty",
  CULEX = "Culex",
  CULEX_3D = "Culex 3D",
  CZAR_DRAGON = "Czar Dragon",
  DIRECTOR = "Director",
  DODO_1 = "Dodo 1",
  DODO_2 = "Dodo 2",
  DOLLOX = "Dollox",
  DOMINO = "Domino",
  DOMINO_2 = "Domino (fused)",
  DOPPEL = "Doppel",
  DRY_BONES = "Dry Bones",
  EARTH_CRYSTAL = "Earth Crystal",
  EARTH_CRYSTAL_3D = "Earth Crystal 3D",
  EGGBERT = "Eggbert",
  ENIGMA = "Enigma",
  ENIGMAX = "Enigmax",
  EXOR = "Exor",
  FACTORY_CHIEF = "Factory Chief",
  FINK_FLOWER = "Fink Flower",
  FIRE_CRYSTAL = "Fire Crystal",
  FIRE_CRYSTAL_3D = "Fire Crystal 3D",
  FORKIE = "Forkie",
  FORMLESS = "Formless",
  FROGOG = "Frogog",
  GASSOX = "Gassox",
  GECKIT = "Geckit",
  GECKO = "Gecko",
  GENO_CLONE = "Geno Clone",
  GENO_CLONE_STRONG = "Geno Clone (Strong)",
  GLUM_REAPER = "Glum Reaper",
  GOOMBA = "Goomba",
  GRAND_TROOPA = "Grand Troopa",
  GRATE_GUY = "Grate Guy",
  GREAPER = "Greaper",
  GUERRILLA = "Guerrilla",
  GUNYOLK = "Gunyolk",
  HAMMER_BRO = "Hammer Bro",
  HELIO = "Helio",
  HIGH_BOO = "Li'l Boo",
  HIPPOPO = "Hippopo",
  HOBGOBLIN = "Hobgoblin",
  HUHWHAT = "Huhwhat",
  JABIT = "Jabit",
  JABIT_MACHINE_MADE = "Jabit (Machine Made)",
  JAGGER = "Jagger",
  JAWFUL = "Jawful",
  JESTER = "Jester",
  JINNIE = "Jinnie",
  JINX_1 = "Jinx 1",
  JINX_2 = "Jinx 2",
  JINX_3 = "Jinx 3",
  JINX_CLONE = "Jinx Clone",
  JINX_MARIO_STYLE = "Jinx (Mario-Style)",
  JOHNNY = "Johnny",
  JOHNNY_SOLO = "Johnny (Solo)",
  JOHNNY_2 = "Johnny (Duel-Ready)",
  K_9 = "K-9",
  KING_BOMB = "King Bomb",
  KING_CALAMARI = "King Calamari",
  KNIFE_GUY = "Knife Guy",
  KRIFFID = "Kriffid",
  LAKITU = "Lakitu",
  LAVA_BABBLE = "Lava Babble",
  LAVA_BLUBBLE = "Lava Blubble",
  LAVA_BUBBLE = "Lava Bubble",
  LEFT_EYE = "Left Eye",
  LEUKO = "Leuko",
  MAD_ADDER = "Mad Adder",
  MAD_MALLET = "Mad Mallet",
  MAGMITE = "Magmite",
  MAGMUS = "Magmus",
  MALAKOOPA = "Malakoopa",
  MALLOW_CLONE = "Mallow Clone",
  MALLOW_CLONE_STRONG = "Mallow Clone (Strong)",
  MANAGER = "Manager",
  MARIO_CLONE = "Mario Clone",
  MARIO_CLONE_STRONG = "Mario Clone (Strong)",
  MASTADOOM = "Mastadoom",
  MEGASMILAX = "Megasmilax",
  MEZZO_BOMB = "Mezzo Bomb",
  MICROBOMB = "Microbomb",
  MINI_GOOMBA = "Mini Goomba",
  MOUTH = "Mouth",
  MR_KIPPER = "Mr. Kipper",
  MUCKLE = "Muckle",
  NINJA = "Ninja",
  OCTOLOT = "Octolot",
  OCTOVADER = "Octovader",
  ORB_USER = "Orb User",
  ORBISON = "Orbison",
  PARATROOPA = "Paratroopa",
  PEACH_CLONE = "Peach Clone",
  PEACH_CLONE_STRONG = "Peach Clone (Strong)",
  PINWHEEL = "Pinwheel",
  PIRANHA_PLANT = "Piranha Plant",
  PLEASENO = "Pleaseno",
  POUNDER = "Pounder",
  POUNDETTE = "Poundette",
  PRO_GOOMBA = "Pro Goomba",
  PULSAR = "Pulsar",
  PUNCHINELLO = "Punchinello",
  PUNCHINELLO_LEVELED_UP = "Punchinello (Leveled-Up)",
  PUPPOX = "Puppox",
  RASPBERRY = "Raspberry",
  RASPBERRY_EXTRA_FANCY = "Raspberry (Extra Fancy)",
  RAT_FUNK = "Rat Funk",
  REACHER = "Reacher",
  RIBBITE = "Ribbite",
  RIGHT_EYE = "Right Eye",
  RING_A_DING = "Ring-a-Ding",
  ROB_OMB = "Rob-omb",
  SACKIT = "Sackit",
  SHADOW = "Shadow",
  SHAMAN = "Shaman",
  SHELLY = "Shelly",
  SHOGUN = "Shogun",
  SHY_GUY = "Shy Guy",
  SHY_RANGER = "Shy Ranger",
  SHYMORE = "Shymore",
  SHYPER = "Shyper",
  SLING_SHY = "Sling Shy",
  SMELTER = "Smelter",
  SMILAX = "Smilax",
  SMITHY_1 = "Smithy 1",
  SMITHY_BODY = "Smithy (Body)",
  SMITHY_CASKET = "Smithy (Casket)",
  SMITHY_REAL_FORM = "Smithy (Real Form)",
  SMITHY_TANK = "Smithy (Tank)",
  SMITHY_TREASURE_CHEST = "Smithy (Treasure Chest)",
  SMITHY_WIZARD = "Smithy (Wizard)",
  SNAPDRAGON = "Snapdragon",
  SNIFIT = "Snifit",
  SNIFSTER = "Snifster",
  SNIFSTER_STRONG = "Snifster (Strong)",
  SPEARDOVICH = "Speardovich",
  SPEARDOVICH_DUPLICATE = "Speardovich (Duplicate)",
  SPEARDOVICH_MACHINE_MADE = "Speardovich (Machine Made)",
  SPIKESTER = "Spikester",
  SPIKEY = "Spikey",
  SPINTHRA = "Spinthra",
  SPRINGER = "Springer",
  STAR_CRUSTER = "Star Cruster",
  STARSLAP = "Starslap",
  STINGER = "Stinger",
  STOMPILLAR = "Stompillar",
  STRAW_HEAD = "Straw Head",
  STUMPET = "Stumpet",
  TENTACLE_LEFT = "Tentacle Left",
  TENTACLE_RIGHT = "Tentacle Right",
  TERRA_COTTA = "Terra Cotta",
  TERRAPIN = "Terrapin",
  THE_BLADE = "The Blade",
  THROPHER = "Thropher",
  TORTE = "Torte",
  TORTE_EXHAUSTED = "Torte (Exhausted)",
  VALENTINA = "Valentina",
  URSPIKE = "Urspike",
  VOMER = "Vomer",
  WATER_CRYSTAL = "Water Crystal",
  WATER_CRYSTAL_3D = "Water Crystal 3D",
  WHUHOH = "Whuhoh",
  WIGGLER = "Wiggler",
  WIND_CRYSTAL = "Wind Crystal",
  WIND_CRYSTAL_3D = "Wind Crystal 3D",
  WIZAKOOPA = "Wizakoopa",
  ZEOSTAR = "Zeostar",
  ZOMBONE = "Zombone",
}

export interface Enemy {
  name: EnemyNames;
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  magicAttack: number;
  magicDefense: number;
  resistance: Array<AttackStatus | AttackElement>;
  weakness: Array<AttackElement>;
  attacks: EnemyAttackName[];
}
