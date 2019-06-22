var st;
var level = 1;
var healt = 3;
var p;
var score = 0;
var boss_healt = 2;
var gold = 0;
var hscore = {name:"", score:""};
var Q = window.Q = Quintus({development: true}, {audioSupported:['ogg', 'mp3']})
        .include("Audio, Sprites, Scenes, Input, 2D, Anim, UI, Touch")
        .setup({maximize: false, width: window.innerWidth, height: window.innerHeight})
        .touch();
if(localStorage.score === undefined)
    localStorage.score = '{"name":"", "score":"0"}';
hscore = JSON.parse(localStorage.score);

Q.input.keyboardControls();
Q.input.joypadControls();
Q.enableSound();

Q.gravityY = 980;
Q.gravityX = 0;

Q.load("level1.tmx, end.mp3, death.mp3, coin.mp3, coin.png, jump.mp3, gold.json, slime.json, spike.json, boss.png, boss.json, spike.png, slime.png, level2.tmx, level3.tmx, level4.tmx, terrain-1.png, wizard.json, wizard.png, Menu.mp3, Menu.ogg, ingame.mp3, ingame.ogg", function()
{
    Q.sheet("terrain-1", "terrain-1.png", {tilew: 32, tileh: 32});
    Q.compileSheets("wizard.png", "wizard.json");
    Q.compileSheets("slime.png", "slime.json");
    Q.compileSheets("spike.png", "spike.json");
    Q.compileSheets("boss.png", "boss.json");
    Q.compileSheets("coin.png", "gold.json");
    Q.stageScene("preload");
});


