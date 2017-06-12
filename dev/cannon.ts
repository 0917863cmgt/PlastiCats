class Cannon {
    
    private boat:Boat;
    private div : HTMLElement;
    
    private rotateLeftKey : number;
    private rotateRightKey : number;
    
    public x:number;
    public y:number;
    
    private rotation: number = 0;
    public rotationTick : number = 0;
    
    constructor(b:Boat, x:number, y:number){
        this.boat = b;
        this.div = document.createElement("cannon");
        this.boat.div.appendChild(this.div);
        this.rotateLeftKey = 37;
        this.rotateRightKey = 39;
        this.x = x;
        this.y = y;
        
        this.update();
        
        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    
    public onKeyDown(event:KeyboardEvent) : void {
       if(this.rotationTick == 12){
            this.rotationTick = 0;
        }
        if(this.rotationTick == -1){
            this.rotationTick = 11;
        }
     
        
        switch (event.keyCode){
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
    }
    
    public onKeyUp(event:KeyboardEvent):void{
        switch (event.keyCode){
            case this.rotateLeftKey:
            this.update();
            break;
            case this.rotateRightKey:
            this.update();
            break;
        }
    }
    
     public update():void {
        // vraag: hoe kan het wiel weten waar de auto is?
        this.draw();
    }
    
    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }
}