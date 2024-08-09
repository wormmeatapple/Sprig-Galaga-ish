/*
Written by wormmeatapple
Inspired by arcade game Galaga
Ai was used for syntax, errors in code, and clarification, but no ai written code was used
Shoutout to the game Exodus and Half-fry for having some code that inspired my own (collision detection, life system)
Thank you to Hack Club for creating Sprig!

W A S D to move
I to shoot
*/

//variable storage
const player = "p"
const background = "o"
const alien = "a"
const bullet = "b"
const x = "x"
const playerfake = "f"
const blue = "l"
let loop = "loop"
let difficulty = 900
let score = 0
let canShoot = true
let lives = 3
let canMove = true
let maxLife = 10

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
  [alien, bitmap`
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
  [bullet, bitmap`
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
  [x, bitmap `
................
.33..........33.
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
.333........333.
.33..........33.
................`],
  [playerfake, bitmap `................
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
  [blue, bitmap `
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
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
displayLives()

//player input
// shortened this cause otherwise it looks way too big for just one line of stuff
onInput("w", () => { if (canMove) { getFirst(player).y -= 1; } });
onInput("s", () => { if (canMove) { getFirst(player).y += 1; } });
onInput("a", () => { if (canMove) { getFirst(player).x -= 1; } });
onInput("d", () => { if (canMove) { getFirst(player).x += 1; } });
onInput("i", () => { if (canMove) { shootBullet() } });



//constant loop storage

setInterval(bulletMove, 150)
setInterval(bulletHit, 30)
setInterval(playerHit, 30)
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
        displayScore()
      }
    });
  });
}

function playerHit() {
  let playerPos = getFirst(player)
  getAll(alien).forEach(alienPos => {
    if (playerPos.y == alienPos.y && playerPos.x == alienPos.x) {
      playerPos.remove()
      flashBack()
      canMove = false
      addSprite(5, 10, player)
      clearTile(maxLife, 0)
      addSprite(maxLife, 0, x)
      maxLife -= 1
      spawnEnemies()
      setTimeout(() => {
        canMove = true
      }, 1500);
    }
  });
}

function spawnEnemies() {

}

function displayLives() {
  maxLife = 10
  clearTile(8, 0)
  clearTile(9, 0)
  clearTile(10, 0)
  addSprite(8, 0, playerfake)
  addSprite(9, 0, playerfake)
  addSprite(10, 0, playerfake)
  addText("Lives", {
    x: 8,
    y: 0,
    color: color`3`
  })
}

function displayScore() {
  addText(String(score), {
    x: 0,
    y: 0,
    color: color`2`
  })
}

function flashBack() {
  setTimeout(() => {
    setBackground(blue)
  }, 50);
  setTimeout(() => {
    setBackground(background)
  }, 100);
  setTimeout(() => {
    setBackground(blue)
  }, 150);
  setTimeout(() => {
    setBackground(background)
  }, 200);
  setTimeout(() => {
    setBackground(blue)
  }, 250);
  setTimeout(() => {
    setBackground(background)
  }, 300);
}



setPushables({
  [player]: []
})

afterInput(() => {

})
