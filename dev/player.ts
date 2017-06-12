class Player {
    
    public div : HTMLElement;
    private scoreElement: HTMLElement;
    private scoreOld: HTMLElement;
    public dead : HTMLElement;
    
    private lifeImage: Element;
    private container: Element;
    private scoreContainer: Element;
    
    public boat1: Boat;
    private life:Life;
    public cannon : Cannon;
    
    private lifes : number = 3;
    private score : number = 0;
    private reward : number;
    
    
    private posX: number;
    private posY: number;
    
    constructor(){
       
        this.boat1 = new Boat();
        this.life = new Life ();
        this.cannon = this.boat1.cannon; 
        this.scoreContainer = document.getElementsByTagName("scorecontainer")[0];
        this.scoreElement = document.createElement("scoreelement");
        this.scoreElement.innerHTML= this.score;
        this.scoreContainer.appendChild(this.scoreElement);
          
        } 
        public looseLife():void {
            console.log("dead");
            this.lifes = this.lifes -1;
            console.log(this.lifes);
            this.container = document.getElementsByTagName("container")[0];
            this.lifeImage = document.getElementsByTagName("life")[this.lifes];
            this.container.removeChild(this.lifeImage);
            this.dead = document.createElement("dead");
            this.container.appendChild(this.dead);
            
            if (this.lifes == 0){
                window.location.href = "file:///Users/carlo/Documents/CMGT/prog14/PlasticCats/done.php?score="+this.score+"";
            }
        }
        
        
        public scoreUpdate(reward:number):void {
            this.scoreContainer = document.getElementsByTagName("scorecontainer")[0];
            this.scoreOld = document.getElementsByTagName("scoreelement")[0];
            this.scoreContainer.removeChild(this.scoreOld);
            this.reward = reward;
            this.score = this.score + this.reward;
            this.scoreElement = document.createElement("scoreelement");
            this.scoreElement.innerHTML= this.score;
            this.scoreContainer.appendChild(this.scoreElement);
            
        }
}