Q.scene('preload', function(stage) {
    var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));
    if(window.innerHeight > window.innerWidth){
        var sign = box.insert(new Q.UI.Text({x:0, y: 0, color: "#ffffff", 
                                        label: "Please rotate your\ndevice and restart"}));
    }
    if(window.innerHeight < window.innerWidth){
            Q.clearStages();
            Q.stageScene('menu');
    }
    box.fit(100);
});
Q.scene('hud', function(stage) {
    var container = stage.insert(new Q.UI.Container({
        x: window.innerWidth-130, y: 0
    }));
    
    var score_c = container.insert(new Q.UI.Text({x: 20, y: 20,
        label: "💰 x " + score + "  " + "❤️ x " + healt, id: "score_c", color: "white", align: "center"}));
    var button = container.insert(new Q.UI.Button({ x: -40, y: 60,
                                           label: "🎵" }));
    var button2 = container.insert(new Q.UI.Button({ x: 40, y: 60,
                                           label: "🎮" }));
    button.on("click",function() {
        if(localStorage.music === "0"){
            Q.audio.play("ingame.mp3", {loop: true});
            localStorage.music = "1";
        }
        else{
            Q.audio.stop("ingame.mp3");
            localStorage.music = "0";
        }
    });
    
        button2.on("click",function() {
        if(localStorage.sfx === "0"){
            localStorage.sfx = "1";
        }
        else{
            localStorage.sfx = "0";
        }
    });
});
Q.scene('menu', function(stage) {
    var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));
    if(window.innerHeight > window.innerWidth){
        var sign = box.insert(new Q.UI.Text({x:0, y: 0, color: "#ffffff", 
                                        label: "Please rotate your device"}));
    }
    
  
    var button = box.insert(new Q.UI.Button({ x: 0, y: -75, fill: "#1601af",
                                           label: "New Game" }));
    var button2 = box.insert(new Q.UI.Button({ x: 0, y: -25, fill: "#1601af",
                                           label: "Music on/off" }));
    var button3 = box.insert(new Q.UI.Button({ x: 0, y: 25, fill: "#1601af",
                                           label: "SFX on/off" }));
    var button4 = box.insert(new Q.UI.Button({ x: 0, y: 75, fill: "#1601af",
                                           label: "Highest Score" }));
    if(localStorage.music !== "0")
        Q.audio.play("Menu.mp3", {loop: true});
  
    button.on("click",function() {
        Q.clearStages();
        Q.stageScene('transition');
        Q.audio.stop("Menu.mp3");
    });
    
    button4.on("click",function() {
        Q.audio.stop("Menu.mp3");
        Q.clearStages();
        Q.stageScene('high');
    });
  
    button2.on("click",function() {
        if(localStorage.music === "0"){
            Q.audio.play("Menu.mp3", {loop: true});
            localStorage.music = "1";
        }
        else{
            Q.audio.stop("Menu.mp3");
            localStorage.music = "0";
        }
    });
    
        button3.on("click",function() {
        if(localStorage.sfx === "0"){
            localStorage.sfx = "1";
        }
        else{
            localStorage.sfx = "0";
        }
    });
    
    box.fit(100);
});
Q.scene('high', function(stage) {
    var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2 /*fill: "rgba(0,0,0,0.5)"*/
    }));
    var button = box.insert(new Q.UI.Button({ x: 0, y: Q.height/4, fill: "#1601af",
                                           label: "Menu" }));
  
    var label = box.insert(new Q.UI.Text({x:0, y: 0, color: "#ffffff", 
                                        label: "Highest Score\n\n" + hscore.name + " " + hscore.score}));
    button.on("click",function() {
        Q.clearStages();
        Q.stageScene('menu');
    });
    box.fit(100);
});
Q.scene('transition', function(stage) {
    Q.audio.stop("ingame.mp3");
    var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2 /*fill: "rgba(0,0,0,0.5)"*/
    }));
  
    var label = box.insert(new Q.UI.Text({x:0, y: -50, color: "#ffffff", 
                                        label: "Level: " + level }));
    var label2 = box.insert(new Q.UI.Text({x:0, y: 50, color: "#ffffff", 
                                        label: "❤️ x " + healt}));
    box.fit(100);
    setTimeout(function(){
        Q.clearStages();
        Q.stageScene('level' + level);
        Q.stageScene('hud', 1);
    }, 3000);
});
Q.scene('endGame', function(stage) {
    Q.audio.stop("ingame.mp3");
    var box = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2 /*fill: "rgba(0,0,0,0.5)"*/
    }));
 
    if(score > hscore.score){
        var name = prompt("Please enter your name");
        var label = box.insert(new Q.UI.Text({x:0, y: -75, color: "#FFFFFF", 
                                        label: "Game Over"}));
        var label2 = box.insert(new Q.UI.Text({x:0, y: -25, color: "#FFFFFF", 
                                        label: "New Highest Score"}));
        var label3 = box.insert(new Q.UI.Text({x:0, y: 25, color: "#FFFFFF", 
                                        label: "Your score: " + score }));
        var button = box.insert(new Q.UI.Button({ x: 0, y: 75, fill: "#1601af",
                                           label: "Menu" }));
        hscore.score = score;
        hscore.name = name;
        localStorage.score = JSON.stringify(hscore);
    }else{
        var label = box.insert(new Q.UI.Text({x:0, y: -50, color: "#FFFFFF", 
                                        label: "Game Over"}));
        var label2 = box.insert(new Q.UI.Text({x:0, y: 50, color: "#FFFFFF", 
                                        label: "Your score: " + score}));
        var button = box.insert(new Q.UI.Button({ x: 0, y: 75, fill: "#1601af",
                                           label: "Menu" }));
    }

    box.fit(100);
    button.on("click",function() {
        level = 1;
        healt = 3;
        score = 0;
        boss_healt = 2;
        gold = 0;
        Q.clearStages();
        Q.stageScene('menu');
    });
});
Q.scene('level1', function(stage) {
    level = 1;
    background = new Q.TileLayer({dataAsset: 'level1.tmx', layerIndex: 0, sheet: 'terrain-1', tileW: 32, tileH: 32, type: Q.SPRITE_NONE});
    stage.insert(background);
    if(localStorage.music === "1"){
        Q.audio.play("ingame.mp3", {loop: true});
    }
    var coll = stage.collisionLayer(new Q.TileLayer({dataAsset: 'level1.tmx', layerIndex: 1, sheet: "terrain-1", tileW: 32, tileH: 32, type: Q.SPRITE_DEFAULT}));
    player = stage.insert(new Q.Player({x: 537, y: 960}));
    stage.insert(new Q.Enemy({ x: 1003, y: 976 }));
    stage.insert(new Q.Enemy({ x: 2070, y: 784 }));
    stage.insert(new Q.Enemy({ x: 2896, y: 784 }));
    stage.insert(new Q.Spike({ x: 1195, y: 976 }));
    stage.insert(new Q.Spike({ x: 3272, y: 976 }));
    
    stage.insert(new Q.Gold({ x: 784, y: 880 }));
    stage.insert(new Q.Gold({ x: 846, y: 880 }));
    stage.insert(new Q.Gold({ x: 817, y: 816 }));
    stage.insert(new Q.Gold({ x: 2026, y: 688 }));
    stage.insert(new Q.Gold({ x: 2058, y: 688 }));
    stage.insert(new Q.Gold({ x: 2090, y: 688 }));
    stage.insert(new Q.Gold({ x: 2058, y: 784 }));
    stage.insert(new Q.Gold({ x: 1903, y: 976 }));
    stage.insert(new Q.Gold({ x: 1967, y: 976 }));
    stage.insert(new Q.Gold({ x: 2031, y: 976 }));
    stage.insert(new Q.Gold({ x: 2095, y: 976 }));
    stage.insert(new Q.Gold({ x: 2161, y: 976 }));
    stage.insert(new Q.Gold({ x: 3150, y: 976 }));
    stage.insert(new Q.Gold({ x: 3086, y: 976 }));
    stage.insert(new Q.Gold({ x: 3214, y: 976 }));
    stage.insert(new Q.Gold({ x: 3864, y: 976 }));
    
    stage.add("viewport").follow(player);
    if(window.innerWidth < 1000)
        stage.viewport.scale = 0.8;
    else
        stage.viewport.scale = 1.8;
    st = stage;
});
Q.scene('level2', function(stage) {
    level = 2;
    if(localStorage.music === "1"){
        Q.audio.play("ingame.mp3", {loop: true});
    }
    background = new Q.TileLayer({dataAsset: 'level2.tmx', layerIndex: 0, sheet: 'terrain-1', tileW: 32, tileH: 32, type: Q.SPRITE_NONE});
    stage.insert(background);
    var coll = stage.collisionLayer(new Q.TileLayer({dataAsset: 'level2.tmx', layerIndex: 1, sheet: "terrain-1", tileW: 32, tileH: 32, type: Q.SPRITE_DEFAULT}));
    player = stage.insert(new Q.Player({x: 419, y: 960 /*x: 1299, y: 2504*/}));
    stage.insert(new Q.Enemy({ x: 1410, y: 976 }));
    stage.insert(new Q.Enemy({ x: 2324, y: 976 }));
    stage.insert(new Q.Enemy({ x: 2370, y: 976 }));
    stage.insert(new Q.Spike({ x: 2141, y: 976 }));
    stage.insert(new Q.Spike({ x: 2870, y: 976 }));
    stage.insert(new Q.Spike({ x: 3121, y: 976 }));
    stage.insert(new Q.Spike({ x: 3593, y: 976 }));
    
    stage.insert(new Q.Gold({ x: 816, y: 880 }));
    stage.insert(new Q.Gold({ x: 848, y: 880 }));
    stage.insert(new Q.Gold({ x: 1044, y: 976 }));
    stage.insert(new Q.Gold({ x: 1488, y: 784 }));
    stage.insert(new Q.Gold({ x: 1872, y: 944 }));
    stage.insert(new Q.Gold({ x: 2160, y: 976 }));
    stage.insert(new Q.Gold({ x: 2128, y: 976 }));
    stage.insert(new Q.Gold({ x: 2192, y: 976 }));
    stage.insert(new Q.Gold({ x: 2926, y: 976 }));
    stage.insert(new Q.Gold({ x: 2990, y: 976 }));
    stage.insert(new Q.Gold({ x: 3054, y: 976 }));
    stage.insert(new Q.Gold({ x: 3118, y: 976 }));
    stage.insert(new Q.Gold({ x: 3182, y: 976 }));
    stage.insert(new Q.Gold({ x: 3256, y: 976 }));
    
    stage.add("viewport").follow(player);

    if(window.innerWidth < 1000)
        stage.viewport.scale = 0.8;
    else
        stage.viewport.scale = 1.8;
    st = stage;
});
Q.scene('level3', function(stage) {
    level = 3;
    if(localStorage.music === "1"){
        Q.audio.play("ingame.mp3", {loop: true});
    }
    background = new Q.TileLayer({dataAsset: 'level3.tmx', layerIndex: 0, sheet: 'terrain-1', tileW: 32, tileH: 32, type: Q.SPRITE_NONE});
    stage.insert(background);
    var coll = stage.collisionLayer(new Q.TileLayer({dataAsset: 'level3.tmx', layerIndex: 1, sheet: "terrain-1", tileW: 32, tileH: 32, type: Q.SPRITE_DEFAULT}));
    player = stage.insert(new Q.Player({x: 240, y: 688 /*x: 1299, y: 2504*/}));
    stage.insert(new Q.Enemy({ x: 553, y: 976 }));
    stage.insert(new Q.Enemy({ x: 3122, y: 976 }));
    stage.insert(new Q.Enemy({ x: 590, y: 976 }));
    stage.insert(new Q.Spike({ x: 863, y: 976 }));
    stage.insert(new Q.Spike({ x: 1548, y: 976 }));
    stage.insert(new Q.Spike({ x: 1807, y: 976 }));
    stage.insert(new Q.Spike({ x: 4305, y: 976 }));
    
    stage.insert(new Q.Gold({ x: 151, y: 976 }));
    stage.insert(new Q.Gold({ x: 841, y: 976 }));
    stage.insert(new Q.Gold({ x: 1550, y: 976 }));
    stage.insert(new Q.Gold({ x: 1614, y: 976 }));
    stage.insert(new Q.Gold({ x: 1678, y: 976 }));
    stage.insert(new Q.Gold({ x: 1678, y: 752 }));
    stage.insert(new Q.Gold({ x: 1742, y: 976 }));
    stage.insert(new Q.Gold({ x: 1806, y: 976 }));
    stage.insert(new Q.Gold({ x: 2216, y: 976 }));
    stage.insert(new Q.Gold({ x: 2320, y: 976 }));
    stage.insert(new Q.Gold({ x: 2408, y: 976 }));
    stage.insert(new Q.Gold({ x: 3084, y: 976 }));
    stage.insert(new Q.Gold({ x: 3216, y: 976 }));
    stage.insert(new Q.Gold({ x: 4295, y: 976 }));
    
    stage.add("viewport").follow(player);

    if(window.innerWidth < 1000)
        stage.viewport.scale = 0.8;
    else
        stage.viewport.scale = 1.8;
    st = stage;

});
Q.scene('level4', function(stage) {
    level = 4;
    if(localStorage.music === "1"){
        Q.audio.play("ingame.mp3", {loop: true});
    }
    background = new Q.TileLayer({dataAsset: 'level4.tmx', layerIndex: 0, sheet: 'terrain-1', tileW: 32, tileH: 32, type: Q.SPRITE_NONE});
    stage.insert(background);
    var coll = stage.collisionLayer(new Q.TileLayer({dataAsset: 'level4.tmx', layerIndex: 1, sheet: "terrain-1", tileW: 32, tileH: 32, type: Q.SPRITE_DEFAULT}));
    player = stage.insert(new Q.Player({x: 144, y: 976 /*x: 1299, y: 2504*/}));
    stage.insert(new Q.Enemy({ x: 682, y: 976 }));
    stage.insert(new Q.Enemy({ x: 3313, y: 976 }));
    stage.insert(new Q.Enemy({ x: 3380, y: 976 })); 
    stage.insert(new Q.Enemy({ x: 1635, y: 1136 }));
    stage.insert(new Q.Spike({ x: 2292, y: 976 }));
    stage.insert(new Q.Spike({ x: 4016, y: 784 }));
    stage.insert(new Q.Spike({ x: 4368, y: 720 }));
    boss = stage.insert(new Q.Boss({ x: 4141, y: 976 }));
    
    stage.insert(new Q.Gold({ x: 689, y: 976 }));
    stage.insert(new Q.Gold({ x: 1171, y: 976 }));
    stage.insert(new Q.Gold({ x: 1558, y: 1136 }));
    stage.insert(new Q.Gold({ x: 1622, y: 1136 }));
    stage.insert(new Q.Gold({ x: 1686, y: 1136 }));
    stage.insert(new Q.Gold({ x: 2355, y: 976 }));
    stage.insert(new Q.Gold({ x: 2845, y: 976 }));
    stage.insert(new Q.Gold({ x: 3279, y: 976 }));
    stage.insert(new Q.Gold({ x: 3436, y: 976 }));
    
    stage.add("viewport").follow(player);

    if(window.innerWidth < 1000)
        stage.viewport.scale = 0.8;
    else
        stage.viewport.scale = 1.8;
    st = stage;

});


