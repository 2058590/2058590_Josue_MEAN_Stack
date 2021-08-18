
export class Item 
{
   // private template:string; 
    private name:string;
    private id:number;
    private price:number;
    private img:string;
    constructor(name:string, id:number, price:number, img = ""){
        this.name = name;
        this.id = id;
        this.price = price;
        this.img = img;
        //this.template = 
    }

    toString() : string
    {
        return `<div>${this.name}</div>
        <div>Item #${this.id}</div>
        <div>Price $${this.price}</div>
        <div>${this.img}</div>`;
        //this.template;
    }

    toObj() 
    {
        return {name:this.name, id:this.id, price:this.price, img:this.img};
    }
}