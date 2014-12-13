'use strict';

enchant();

var CHARA_IMAGE = "./chara2.gif";
var game = new Game();

var Timer = Class.create(Label,{
    initialize:function(timelimit){
        Label.call(this);
        this.text = "TIME";
        this.size = 18;
        this.font = this.size + "px bold serif";
        this.timer = 0;
        this.timelimit = timelimit;
        game.currentScene.addChild(this);

    },
        countUp:function() {
            if(game.frame % game.fps === 0) {
                this.timer++;
            }
        },
    display:function() {
        this.text = "TIME:" + this.timer;
    },
    update:function() {
        this.countUp();
        this.display();
    },
    isLimitTime:function() {
        return (this.timer > this.timelimit)
    },
    onenterframe:function() {
        this.update();
        if(this.isLimitTime()){
            game.end();
        }
    }
});

var Boar = Class.create(Sprite,{
  initialize:function(){
    Sprite.call(this,32,32);
    this.x= random (game.width -this.width);
    this.y= random (game.height - this.height);
    this.image = game.assets[CHARA_IMAGE]; //画像をセット
    game.currentScene.addChild(this);

    function random (num){
     return ~~(Math.random() * num);
    }
  },

  remove:function(){
    this.parentNode.removeChild(this);

  },
  hits:function(){
    game.hits++;
  },
  
  ontouchstart:function(){
    this.hits();
    this.remove();
  }

});

var Boars = Class.create({
  initialize:function(){
    this.max = 20 -1;
    this.boars = [];
    this.createBoars();
    
  },
  createBoars:function() {
    var random = ~~(this.max + 1);
    for (var i = 0; i < random; i++) {
      this.boars.push(new Boar);
    };
  }
});

window.onload = function() {
  
  game.preload(CHARA_IMAGE);  //画像を読み込み	
  game.hits = 0;
  game.fps = 30;
  game.frame = 0;

  var scene = game.rootScene;
  scene.backgroundColor = "white" //背景色

  game.onload = function() {
  var boars = new Boars();
  new Timer();

  scene.addEventListener('enterframe',function(){
    
    if (isEnd()){
      game.end();
    }

    function isEnd(){
      return (game.hits === boars.boars.length);
      
    }
  });


  };

  game.start();

};


