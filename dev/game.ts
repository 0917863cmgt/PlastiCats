class Game {
        
        public enemy: Enemy;
        private plastic : Plastic;
        private Soup:Array<Plastic>= new Array <Plastic>();
        
        public player: Player;
        private boat1 : Boat;
        private cannon : Cannon;
        public projectiles:Array<Projectile>= new Array <Projectile>(); 
       
        private posX: number;
        private posY: number;
        
    constructor(){
        this.player = new Player();
        this.enemy = new Enemy(this.player.boat1);
        requestAnimationFrame(this.gameLoop.bind(this));
        
    }
    
    private gameLoop(){
        // Array is stored in the variabel this.projectiles by using the function @Class BOAT
        this.projectiles = this.player.boat1.getProjectiles(); 
        
        this.player.boat1.move();
         
        // All the plastic are selected to check if they touch eachother
        // This code does not match the same plastic together
            if (this.enemy.Soup.length > 2){  
                        for(let a = 1 ; a < this.enemy.Soup.length; a++){
                        var soup = this.enemy.Soup[a];
                        for(let b = 1 ; b < this.enemy.Soup.length; b++){
                        var othersoup = this.enemy.Soup[b];
                        if(soup != othersoup) {
                            soup.checkPlastic(othersoup, this.player);
                        }
                    }
                }
            }
       
        
        if (this.projectiles.length > 0){  
        for(var i = 0 ; i < this.projectiles.length; i++){
            var projectile = this.projectiles[i];
            for(var j = 1 ; j < this.enemy.Soup.length; j++){
                var soup = this.enemy.Soup[j];
                soup.checkProjectile(projectile, i , j, this.enemy);
                
            }
        }
        }
        
        
        if (this.projectiles.length > 0 && this.enemy.Soup.length > 0){  
        for (let index = 0; index < this.projectiles.length; index++) {
            var element = this.projectiles[index];
            element.boatCannonTick = this.player.boat1.cannon.rotationTick;
            element.move();
             element.remove(this.player.boat1, index);
        }
        }
        
        if (this.projectiles.length > 0 && this.enemy.Bosses.length > 0){  
        for(var h = 0 ; h < this.projectiles.length; h++){
            var projectile = this.projectiles[h];
            for(var g = 1 ; g < this.enemy.Bosses.length; g++){
                var boss = this.enemy.Bosses[g];
                boss.checkProjectile(projectile, h , g, this.enemy);
                
            }
        }
        }
        
        // Each Plastic in the array is selected to move and to check if the plastic touches the boat/player
        if (this.enemy.Soup.length > 1){  
        for (let z:number = 1; z < this.enemy.Soup.length ; z++){
            this.enemy.Soup[z].move();
            this.enemy.Soup[z].checkBoat(this.player.boat1, this.player);
            }
        }
        if (this.enemy.Bosses.length > 0){
        for (let q:number = 1; q < this.enemy.Bosses.length; q++){
            this.enemy.Bosses[q].move();
            this.enemy.Bosses[q].checkBoat(this.player.boat1, this.player);
        }
        }
        
        this.enemy.waveCheck();
        
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}