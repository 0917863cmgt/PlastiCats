class Plastic {
    public div:HTMLElement;
    public player: Player;
    private boat:Boat;
    public enemy:Enemy;
    private container: Element;
    private projectile : Projectile;
    private projectiles:Array<Projectile>= new Array <Projectile>(); 
    private Soup:Array<Plastic>= new Array <Plastic>();
    
    
    private posX : number;
    private posY : number;
    
    private speedX:number;
    private speedY:number;
    
    private reward:number;
    
    
    constructor(posX : number, posY: number, wave:number){
        this.div = document.createElement("Plastic");
        this.container = document.body.getElementsByTagName("soup")[0];
        this.container.appendChild(this.div);
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        
        this.speedX = Math.ceil(Math.random() * (1+wave));
        this.speedY = Math.ceil(Math.random() * (1+wave));
        
        this.reward = (100 * this.speedX + 100 * this.speedY)/2;
        
        this.move();
        
    }
    
    public checkBoat(boat:Boat, player:Player) {
        this.player = player; 
        if (this.posX+128 >= boat.getX() && this.posX <= boat.getX() + 230 && this.posY+93 >= boat.getY() && this.posY <= boat.getY()+141) { 
           if (this.posX+128 >= boat.getX() || this.posX <= boat.getX() + 141) { 
                this.speedX *= -1;
                
            }
         if (this.posY+93 >= boat.getY() || this.posY <= boat.getY()+141) {
                this.speedY *= -1;
                
            }
            this.player.looseLife();
            this.player.scoreUpdate(this.reward);
        }
    }
    
    // public checkBoss(boss:Boss, player:Player) {
    //     this.player = player; 
    //     if (this.posX+128 >= boss.getX() && this.posX <= boss.getX() + 230 && this.posY+93 >= boss.getY() && this.posY <= boss.getY()+141) { 
    //        if (this.posX+128 >= boss.getX() || this.posX <= boss.getX() + 141) { 
    //             this.speedX *= -1;                     
    //         }
    //      if (this.posY+93 >= boss.getY() || this.posY <= boss.getY()+141) {
    //             this.speedY *= -1;
    //         }
    //     }
    // }
    
        
    
    public checkPlastic(plastic:Plastic, player:Player) {
        this.player = player; 
        if (this.posX+128 >= plastic.getX() && this.posX <= plastic.getX() + 128 && this.posY+93 >= plastic.getY() && this.posY <= plastic.getY()+93) { 
           if (this.posX+128 >= plastic.getX() || this.posX <= plastic.getX() + 128) { 
           this.speedX *= -1;
            }
         if (this.posY+93 >= plastic.getY() || this.posY <= plastic.getY()+93) {
           this.speedY *= -1;
            }
        }
    }  
    
    public checkProjectile(projectile:Projectile, index:number, j:number, enemy:Enemy) :void {
        this.enemy = enemy;
        this.container = document.body.getElementsByTagName("soup")[0];
        if (this.posX+128 >= projectile.getX() && this.posX <= projectile.getX() + 50 && this.posY+93 >= projectile.getY() && this.posY <= projectile.getY()+110) { 
           this.player.boat1.projectiles.splice(index,1);
           this.enemy.Soup.splice(j, 1);
           
           this.container.removeChild(this.div);
           document.body.removeChild(projectile.div);
           
           console.log("raakt");           
           
           
           
           
           this.player.scoreUpdate(this.reward);
           
        }
    }
    
    public move() : void {
        this.posX += this.speedX;
        this.posY += this.speedY;
        
        // als we buiten beeld gaan dan de snelheid omdraaien
        if( this.posX + 128 > window.innerWidth || this.posX < 0) { 
            this.speedX *= -1;
              
        }
        
        if( this.posY + 93 > window.innerHeight || this.posY < 0) { 
            this.speedY *= -1;
        }
        
        // transform gebruiken om de positie op het scherm aan te passen
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
    }
    
    public getX():number {
        return this.posX;
    }
    
    public getY():number {
        return this.posY;
    }
    
    
    
}