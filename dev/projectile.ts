class Projectile {
    
    public div :HTMLElement;
    
    
    public boatCannon : Cannon;
    public posX:number;
    public posY:number;
    public speedX:number;
    public speedY:number;
    public boatCannonTick:number;
    
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;
    
    constructor(posX, posY){
        
        this.div = document.createElement("projectile");
        document.body.appendChild(this.div);
        
        this.posX = posX;
        this.posY = posY;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        this.speedX = 0;
        this.speedY = 0;
        this.move(); 
        setTimeout(this.changeImage, 500);
    }
    
    // public onKeyDown(event:KeyboardEvent) : void {
    //     switch (event.keyCode){
    //         case this.spaceKey:
    //         this.makeProjectile()
    //     }
    // }
    
    //public makeProjectile() : Projectile {
        
     //   var projectile1 = new Projectile(this.posX, this.posY);
        
       // return projectile1;
   // }
//    public getCannon(Cannon) : any {
       
//        this.boatCannon = Cannon;
  
//    }
    
    public move() : void {

        switch (this.boatCannonTick){
            case 0:
            this.upSpeed = 5;
            this.downSpeed = 0;
            this.leftSpeed = 0;
            this.rightSpeed = 0;          
            break;          
            case 1:
            this.upSpeed = 5;
            this.rightSpeed = 3;
            this.downSpeed =0;
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
        
        
        // transform gebruiken om de positie op het scherm aan te passen
        if(this.div){
            
       
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        
         }  
    }
    
    public remove(boat : Boat, index : number) : void {
        // als we buiten beeld gaan dan verwijderen we het projetiel
        if( this.posX + 40 > window.innerWidth || this.posX < -0) { 
            boat.removeProjectile(index);
            document.body.removeChild(this.div);
           
        }
        
        if( this.posY + 40 > window.innerHeight || this.posY < -0) { 
            boat.removeProjectile(index);
            document.body.removeChild(this.div); 
        }
        
    }
    
    public changeImage ():void{
        document.body.removeChild(this.div);
        this.div = document.createElement("projectile2");
    }
    
    public getX():number {
        return this.posX;
    }
    
    public getY():number {
        return this.posY;
    }
    
}