Q.Sprite.extend("Player", {
    init: function(p) {
        this._super(p,
                {x: 50,
                    y: 50,
                    sprite: "player",
                    sheet: "player",
                    speed: 150,
                    angle: 0,
                    direction: "right",
                    jumpSpeed: -440
                });
        this.add('2d,animation, platformerControls');
        this.on("hit.sprite", this, "hit");
        this.on("bump.left,bump.right, bump.top", this, "enemyhit");
        this.on("bump.bottom", this, "kill");
        Q.input.on("up",this,"jump");
    },
    
    jump: function() {
        if(localStorage.sfx === "1")
            Q.audio.play('jump.mp3');
    },
    step: function(dt) {
        p = this.p;
        
        if(p.vx > 0) {
          if(p.landed > 0) {
            this.play("run_r");
          } else {
            this.play("jump_r");
          }
          p.direction = "right";
        } else if(p.vx < 0) {
          if(p.landed > 0) {
            this.play("run_l");
          } else {
            this.play("jump_l");
          }
          this.p.direction = "left";
        } else {
          this.play("stand_" + this.p.direction);
        }
        
        if(p.y > 1150) {
            st.unfollow(player);
        }

        if(p.y > 1500) {
            if(localStorage.sfx === "1")
                Q.audio.play('death.mp3');
            healt -= 1;
            Q.clearStages();
            Q.audio.stop("ingame.mp3");
            if(healt > 0)
                Q.stageScene('transition');
            else if(healt === 0)
                Q.stageScene("endGame");
        }
        if(p.x > 4062 && (level === 1)){
            if(localStorage.sfx === "1")
                Q.audio.play('end.mp3');
            level = 2;
            Q.stageScene('transition');
        }
        
        if(p.x > 4334 && (level === 2) && p.y > 911){
            level = 3;
            if(localStorage.sfx === "1")
                Q.audio.play('end.mp3');
            Q.clearStages();
            Q.stageScene('transition');
        }
        if(p.x > 4934 && (level === 3)){
            level = 4;
            if(localStorage.sfx === "1")
                Q.audio.play('end.mp3');
            Q.clearStages();
            Q.stageScene('transition');
        }
    },
    hit: function(collision) {
        if (collision.obj.isA("Gold")) {
            collision.obj.destroy();
            if(localStorage.sfx === "1")
                Q.audio.play("coin.mp3");
            score += 100;
            gold += 1;
            if(gold % 20 === 0)
                healt += 1;
            var coinsLabel = Q("UI.Text", 1).items[0];
            coinsLabel.p.label = "💰 x " + score + "  " + "❤️ x " + healt;
        }
        if (collision.obj.isA("Spike")) {
            healt -= 1;
            Q.clearStages();
            if(healt > 0){
                Q.audio.stop("ingame.mp3");
                Q.stageScene('transition');
            }else if(healt === 0)
                Q.stageScene('endGame');
            if(localStorage.sfx === "1")
                Q.audio.play('death.mp3');
            
        }
    },
    enemyhit: function(collision) {
        if(collision.obj.isA("Enemy")) {
            if(localStorage.sfx === "1")
                Q.audio.play('death.mp3');
            healt -= 1;
            Q.clearStages();
            if(healt > 0){
                Q.audio.stop("ingame.mp3");
                Q.stageScene('transition');
            }else if(healt === 0)
                Q.stageScene('endGame');
        };
        if(collision.obj.isA("Boss")) {
            healt -= 1;
            if(localStorage.sfx === "1")
                Q.audio.play('death.mp3');
            Q.clearStages();
            if(healt > 0){
                Q.audio.stop("ingame.mp3");
                Q.stageScene('transition');
            }else if(healt === 0)
                Q.stageScene('endGame');
        };
    },
    kill: function(collision) {
        if(collision.obj.isA("Enemy")) {
            if(localStorage.sfx === "1")
                Q.audio.play('jump.mp3');
            score += 50;
            var coinsLabel = Q("UI.Text", 1).items[0];
            coinsLabel.p.label = "💰 x " + score + "  " + "❤️ x " + healt;
            p.vy = -300;
            collision.obj.del('2d, aiBounce');
            collision.obj.destroy();
        };
        if(collision.obj.isA("Boss")) {
            if(localStorage.sfx === "1")
                Q.audio.play('jump.mp3');
            boss_healt -= 1;
            if(collision.normalX === 1){
                p.vy = -500;
                p.vx = -300;
            }else{
                p.vy = -300;
                p.vx = 300;
            }
            if(boss_healt === 0){
                score += 10000;
                collision.obj.del('2d, aiBounce');
                collision.obj.destroy();
                Q.clearStages();
                Q.stageScene('endGame');
                
            }
        };
    }
            


});
Q.Sprite.extend("Enemy",{
    init: function(p) {
        this._super(p, { sheet: 'enemy', vx: 50, sprite: "enemy" });
        this.add('2d,animation, aiBounce');
        var first = 0;
        if(first === 0 ) {
            this.play('run_r');
            first = 1;
        };
    },
    step: function(dt) {
        this.on("bump.left",function(collision) {
            this.play('run_r');
        });
        this.on("bump.right",function(collision) {
            this.play('run_l');
        });

  }
    
    
});
Q.Sprite.extend("Boss",{
    init: function(p) {
        this._super(p, { sheet: 'boss', vx: 50, sprite: "boss" });
   
        this.add('2d,animation, aiBounce');
        var first = 0;
        if(first === 0 ) {
            this.play('run_r');
            first = 1;
        };
    },
    step: function(dt) {
        this.on("bump.left",function(collision) {
            this.play('run_r');
        });
        this.on("bump.right",function(collision) {
            this.play('run_l');
        });
    }
    
    
});
Q.Sprite.extend("Spike",{
    init: function(p) {
        this._super(p, { sheet: 'spike', vx: 50, sprite: "spike" });
        this.add('2d,animation, aiBounce');
    }
    
    
});
Q.Sprite.extend("Gold",{
    init: function(p) {
        this._super(p, { sheet: 'gold', vx: 0, sensor: true, sprite: "gold" });
        this.add('animation');
        this.play('flip');
    } 
});

Q.animations('player', {
    run_r: {frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1/8},
    run_l: {frames: [8, 9, 10, 11, 12, 13, 14, 15], rate: 1/8},
    stand_right: {frames: [0], rate: 0},
    stand_left: {frames: [15], rate: 0},
    jump_r: {frames: [16, 17, 18, 19], rate: 1/2},
    jump_l: {frames: [23, 22, 21, 20], rate: 1/2}

});
Q.animations('enemy', {
    run_r: {frames: [0, 1, 2], rate: 1/3},
    run_l: {frames: [5, 4, 3], rate: 1/3}
});
Q.animations('gold', {
    flip: {frames: [0, 1, 2,3,4,5,6,7,8], rate: 1/4}
});
Q.animations('boss', {
    run_r: {frames: [6, 7, 8, 9], rate: 1/4},
    run_l: {frames: [3, 2, 1, 0], rate: 1/4}
});