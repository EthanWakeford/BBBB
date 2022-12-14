console.log('loaded js file');

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game_container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;
let platforms;
let cursors;
const game = new Phaser.Game(config);

function preload () {
  this.load.image('background', '../static/image_dump/spongebob_background.jpg');
  this.load.image('road', '../static/image_dump/spongebob_road.png');
  this.load.spritesheet('bubbleBass',
    '../static/image_dump/angry_bass_face.jpg',
    { frameWidth: 40, frameHeight: 60 }
  );
  // Preload Function
}
function create () {
  this.add.image(400, 300, 'background').setScale(2);
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'road').setScale(2).refreshBody();
  player = this.physics.add.sprite(200, 400, 'bubbleBass');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);
  player.setMaxVelocity(200, 600)
  player.setDragX(200)
  //player.useDamping(true)
  
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('bubbleBass', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'bubbleBass', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('bubbleBass', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, platforms);
  // Create Function
}

function update () {
  if (cursors.left.isDown) {
    player.setAccelerationX(-200);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setAccelerationX(200);
    player.anims.play('right', true);
  } else {
    player.setAccelerationX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-500);
  }
  // Update Function
}
