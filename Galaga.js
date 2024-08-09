//variable storage
const player = "p";
const background = "o";
const alien = "a";
const bullet = "b";
let loop = "loop"
let difficulty = 900
let score = 0
let canShoot = true
let lives = 3
let canMove = true

setLegend(
  [player, bitmap`
................
................
................
.......332......
.......332......
.......332222...
....333333332...
....3663366322..
...33663366332..
...33333333332..
...33333333332..
...33......332..
...33......332..
................
................
................`],
  [background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ alien, bitmap`
................
.........2......
..7...77772..72.
..7..777777..72.
..7777777777772.
..7777777777772.
....77777777....
.7..77777777..72
.7..77777777..72
.777733773377772
.777733773377772
....777777772...
.....7777772....
......77772.....
................
................`],
  [ bullet, bitmap`
................
................
................
................
................
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
................
................
................
................
................`],
)

setBackground(background)

setSolids([])

let level = 0
const levels = [
  map`
...........
.a.a.a.a.a.
..a.a.a.a..
...........
...........
...........
...........
...........
...........
...........
.....p.....`
]

setMap(levels[level])

//player input
if (canMove) {
  onInput("w", () => getFirst(player).y -= 1);
  onInput("s", () => getFirst(player).y += 1);
  onInput("a", () => getFirst(player).x -= 1);
  onInput("d", () => getFirst(player).x += 1);
  onInput("i", () => shootBullet());
}

//constant loop storage

setInterval(bulletMove, 150)
setInterval(bulletHit, 1)
if (canMove) {
  setInterval(moveAlien, difficulty)
}

//function storage
function randomNum() {
  const number = Math.floor(Math.random() * 3) + 1;
  return number
}

function moveAlien() {
  getAll(alien).forEach(alien => {
    const move = randomNum();
    if (move == 1) {
      alien.x += 1;
    } else if (move == 2) {
      alien.x -= 1;
    } else {
      alien.y += 1;
    }
  });
}

function shootBullet() {
  if (canShoot) {
    let playerPos = getFirst(player)
    addSprite(playerPos.x, playerPos.y - 1, bullet)
    canShoot = false
    setTimeout(() => {
      canShoot = true
    }, 450);
  }
}

function bulletMove() {
  getAll(bullet).forEach(bullet => {
    bullet.y -= 1
    if (bullet.y == 0) {
      bullet.remove()
    }
  });
}

function bulletHit() {
  getAll(bullet).forEach(bullet => {
    getAll(alien).forEach(alien => {
      if (alien.x == bullet.x && alien.y == bullet.y) {
        alien.remove()
        bullet.remove()
        score += 100
      }
    });
  });
}

function playerHit() {
  getAll(alien).forEach(alien => {
    getFirst(player)
    if (player.y == alien.y && player.x == alien.x) {
      player.remove()
      alien.remove()
      canMove = false
      addSprite(6, 11, player)
      spawnEnemies()
      setTimeout(() => {
        canMove = true
      }, 1500);
    }
  });
}
                        
        


setPushables({
  [ player ]: []
})

afterInput(() => {
  
})
