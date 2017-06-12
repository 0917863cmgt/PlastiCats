class Boss{
    public div:HTMLElement;
    private container:Element;
    private player: Player;
    private enemy: Enemy;
    public Bosses:Array<Boss>= new Array <Boss>();
    
    private posX : number;
    private posY : number;
    
    private speedX:number;
    private speedY:number;
    
    private reward:number;
    
    private r:number = 0;
    private wave :number;
    private boat:Boat;
    
    constructor(posX : number, posY: number, wave:number, boat:Boat){
        this.div = document.createElement("Boss");
        this.container = document.body.getElementsByTagName("bosses")[0];
        this.container.appendChild(this.div);
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        this.speedX = Math.ceil(Math.random() * (3+wave));
        this.speedY = Math.ceil(Math.random() * (3+wave));
        this.reward = (300 * this.speedX + 300 * this.speedY)/2;
        this.wave = wave;
        this.move();
        this.boat = boat;
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
        }
    }  
    
    public checkProjectile(projectile:Projectile, index:number, j:number, enemy:Enemy) :void {
       
        this.container = document.body.getElementsByTagName("bosses")[0];
        if (this.posX+300 >= projectile.getX() && this.posX <= projectile.getX() + 128 && this.posY+200 >= projectile.getY() && this.posY <= projectile.getY()+93) { 
           
           this.boat.projectiles.splice(index,1);
           document.body.removeChild(projectile.div);
          this.r = this.r +1;
         
            if (this.r == 3 + this.wave){
                
                enemy.Bosses[j] = null;
                enemy.Bosses.splice(j, 1);
                this.container.removeChild(this.div);
                this.player.scoreUpdate(this.reward);
            }
           
        }
    }
    
    public move() : void {
        this.posX += this.speedX;
        this.posY += this.speedY;
        
        // als we buiten beeld gaan dan de snelheid omdraaien
        if( this.posX + 313 > window.innerWidth || this.posX < 0) { 
            this.speedX *= -1;
              
        }
        
        if( this.posY + 200 > window.innerHeight || this.posY < 0) { 
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