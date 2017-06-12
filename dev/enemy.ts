class Enemy {
    public div: HTMLElement;
    public player: Player;
    private plastic : Plastic;
    private boss:Boss;
    private boat:Boat;
    private boss2:number;
    private plastic2:number;
    
    public Soup:Array<Plastic>= new Array <Plastic>();
    public Bosses:Array<Boss>= new Array <Boss>();
    public projectiles:Array<Projectile>= new Array <Projectile>(); 
    
    public posX: number;
    public posY: number;
    
    public wave : number = 0;
    
    private i : number = 0;
    private b : number = 0;
    
    constructor(boat:Boat){
        this.projectiles = boat.getProjectiles();
        this.waveSetUp(this.wave, boat);
        this.boat = boat;
        console.log(this.wave);
        
    }
    
    public waveStart(plastic:number, boss:number, boat:Boat){
        this.plastic2 = plastic;
        this.boss2 = boss;
        this.checkplasticSoupSpawn(plastic, boat);
        this.checkBossSpawner(boss, boat);
        
    }
    public waveCheck(){
        var p = document.getElementsByTagName("plastic");
        var b = document.getElementsByTagName("boss");

        if (this.i == this.plastic2 && this.b == this.boss2 && p.length == 0){
            console.log("dit");
            this.waveEnd(this.boat);
        }
    }
    
    public checkplasticSoupSpawn(plastic:number, boat:Boat){
        
        
        this.posX = Math.ceil(Math.random() * (innerWidth-128));
        this.posY = Math.ceil(Math.random() * (innerHeight-93));
       
        
       if (this.posX+128 >= boat.getX()-230 && this.posX <= boat.getX() + 460 && this.posY+93 >= boat.getY()-141 && this.posY <= boat.getY()+282) {                                
            this.checkplasticSoupSpawn(plastic, boat);
        }  
      
        
        else {
            console.log(this.i);
               if (this.i > 0){
                   this.checkplastic(plastic, boat);
               }
               else{
                   this.plasticSoupSpawner(plastic, boat);
               }
             } 
    }
    
    public checkplastic(plastic:number, boat:Boat){
        for (var r = 1; r < this.Soup.length; r++){
            var soup = this.Soup[r];
            if (this.posX+135 >= soup.getX() && this.posX <= soup.getX() + 135 && this.posY+100 >= soup.getY() && this.posY <= soup.getY()+100) {                                
                this.checkplasticSoupSpawn(plastic, boat);
            }
            
            else{
                   this.plasticSoupSpawner(plastic, boat);
               }
        }  
    }
    public checkplastic2(plastic:number, boat:Boat){
        for (let r = 1; r < this.Soup.length; r++){
            if (this.posX+128 >= this.Soup[r].getX()-230 && this.posX <= this.Soup[r].getX() + 460 && this.posY+93 >= this.Soup[r].getY()-141 && this.posY <= this.Soup[r].getX()+282) {                                
            this.checkplastic(plastic, boat);
            }
            
            else{
                   this.plasticSoupSpawner(plastic, boat);
               }
        }  
    }
    
    public plasticSoupSpawner(plastic:number, boat:Boat){
        var p = document.getElementsByTagName("plastic");
        if (this.i < plastic){
            this.i = this.i + 1;
            this.plastic = new Plastic(this.posX, this.posY, this.wave);
            this.Soup[this.i]= this.plastic;
            this.checkplasticSoupSpawn(plastic, boat);
            
        }
    }
    
    public waveEnd(boat:Boat){
        
        this.i = 0;
        this.b = 0;
        console.log("id");
        this.waveCounter(boat);
        
    }
    
    public waveCounter(boat:Boat){
        console.log("goed");
        // boat.removeProjectiles();
        this.wave = this.wave +1;
        this.waveSetUp(this.wave, boat);
        
    }
    
    public waveSetUp(wave:number, boat:Boat){
        if (this.wave == 0){
            this.waveStart(1,1, boat);
        }
        else if (this.wave == 1){
            this.waveStart(6,0, boat);
        }
        else if (this.wave == 2){
            this.waveStart(7,0, boat);
        }
        else if (this.wave == 3){
            this.waveStart(8,0, boat);
        }
        else if (this.wave == 4){
            this.waveStart(5,1, boat);
        }
        else if (this.wave == 5){
            this.waveStart(10,0, boat);
        }
        else if (this.wave == 6){
            this.waveStart(11,0, boat);
        }
        else if (this.wave == 7){
            this.waveStart(12,0, boat);
        }
        else if (this.wave == 8){
            this.waveStart(13,0, boat);
        }
        else if (this.wave == 9){
            this.waveStart(14,0, boat);
        }
        else if (this.wave == 10){
            this.waveStart(10,1, boat);
        }
        else if (this.wave == 11){
            this.waveStart(15,0, boat);
        }
        else if (this.wave == 12){
            this.waveStart(16,0, boat);
        }
        else if (this.wave == 13){
            this.waveStart(17,0, boat);
        }
        else if (this.wave == 14){
            this.waveStart(18,0, boat);
        }
        else if (this.wave == 15){
            this.waveStart(19,0, boat);
        }
        else if (this.wave == 16){
            this.waveStart(15,1, boat);
        }
        else if (this.wave == 17){
            this.waveStart(20,0, boat);
        }
        else if (this.wave == 18){
            this.waveStart(21,0, boat);
        }
        else if (this.wave == 19){
            this.waveStart(22,0, boat);
        }
        else if (this.wave == 20){
            this.waveStart(23,0, boat);
        }
        else if (this.wave == 21){
            this.waveStart(24,0, boat);
        }
        else if (this.wave == 22){
            this.waveStart(5,2, boat);
        }
        else if (this.wave == 23){
            this.waveStart(25,0, boat);
        }
        else if (this.wave == 24){
            this.waveStart(26,0, boat);
        }
        else if (this.wave == 25){
            this.waveStart(27,0, boat);
        }
        else if (this.wave == 26){
            this.waveStart(28,0, boat);
        }
        else if (this.wave == 27){
            this.waveStart(29,0, boat);
        }
        else if (this.wave == 28){
            this.waveStart(10,2, boat);
        }
        else if (this.wave == 29){
            this.waveStart(30,0, boat);
        }
        else if (this.wave == 30){
            this.waveStart(31,0, boat);
        }
        else if (this.wave == 31){
            this.waveStart(32,0, boat);
        }
        else if (this.wave == 32){
            this.waveStart(33,0, boat);
        }
        else if (this.wave == 33){
            this.waveStart(34,0, boat);
        }
        else if (this.wave == 34){
            this.waveStart(35,0, boat);
        }
        else if (this.wave == 35){
            this.waveStart(10,3, boat);
        }
        else if (this.wave == 36){
            this.waveStart(36,0, boat);
        }
        else if (this.wave == 37){
            this.waveStart(37,0, boat);
        }
        else if (this.wave == 38){
            this.waveStart(38,0, boat);
        }
        else if (this.wave == 39){
            this.waveStart(39,0, boat);
        }
        else if (this.wave == 40){
            this.waveStart(40,0, boat);
        }
        else if (this.wave == 41){
            this.waveStart(20,1, boat);
        }
        else if (this.wave == 42){
            this.waveStart(21,1, boat);
        }
        else if (this.wave == 43){
            this.waveStart(22,1, boat);
        }
        else if (this.wave == 44){
            this.waveStart(23,1, boat);
        }
        else if (this.wave == 45){
            this.waveStart(24,1, boat);
        }
        else if (this.wave == 46){
            this.waveStart(25,1, boat);
        }
        else if (this.wave == 47){
            this.waveStart(26,2, boat);
        }
        else if (this.wave == 48){
            this.waveStart(27,2, boat);
        }
        else if (this.wave == 49){
            this.waveStart(28,2, boat);
        }
        else if (this.wave == 50){
            this.waveStart(29,2, boat);
        }
        else if (this.wave == 51){
            this.waveStart(30,2, boat);
        }
        else if (this.wave == 52){
            this.waveStart(20,3, boat);
        }
        else if (this.wave == 53){
            this.waveStart(21,3, boat);
        }
        else if (this.wave == 54){
            this.waveStart(22,3, boat);
        }
        else if (this.wave == 55){
            this.waveStart(23,3, boat);
        }
        else if (this.wave == 56){
            this.waveStart(24,3, boat);
        }
        else if (this.wave == 57){
            this.waveStart(25,3, boat);
        }
        else if (this.wave == 58){
            this.waveStart(26,4, boat);
        }
        else if (this.wave == 59){
            this.waveStart(27,4, boat);
        }
        else if (this.wave == 60){
            this.waveStart(28,4, boat);
        }
        else if (this.wave == 61){
            this.waveStart(29,4, boat);
        }
        else if (this.wave == 62){
            this.waveStart(30,4, boat);
        }
        else if (this.wave == 63){
            this.waveStart(31,5, boat);
        }
        else if (this.wave == 64){
            this.waveStart(32,5, boat);
        }
        else if (this.wave == 65){
            this.waveStart(33,5, boat);
        }
        else if (this.wave == 66){
            this.waveStart(34,5, boat);
        }
        else if (this.wave == 67){
            this.waveStart(35,5, boat);
        }
        else if (this.wave == 68){
            this.waveStart(36,6, boat);
        }
        else if (this.wave == 69){
            this.waveStart(38,6, boat);
        }
        else if (this.wave == 70){
            this.waveStart(39,6, boat);
        }
        else if (this.wave == 71){
            this.waveStart(40,6, boat);
        }
        else if (this.wave == 72){
            this.waveStart(20,7, boat);
        }
        else if (this.wave == 73){
            this.waveStart(20,7, boat);
        }
        else if (this.wave == 74){
            this.waveStart(21,7, boat);
        }
        else if (this.wave == 75){
            this.waveStart(22,7, boat);
        }
        else if (this.wave == 76){
            this.waveStart(23,8, boat);
        }
        else if (this.wave == 77){
            this.waveStart(24,9, boat);
        }
        else if (this.wave == 78){
            this.waveStart(25,10, boat);
        }
        else if (this.wave == 79){
            this.waveStart(26,11, boat);
        }
        else if (this.wave == 80){
            this.waveStart(25,25, boat);
        }
    }
    
    
    
    public checkBossSpawner(boss:number, boat:Boat){
        
        
        this.posX = Math.ceil(Math.random() * (innerWidth-230));
                this.posY = Math.ceil(Math.random() * (innerHeight-313));
                    if (this.posX+128 >= boat.getX()-230 && this.posX <= boat.getX() + 460 && this.posY+93 >= boat.getY()-141 && this.posY <= boat.getY()+282) { 
                        
                            this.checkBossSpawner(boss, boat);

                    }
                                    
                    else {
                            this.bossSpawner(boss, boat);
                         }
    }
    
    public bossSpawner(boss:number, boat:Boat){
        var b = document.getElementsByTagName("boss");
        if (this.b < boss){
            this.b = this.b + 1;
            this.boss = new Boss(this.posX, this.posY, this.wave, boat);
            this.Bosses[this.b]= this.boss;
            this.checkBossSpawner(boss, boat);
        }
        
        
    }
}