var Boat = (function () {
    function Boat() {
        this.projectiles = [];
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.rotation = 0;
        this.div = document.createElement("boat");
        document.body.appendChild(this.div);
        this.cannon = new Cannon(this, -125, -150);
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight / 2;
        this.upKey = 87;
        this.downKey = 83;
        this.leftKey = 65;
        this.rightKey = 68;
        this.rotateLeftKey = 37;
        this.rotateRightKey = 39;
        this.spaceKey = 32;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Boat.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                this.upSpeed = 5;
                break;
            case this.downKey:
                this.downSpeed = 5;
                break;
            case this.leftKey:
                this.leftSpeed = 5;
                break;
            case this.rightKey:
                this.rightSpeed = 5;
                break;
            case this.spaceKey:
                if (this.projectiles.length < 8) {
                    this.shoot();
                    this.getProjectiles();
                }
                break;
        }
    };
    Boat.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                this.upSpeed = 0;
                break;
            case this.downKey:
                this.downSpeed = 0;
                break;
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
        }
    };
    Boat.prototype.move = function () {
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Boat.prototype.shoot = function () {
        var projectile1 = new Projectile(this.posX + 20, this.posY);
        this.projectiles.push(projectile1);
        console.log("made a projectile");
        this.getProjectiles();
    };
    Boat.prototype.getProjectiles = function () {
        return this.projectiles;
    };
    Boat.prototype.removeProjectile = function (index) {
        this.projectiles.splice(index, 1);
    };
    Boat.prototype.removeProjectiles = function () {
        for (var o = 0; o < this.projectiles.length; o++) {
            this.projectiles.splice(o, 1);
            this.p = document.getElementsByTagName("projectile")[o];
            document.body.removeChild(this.p);
        }
    };
    Boat.prototype.getX = function () {
        return this.posX;
    };
    Boat.prototype.getY = function () {
        return this.posY;
    };
    return Boat;
}());
var Boss = (function () {
    function Boss(posX, posY, wave, boat) {
        this.Bosses = new Array();
        this.r = 0;
        this.div = document.createElement("Boss");
        this.container = document.body.getElementsByTagName("bosses")[0];
        this.container.appendChild(this.div);
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        this.speedX = Math.ceil(Math.random() * (3 + wave));
        this.speedY = Math.ceil(Math.random() * (3 + wave));
        this.reward = (300 * this.speedX + 300 * this.speedY) / 2;
        this.wave = wave;
        this.move();
        this.boat = boat;
    }
    Boss.prototype.checkBoat = function (boat, player) {
        this.player = player;
        if (this.posX + 128 >= boat.getX() && this.posX <= boat.getX() + 230 && this.posY + 93 >= boat.getY() && this.posY <= boat.getY() + 141) {
            if (this.posX + 128 >= boat.getX() || this.posX <= boat.getX() + 141) {
                this.speedX *= -1;
            }
            if (this.posY + 93 >= boat.getY() || this.posY <= boat.getY() + 141) {
                this.speedY *= -1;
            }
            this.player.looseLife();
        }
    };
    Boss.prototype.checkProjectile = function (projectile, index, j, enemy) {
        this.container = document.body.getElementsByTagName("bosses")[0];
        if (this.posX + 300 >= projectile.getX() && this.posX <= projectile.getX() + 128 && this.posY + 200 >= projectile.getY() && this.posY <= projectile.getY() + 93) {
            this.boat.projectiles.splice(index, 1);
            document.body.removeChild(projectile.div);
            this.r = this.r + 1;
            if (this.r == 3 + this.wave) {
                enemy.Bosses[j] = null;
                enemy.Bosses.splice(j, 1);
                this.container.removeChild(this.div);
                this.player.scoreUpdate(this.reward);
            }
        }
    };
    Boss.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        if (this.posX + 313 > window.innerWidth || this.posX < 0) {
            this.speedX *= -1;
        }
        if (this.posY + 200 > window.innerHeight || this.posY < 0) {
            this.speedY *= -1;
        }
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Boss.prototype.getX = function () {
        return this.posX;
    };
    Boss.prototype.getY = function () {
        return this.posY;
    };
    return Boss;
}());
var Cannon = (function () {
    function Cannon(b, x, y) {
        this.rotation = 0;
        this.rotationTick = 0;
        this.boat = b;
        this.div = document.createElement("cannon");
        this.boat.div.appendChild(this.div);
        this.rotateLeftKey = 37;
        this.rotateRightKey = 39;
        this.x = x;
        this.y = y;
        this.update();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Cannon.prototype.onKeyDown = function (event) {
        if (this.rotationTick == 12) {
            this.rotationTick = 0;
        }
        if (this.rotationTick == -1) {
            this.rotationTick = 11;
        }
        switch (event.keyCode) {
            case this.rotateLeftKey:
                this.rotationTick = this.rotationTick - 1;
                this.rotation = this.rotation - 30;
                this.update();
                break;
            case this.rotateRightKey:
                this.rotationTick = this.rotationTick + 1;
                this.rotation = this.rotation + 30;
                this.update();
                break;
        }
    };
    Cannon.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.rotateLeftKey:
                this.update();
                break;
            case this.rotateRightKey:
                this.update();
                break;
        }
    };
    Cannon.prototype.update = function () {
        this.draw();
    };
    Cannon.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
    };
    return Cannon;
}());
var Enemy = (function () {
    function Enemy(boat) {
        this.Soup = new Array();
        this.Bosses = new Array();
        this.projectiles = new Array();
        this.wave = 0;
        this.i = 0;
        this.b = 0;
        this.projectiles = boat.getProjectiles();
        this.waveSetUp(this.wave, boat);
        this.boat = boat;
        console.log(this.wave);
    }
    Enemy.prototype.waveStart = function (plastic, boss, boat) {
        this.plastic2 = plastic;
        this.boss2 = boss;
        this.checkplasticSoupSpawn(plastic, boat);
        this.checkBossSpawner(boss, boat);
    };
    Enemy.prototype.waveCheck = function () {
        var p = document.getElementsByTagName("plastic");
        var b = document.getElementsByTagName("boss");
        if (this.i == this.plastic2 && this.b == this.boss2 && p.length == 0) {
            console.log("dit");
            this.waveEnd(this.boat);
        }
    };
    Enemy.prototype.checkplasticSoupSpawn = function (plastic, boat) {
        this.posX = Math.ceil(Math.random() * (innerWidth - 128));
        this.posY = Math.ceil(Math.random() * (innerHeight - 93));
        if (this.posX + 128 >= boat.getX() - 230 && this.posX <= boat.getX() + 460 && this.posY + 93 >= boat.getY() - 141 && this.posY <= boat.getY() + 282) {
            this.checkplasticSoupSpawn(plastic, boat);
        }
        else {
            console.log(this.i);
            if (this.i > 0) {
                this.checkplastic(plastic, boat);
            }
            else {
                this.plasticSoupSpawner(plastic, boat);
            }
        }
    };
    Enemy.prototype.checkplastic = function (plastic, boat) {
        for (var r = 1; r < this.Soup.length; r++) {
            var soup = this.Soup[r];
            if (this.posX + 135 >= soup.getX() && this.posX <= soup.getX() + 135 && this.posY + 100 >= soup.getY() && this.posY <= soup.getY() + 100) {
                this.checkplasticSoupSpawn(plastic, boat);
            }
            else {
                this.plasticSoupSpawner(plastic, boat);
            }
        }
    };
    Enemy.prototype.checkplastic2 = function (plastic, boat) {
        for (var r = 1; r < this.Soup.length; r++) {
            if (this.posX + 128 >= this.Soup[r].getX() - 230 && this.posX <= this.Soup[r].getX() + 460 && this.posY + 93 >= this.Soup[r].getY() - 141 && this.posY <= this.Soup[r].getX() + 282) {
                this.checkplastic(plastic, boat);
            }
            else {
                this.plasticSoupSpawner(plastic, boat);
            }
        }
    };
    Enemy.prototype.plasticSoupSpawner = function (plastic, boat) {
        var p = document.getElementsByTagName("plastic");
        if (this.i < plastic) {
            this.i = this.i + 1;
            this.plastic = new Plastic(this.posX, this.posY, this.wave);
            this.Soup[this.i] = this.plastic;
            this.checkplasticSoupSpawn(plastic, boat);
        }
    };
    Enemy.prototype.waveEnd = function (boat) {
        this.i = 0;
        this.b = 0;
        console.log("id");
        this.waveCounter(boat);
    };
    Enemy.prototype.waveCounter = function (boat) {
        console.log("goed");
        this.wave = this.wave + 1;
        this.waveSetUp(this.wave, boat);
    };
    Enemy.prototype.waveSetUp = function (wave, boat) {
        if (this.wave == 0) {
            this.waveStart(1, 1, boat);
        }
        else if (this.wave == 1) {
            this.waveStart(6, 0, boat);
        }
        else if (this.wave == 2) {
            this.waveStart(7, 0, boat);
        }
        else if (this.wave == 3) {
            this.waveStart(8, 0, boat);
        }
        else if (this.wave == 4) {
            this.waveStart(5, 1, boat);
        }
        else if (this.wave == 5) {
            this.waveStart(10, 0, boat);
        }
        else if (this.wave == 6) {
            this.waveStart(11, 0, boat);
        }
        else if (this.wave == 7) {
            this.waveStart(12, 0, boat);
        }
        else if (this.wave == 8) {
            this.waveStart(13, 0, boat);
        }
        else if (this.wave == 9) {
            this.waveStart(14, 0, boat);
        }
        else if (this.wave == 10) {
            this.waveStart(10, 1, boat);
        }
        else if (this.wave == 11) {
            this.waveStart(15, 0, boat);
        }
        else if (this.wave == 12) {
            this.waveStart(16, 0, boat);
        }
        else if (this.wave == 13) {
            this.waveStart(17, 0, boat);
        }
        else if (this.wave == 14) {
            this.waveStart(18, 0, boat);
        }
        else if (this.wave == 15) {
            this.waveStart(19, 0, boat);
        }
        else if (this.wave == 16) {
            this.waveStart(15, 1, boat);
        }
        else if (this.wave == 17) {
            this.waveStart(20, 0, boat);
        }
        else if (this.wave == 18) {
            this.waveStart(21, 0, boat);
        }
        else if (this.wave == 19) {
            this.waveStart(22, 0, boat);
        }
        else if (this.wave == 20) {
            this.waveStart(23, 0, boat);
        }
        else if (this.wave == 21) {
            this.waveStart(24, 0, boat);
        }
        else if (this.wave == 22) {
            this.waveStart(5, 2, boat);
        }
        else if (this.wave == 23) {
            this.waveStart(25, 0, boat);
        }
        else if (this.wave == 24) {
            this.waveStart(26, 0, boat);
        }
        else if (this.wave == 25) {
            this.waveStart(27, 0, boat);
        }
        else if (this.wave == 26) {
            this.waveStart(28, 0, boat);
        }
        else if (this.wave == 27) {
            this.waveStart(29, 0, boat);
        }
        else if (this.wave == 28) {
            this.waveStart(10, 2, boat);
        }
        else if (this.wave == 29) {
            this.waveStart(30, 0, boat);
        }
        else if (this.wave == 30) {
            this.waveStart(31, 0, boat);
        }
        else if (this.wave == 31) {
            this.waveStart(32, 0, boat);
        }
        else if (this.wave == 32) {
            this.waveStart(33, 0, boat);
        }
        else if (this.wave == 33) {
            this.waveStart(34, 0, boat);
        }
        else if (this.wave == 34) {
            this.waveStart(35, 0, boat);
        }
        else if (this.wave == 35) {
            this.waveStart(10, 3, boat);
        }
        else if (this.wave == 36) {
            this.waveStart(36, 0, boat);
        }
        else if (this.wave == 37) {
            this.waveStart(37, 0, boat);
        }
        else if (this.wave == 38) {
            this.waveStart(38, 0, boat);
        }
        else if (this.wave == 39) {
            this.waveStart(39, 0, boat);
        }
        else if (this.wave == 40) {
            this.waveStart(40, 0, boat);
        }
        else if (this.wave == 41) {
            this.waveStart(20, 1, boat);
        }
        else if (this.wave == 42) {
            this.waveStart(21, 1, boat);
        }
        else if (this.wave == 43) {
            this.waveStart(22, 1, boat);
        }
        else if (this.wave == 44) {
            this.waveStart(23, 1, boat);
        }
        else if (this.wave == 45) {
            this.waveStart(24, 1, boat);
        }
        else if (this.wave == 46) {
            this.waveStart(25, 1, boat);
        }
        else if (this.wave == 47) {
            this.waveStart(26, 2, boat);
        }
        else if (this.wave == 48) {
            this.waveStart(27, 2, boat);
        }
        else if (this.wave == 49) {
            this.waveStart(28, 2, boat);
        }
        else if (this.wave == 50) {
            this.waveStart(29, 2, boat);
        }
        else if (this.wave == 51) {
            this.waveStart(30, 2, boat);
        }
        else if (this.wave == 52) {
            this.waveStart(20, 3, boat);
        }
        else if (this.wave == 53) {
            this.waveStart(21, 3, boat);
        }
        else if (this.wave == 54) {
            this.waveStart(22, 3, boat);
        }
        else if (this.wave == 55) {
            this.waveStart(23, 3, boat);
        }
        else if (this.wave == 56) {
            this.waveStart(24, 3, boat);
        }
        else if (this.wave == 57) {
            this.waveStart(25, 3, boat);
        }
        else if (this.wave == 58) {
            this.waveStart(26, 4, boat);
        }
        else if (this.wave == 59) {
            this.waveStart(27, 4, boat);
        }
        else if (this.wave == 60) {
            this.waveStart(28, 4, boat);
        }
        else if (this.wave == 61) {
            this.waveStart(29, 4, boat);
        }
        else if (this.wave == 62) {
            this.waveStart(30, 4, boat);
        }
        else if (this.wave == 63) {
            this.waveStart(31, 5, boat);
        }
        else if (this.wave == 64) {
            this.waveStart(32, 5, boat);
        }
        else if (this.wave == 65) {
            this.waveStart(33, 5, boat);
        }
        else if (this.wave == 66) {
            this.waveStart(34, 5, boat);
        }
        else if (this.wave == 67) {
            this.waveStart(35, 5, boat);
        }
        else if (this.wave == 68) {
            this.waveStart(36, 6, boat);
        }
        else if (this.wave == 69) {
            this.waveStart(38, 6, boat);
        }
        else if (this.wave == 70) {
            this.waveStart(39, 6, boat);
        }
        else if (this.wave == 71) {
            this.waveStart(40, 6, boat);
        }
        else if (this.wave == 72) {
            this.waveStart(20, 7, boat);
        }
        else if (this.wave == 73) {
            this.waveStart(20, 7, boat);
        }
        else if (this.wave == 74) {
            this.waveStart(21, 7, boat);
        }
        else if (this.wave == 75) {
            this.waveStart(22, 7, boat);
        }
        else if (this.wave == 76) {
            this.waveStart(23, 8, boat);
        }
        else if (this.wave == 77) {
            this.waveStart(24, 9, boat);
        }
        else if (this.wave == 78) {
            this.waveStart(25, 10, boat);
        }
        else if (this.wave == 79) {
            this.waveStart(26, 11, boat);
        }
        else if (this.wave == 80) {
            this.waveStart(25, 25, boat);
        }
    };
    Enemy.prototype.checkBossSpawner = function (boss, boat) {
        this.posX = Math.ceil(Math.random() * (innerWidth - 230));
        this.posY = Math.ceil(Math.random() * (innerHeight - 313));
        if (this.posX + 128 >= boat.getX() - 230 && this.posX <= boat.getX() + 460 && this.posY + 93 >= boat.getY() - 141 && this.posY <= boat.getY() + 282) {
            this.checkBossSpawner(boss, boat);
        }
        else {
            this.bossSpawner(boss, boat);
        }
    };
    Enemy.prototype.bossSpawner = function (boss, boat) {
        var b = document.getElementsByTagName("boss");
        if (this.b < boss) {
            this.b = this.b + 1;
            this.boss = new Boss(this.posX, this.posY, this.wave, boat);
            this.Bosses[this.b] = this.boss;
            this.checkBossSpawner(boss, boat);
        }
    };
    return Enemy;
}());
var Game = (function () {
    function Game() {
        this.Soup = new Array();
        this.projectiles = new Array();
        this.player = new Player();
        this.enemy = new Enemy(this.player.boat1);
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.projectiles = this.player.boat1.getProjectiles();
        this.player.boat1.move();
        if (this.enemy.Soup.length > 2) {
            for (var a = 1; a < this.enemy.Soup.length; a++) {
                var soup = this.enemy.Soup[a];
                for (var b = 1; b < this.enemy.Soup.length; b++) {
                    var othersoup = this.enemy.Soup[b];
                    if (soup != othersoup) {
                        soup.checkPlastic(othersoup, this.player);
                    }
                }
            }
        }
        if (this.projectiles.length > 0) {
            for (var i = 0; i < this.projectiles.length; i++) {
                var projectile = this.projectiles[i];
                for (var j = 1; j < this.enemy.Soup.length; j++) {
                    var soup = this.enemy.Soup[j];
                    soup.checkProjectile(projectile, i, j, this.enemy);
                }
            }
        }
        if (this.projectiles.length > 0 && this.enemy.Soup.length > 0) {
            for (var index = 0; index < this.projectiles.length; index++) {
                var element = this.projectiles[index];
                element.boatCannonTick = this.player.boat1.cannon.rotationTick;
                element.move();
                element.remove(this.player.boat1, index);
            }
        }
        if (this.projectiles.length > 0 && this.enemy.Bosses.length > 0) {
            for (var h = 0; h < this.projectiles.length; h++) {
                var projectile = this.projectiles[h];
                for (var g = 1; g < this.enemy.Bosses.length; g++) {
                    var boss = this.enemy.Bosses[g];
                    boss.checkProjectile(projectile, h, g, this.enemy);
                }
            }
        }
        if (this.enemy.Soup.length > 1) {
            for (var z = 1; z < this.enemy.Soup.length; z++) {
                this.enemy.Soup[z].move();
                this.enemy.Soup[z].checkBoat(this.player.boat1, this.player);
            }
        }
        if (this.enemy.Bosses.length > 0) {
            for (var q = 1; q < this.enemy.Bosses.length; q++) {
                this.enemy.Bosses[q].move();
                this.enemy.Bosses[q].checkBoat(this.player.boat1, this.player);
            }
        }
        this.enemy.waveCheck();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    return Game;
}());
var Life = (function () {
    function Life() {
        this.container = document.getElementsByTagName("container")[0];
        for (var i = 0; i < 3; i++) {
            this.div = document.createElement("life");
            this.container.appendChild(this.div);
        }
    }
    return Life;
}());
window.addEventListener("load", function () {
    new Game();
});
var Plastic = (function () {
    function Plastic(posX, posY, wave) {
        this.projectiles = new Array();
        this.Soup = new Array();
        this.div = document.createElement("Plastic");
        this.container = document.body.getElementsByTagName("soup")[0];
        this.container.appendChild(this.div);
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        this.speedX = Math.ceil(Math.random() * (1 + wave));
        this.speedY = Math.ceil(Math.random() * (1 + wave));
        this.reward = (100 * this.speedX + 100 * this.speedY) / 2;
        this.move();
    }
    Plastic.prototype.checkBoat = function (boat, player) {
        this.player = player;
        if (this.posX + 128 >= boat.getX() && this.posX <= boat.getX() + 230 && this.posY + 93 >= boat.getY() && this.posY <= boat.getY() + 141) {
            if (this.posX + 128 >= boat.getX() || this.posX <= boat.getX() + 141) {
                this.speedX *= -1;
            }
            if (this.posY + 93 >= boat.getY() || this.posY <= boat.getY() + 141) {
                this.speedY *= -1;
            }
            this.player.looseLife();
            this.player.scoreUpdate(this.reward);
        }
    };
    Plastic.prototype.checkPlastic = function (plastic, player) {
        this.player = player;
        if (this.posX + 128 >= plastic.getX() && this.posX <= plastic.getX() + 128 && this.posY + 93 >= plastic.getY() && this.posY <= plastic.getY() + 93) {
            if (this.posX + 128 >= plastic.getX() || this.posX <= plastic.getX() + 128) {
                this.speedX *= -1;
            }
            if (this.posY + 93 >= plastic.getY() || this.posY <= plastic.getY() + 93) {
                this.speedY *= -1;
            }
        }
    };
    Plastic.prototype.checkProjectile = function (projectile, index, j, enemy) {
        this.enemy = enemy;
        this.container = document.body.getElementsByTagName("soup")[0];
        if (this.posX + 128 >= projectile.getX() && this.posX <= projectile.getX() + 50 && this.posY + 93 >= projectile.getY() && this.posY <= projectile.getY() + 110) {
            this.player.boat1.projectiles.splice(index, 1);
            this.enemy.Soup.splice(j, 1);
            this.container.removeChild(this.div);
            document.body.removeChild(projectile.div);
            console.log("raakt");
            this.player.scoreUpdate(this.reward);
        }
    };
    Plastic.prototype.move = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
        if (this.posX + 128 > window.innerWidth || this.posX < 0) {
            this.speedX *= -1;
        }
        if (this.posY + 93 > window.innerHeight || this.posY < 0) {
            this.speedY *= -1;
        }
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Plastic.prototype.getX = function () {
        return this.posX;
    };
    Plastic.prototype.getY = function () {
        return this.posY;
    };
    return Plastic;
}());
var Player = (function () {
    function Player() {
        this.lifes = 3;
        this.score = 0;
        this.boat1 = new Boat();
        this.life = new Life();
        this.cannon = this.boat1.cannon;
        this.scoreContainer = document.getElementsByTagName("scorecontainer")[0];
        this.scoreElement = document.createElement("scoreelement");
        this.scoreElement.innerHTML = this.score;
        this.scoreContainer.appendChild(this.scoreElement);
    }
    Player.prototype.looseLife = function () {
        console.log("dead");
        this.lifes = this.lifes - 1;
        console.log(this.lifes);
        this.container = document.getElementsByTagName("container")[0];
        this.lifeImage = document.getElementsByTagName("life")[this.lifes];
        this.container.removeChild(this.lifeImage);
        this.dead = document.createElement("dead");
        this.container.appendChild(this.dead);
        if (this.lifes == 0) {
            window.location.href = "file:///Users/carlo/Documents/CMGT/prog14/PlasticCats/done.php?score=" + this.score + "";
        }
    };
    Player.prototype.scoreUpdate = function (reward) {
        this.scoreContainer = document.getElementsByTagName("scorecontainer")[0];
        this.scoreOld = document.getElementsByTagName("scoreelement")[0];
        this.scoreContainer.removeChild(this.scoreOld);
        this.reward = reward;
        this.score = this.score + this.reward;
        this.scoreElement = document.createElement("scoreelement");
        this.scoreElement.innerHTML = this.score;
        this.scoreContainer.appendChild(this.scoreElement);
    };
    return Player;
}());
var Projectile = (function () {
    function Projectile(posX, posY) {
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("projectile");
        document.body.appendChild(this.div);
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        this.speedX = 0;
        this.speedY = 0;
        this.move();
        setTimeout(this.changeImage, 500);
    }
    Projectile.prototype.move = function () {
        switch (this.boatCannonTick) {
            case 0:
                this.upSpeed = 5;
                this.downSpeed = 0;
                this.leftSpeed = 0;
                this.rightSpeed = 0;
                break;
            case 1:
                this.upSpeed = 5;
                this.rightSpeed = 3;
                this.downSpeed = 0;
                this.leftSpeed = 0;
                break;
            case 2:
                this.upSpeed = 3;
                this.rightSpeed = 5;
                this.leftSpeed = 0;
                this.downSpeed = 0;
                break;
            case 4:
                this.downSpeed = 3;
                this.upSpeed = 0;
                this.rightSpeed = 5;
                this.leftSpeed = 0;
                break;
            case 5:
                this.downSpeed = 5;
                this.upSpeed = 0;
                this.rightSpeed = 3;
                this.leftSpeed = 0;
                break;
            case 7:
                this.leftSpeed = 3;
                this.downSpeed = 5;
                this.upSpeed = 0;
                this.rightSpeed = 0;
                break;
            case 8:
                this.leftSpeed = 5;
                this.downSpeed = 3;
                this.upSpeed = 0;
                this.rightSpeed = 0;
                break;
            case 10:
                this.upSpeed = 3;
                this.downSpeed = 0;
                this.leftSpeed = 5;
                this.rightSpeed = 0;
                break;
            case 11:
                this.upSpeed = 5;
                this.downSpeed = 0;
                this.leftSpeed = 3;
                this.rightSpeed = 0;
                break;
            case 12:
                this.upSpeed = 5;
                this.downSpeed = 0;
                this.leftSpeed = 0;
                this.rightSpeed = 0;
                break;
            case 3:
                this.rightSpeed = 5;
                this.leftSpeed = 0;
                this.upSpeed = 0;
                this.downSpeed = 0;
                break;
            case 6:
                this.downSpeed = 5;
                this.upSpeed = 0;
                this.leftSpeed = 0;
                this.rightSpeed = 0;
                break;
            case 9:
                this.leftSpeed = 5;
                this.rightSpeed = 0;
                this.upSpeed = 0;
                this.rightSpeed = 0;
                break;
        }
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        if (this.div) {
            this.div.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
        }
    };
    Projectile.prototype.remove = function (boat, index) {
        if (this.posX + 40 > window.innerWidth || this.posX < -0) {
            boat.removeProjectile(index);
            document.body.removeChild(this.div);
        }
        if (this.posY + 40 > window.innerHeight || this.posY < -0) {
            boat.removeProjectile(index);
            document.body.removeChild(this.div);
        }
    };
    Projectile.prototype.changeImage = function () {
        document.body.removeChild(this.div);
        this.div = document.createElement("projectile2");
    };
    Projectile.prototype.getX = function () {
        return this.posX;
    };
    Projectile.prototype.getY = function () {
        return this.posY;
    };
    return Projectile;
}());
//# sourceMappingURL=main.js.map