class Boat {
    
    public div : HTMLElement;
    public cannon : Cannon;
    
    
    public projectiles :Array<Projectile> = [];
    private posX:number;
    private posY:number;
    
    private upKey : number;
    private downKey : number;
    private leftKey : number;
    private rightKey : number;
    private spaceKey: number;
    
    public leftSpeed : number = 0;
    public rightSpeed : number = 0;
    public downSpeed : number = 0;
    public upSpeed : number = 0;
    
    private rotateLeftKey : number;
    private rotateRightKey : number;
    
    private rotation: number = 0;
    
    private a: number;
    private p: Element;
    
    private game : Game;
    
    constructor(){
       
        this.div = document.createElement("boat");
        document.body.appendChild(this.div);
        
        
        
        this.cannon = new Cannon(this, -125, -150);
        // this.cannon.cannonRotate();
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight / 2;
        
        // keys kunnen verschillend zijn voor elke instance van charmander
        this.upKey = 87;
        this.downKey = 83;
        this.leftKey = 65;
        this.rightKey = 68;
        this.rotateLeftKey = 37;
        this.rotateRightKey = 39;
        this.spaceKey = 32;
        
        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
       
    }
    
    public onKeyDown(event:KeyboardEvent) : void {
        switch (event.keyCode){
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
            if(this.projectiles.length < 8) {
                this.shoot();
                this.getProjectiles();
            }
            
            break;
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void{
        switch (event.keyCode){
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
    }
    
    // public emergencyBreak(): void{
    //        console.log("emergency");
    //        this.leftSpeed = 0;
    //        this.rightSpeed = 0;
    //        this.upSpeed = 0;
    //        this.downSpeed = 0;
    // }
    
    public move() : void {
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px)";
        
    }
    
    public shoot() : void{
        
        
        var projectile1 = new Projectile(this.posX + 20, this.posY);   
        this.projectiles.push(projectile1);
        console.log("made a projectile");
        this.getProjectiles();
    } 
    
     
    
    public getProjectiles() : Array<Projectile>{
        
        return this.projectiles;
    }
    
    public removeProjectile(index : number) : void{
        this.projectiles.splice(index, 1);
    }
    public removeProjectiles() : void{
        for (let o = 0; o < this.projectiles.length; o++){
            this.projectiles.splice(o, 1);
            this.p = document.getElementsByTagName("projectile")[o];
            
            document.body.removeChild(this.p);
        }
    }
    
        // Plastic kan positie opvragen van de boot
    public getX():number {
        return this.posX;
    }
    
    public getY():number {
        return this.posY;
    }
    
}