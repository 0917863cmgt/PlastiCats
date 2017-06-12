/**
 * Life
 */
class Life {
    private div:HTMLElement;
    private container: Element;
    private amount:number;
    
    constructor() {
        this.container = document.getElementsByTagName("container")[0];
        for (let i = 0; i < 3; i++){
            this.div = document.createElement("life");
            this.container.appendChild(this.div);
        }
        
    }
    
}