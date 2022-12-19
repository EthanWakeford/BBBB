class gameOver extends Phaser.Scene {
  preload() {
    console.log('in preload')
    this.load.image('game_over', '../static/image_dump/game_over.png');
  }
  create() {
    console.log('in the create')
    this.add.image(500, 400, 'game_over')
  }
}


let player;
let dirty;
let platforms;
let box;
let bouncy;
let bouncy2;
let column;
let volcano;
let pickle;
let movingPlatform;
let keyA;
let keyD;
let keyW;
let keySpace;
let keyR;
let rotated;
let game;

class gameScene extends Phaser.Scene {

  preload () {
    this.load.image('background', '../static/image_dump/JellyfishFields_V5.png');
    this.load.image('bubbles_platform', '../static/image_dump/bubbles_jump_flat.png');
    this.load.image('bubble_column', '../static/image_dump/bubble_column.png');
    this.load.image('volcano', '../static/image_dump/spongebob_volcano.png')
    this.load.image('road', '../static/image_dump/spongebob_road_2x.png');
    this.load.image('moving', '../static/image_dump/BubbleBassSpriteMap_V2.png');
    this.load.image('box', '../static/image_dump/box.png');
    this.load.image('greenBox', '../static/image_dump/Green_full.png');
    this.load.image('bigBubble', '../static/image_dump/big_bubble.png')
    this.load.spritesheet('dirtyBubble',
      '../static/image_dump/DirtyBubble.png',
      { frameWidth: 300, frameHeight: 300 }
      );
    this.load.spritesheet('bubbleBass',
      '../static/image_dump/BubbleBassSpriteMap_V2.png',
      { frameWidth: 210, frameHeight: 226 }
    );
    // Preload Function
  }
  create () {
    // keyboard controls setup
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // background creation
    // background = this.add.tileSprite(width/2, height/2, width, height, 'background');
    const { width, height } = this.sys.game.canvas;
    this.add.image(width, height * 0.45, 'background').setScale(0.75);

    // static platforms
    platforms = this.physics.add.staticGroup();
    //platforms.create(width, 885, 'road').setScale(1.2).refreshBody();
    platforms.create(0, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(100, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(200, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(300, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(400, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(500, 750, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(600, 750, 'bubbles_platform').setScale(1).refreshBody();

    platforms.create(900, 550, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1000, 550, 'bubbles_platform').setScale(1).refreshBody();
    //platforms.create(1100, 550, 'bubbles_platform').setScale(1).refreshBody();
    //platforms.create(1200, 550, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1400, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1500, 800, 'bubbles_platform').setScale(1).refreshBody();

    platforms.create(1600, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1700, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1800, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(1900, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(2000, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(2100, 800, 'bubbles_platform').setScale(1).refreshBody();
    platforms.create(2200, 800, 'bubbles_platform').setScale(1).refreshBody();

    volcano = this.physics.add.staticGroup();
    volcano.create(2200,800, 'volcano');
    column = this.add.tileSprite(2200, 350, 400, 800, 'bubble_column');

    rotated = platforms.create(1800, 400, 'bubbles_platform');
    rotated.setAngle(90);
    platforms.create(400, 200, 'bubbles_platform');
    platforms.create(300, 200, 'bubbles_platform');
    platforms.create(200, 200, 'bubbles_platform');
    platforms.create(100, 200, 'bubbles_platform');

    // bouncing object
    bouncy = this.physics.add.staticGroup();
    bouncy.create(700, 750, 'bigBubble').setScale(0.5).refreshBody();
    bouncy2 = this.physics.add.staticGroup();
    bouncy2.create(50, 120, 'bigBubble').setScale(0.5).refreshBody();

    //bouncy.create(950, 400, 'bubbles_platform').setScale(1).refreshBody();

    // the pickle
    pickle = this.physics.add.image(2800, 800, 'greenBox').setScale(0.05);
    pickle.body.setAllowGravity(false);

    // moving platforms
    movingPlatform = this.physics.add.image(1900, 900, 'moving').setScale(0.1).refreshBody();
    movingPlatform.setImmovable(true).setVelocity(100, -100).setMass(100000);
    movingPlatform.body.setAllowGravity(false);
    this.tweens.timeline({
      targets: movingPlatform.body.velocity,
      loop: -1,
      tweens: [
        { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
        { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
        { x: 150, y: 100, duration: 4000, ease: 'Stepped' },
        { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
        { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
        { x: -150, y: 100, duration: 4000, ease: 'Stepped' }
      ]
    });

    // movable box
    //box = this.physics.add.image(300, 500, 'box').setScale(0.1).refreshBody();
    //box.setMass(100).setBounce(0).setDragX(200).setCollideWorldBounds(true);

    // dirty bubble
    dirty = this.physics.add.sprite(9800, 800, 'dirtyBubble').setScale(0.5).refreshBody();
    dirty.body.setAllowGravity(false).setCollideWorldBounds(true);

    // player object
    player = this.physics.add.sprite(200, 680, 'bubbleBass').setScale(0.35).refreshBody();
    player.setBounce(0.1).setCollideWorldBounds(true).setDragX(200);
    player.setMaxVelocity(200, 1500).setMass(1);
    player.custom = {};
    player.custom.falling = { falling: false, height: 0, fallHeight: 0 };
    player.custom.direction = 'right';

    // physics set ups
    this.physics.add.collider(player, bouncy, function () {
      if (player.body.onFloor()) {
        player.setVelocityY((player.y - player.custom.falling.height) * -80);
        // player.setVelocityY(player.body.velocity.y * -1.5);
      }
    });
      
    this.physics.add.collider(player, bouncy2, function () {
      if (player.body.touching.left) {
        player.setMaxVelocity(2000, 1500);
        player.setVelocityX(2000);
      }
    });

    this.physics.add.collider(player, rotated, function() {
      if (player.body.touching.right) {
        player.setMaxVelocity(200,1500);
      }
    })
    this.physics.add.overlap(player, column, function() {
      console.log('collision with volcano')
      console.log(player.body.velocity.y)
      player.setVelocityY(-200);

      for (let i = 0; i < 1000; i++) {
        player.setVelocityY(20);
      }
    })
    this.physics.add.collider(player, platforms);
    // this.physics.add.collider(player, box);
    // this.physics.add.collider(box, bouncy);
    // this.physics.add.collider(platforms, box);
    this.physics.add.collider(player, movingPlatform);
    this.physics.add.collider(player, dirty);
    this.physics.add.overlap(player, pickle, win, null, this);

    // world and camera building
    this.add.text(100, 400, 'WASD AND SPACE TO MOVE', { font: '35px bold', fill: '#ffffff' }).setShadow(1.5, 1.5);
    this.physics.world.setBounds(0, 0, width * 3, height * 1.5);
    this.cameras.main.setBounds(0, 0, width * 3, height * 1.5);
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setDeadzone(200);

    // animations creation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('bubbleBass', { start: 8, end: 0 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'left-slow',
      frames: this.anims.generateFrameNumbers('bubbleBass', { start: 8, end: 0 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'standRight',
      frames: [{ key: 'bubbleBass', frame: 9 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'standLeft',
      frames: [{ key: 'bubbleBass', frame: 8 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('bubbleBass', { start: 9, end: 17 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'right-slow',
      frames: this.anims.generateFrameNumbers('bubbleBass', { start: 9, end: 17 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: 'dirtyBubbleLeft',
      frames: [{key: 'dirtyBubble', frame: 0}],
      frameRate: 20
    });
    this.anims.create({
      key: 'dirtyBubbleRight',
      frames: [{key: 'dirtyBubble', frame: 1}],
      frameRate: 20
    });
    // Create Function
  }

  update () {
    if (keyA.isDown) {
      player.setAccelerationX(-160);
      player.custom.direction = 'left';
      if (player.body.velocity.x > 0) {
        player.anims.play('right-slow', true);
      } else if (player.body.velocity.x >= -100) {
        player.anims.play('left-slow', true);
      } else {
        player.anims.play('left', true);
      }
    } else if (keyD.isDown) {
      player.setAccelerationX(160);
      player.custom.direction = 'right';
      if (player.body.velocity.x < 0) {
        player.anims.play('left-slow', true);
      } else if (player.body.velocity.x <= 100) {
        player.anims.play('right-slow', true);
      } else {
        player.anims.play('right', true);
      }
    } else {
      player.setAccelerationX(0);
      if (player.body.velocity.x < 0) {
        player.anims.play('left-slow', true);
      } else if (player.body.velocity.x > 0) {
        player.anims.play('right-slow', true);
      } else {
        if (player.custom.direction === 'left') {
          player.anims.play('standLeft');
        } else {
          player.anims.play('standRight');
        }
      }
    }

    if ((keySpace.isDown || keyW.isDown) && player.body.touching.down) {
      player.setVelocityY(-700);
    }

    if (player.body.velocity.y > 0) {
      player.custom.falling.falling = true;
      player.custom.falling.height = player.y;
    }
    if (player.body.onFloor() && player.custom.falling.falling) {
      player.custom.falling.fallHeight = player.y - player.custom.falling.height;
      if (player.custom.falling.fallHeight > 10) {
        this.cameras.main.shake(player.custom.falling.fallHeight * 10, (player.custom.falling.fallHeight - 10) / 500);
      }
      player.custom.falling.falling = false;
    }

    column.tilePositionY += 1;
    if (dirty.body.velocity.x < 0) {
      dirty.anims.play('dirtyBubbleLeft');
    }
    if (dirty.body.velocity.x >= 0) {
      dirty.anims.play('dirtyBubbleRight');
    }
    if (dirty.body.x - player.body.x >= -150 && dirty.body.x - player.body.x <= 74) {
      // do nohing
    } else if (dirty.body.x - player.body.x > 150) {
      dirty.setVelocityX(-25);
    } else if (dirty.body.x - player.body.x < 74) {
      dirty.setVelocityX(25);
    }

    if (player.body.y >= 800) {
      console.log('you lost!');
      this.scene.start(gameOver);
    }

    if (keyR.isDown) {
      this.scene.restart();
    }
    // Update Function
  }
}
// game over function

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  parent: 'game_container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1300 },
      debug: false
    }
  },
  scene: gameScene
};

game = new Phaser.Game(config);
function win (player, pickle) {
  this.add.text(2300, 400, 'YOU WINNNN!!! YOU GOT THE PICKLE!!!', { font: '35px bold', fill: '#ffffff' }).setShadow(1.5, 1.5);
  this.cameras.main.shake(100000);
}

// object definitions
