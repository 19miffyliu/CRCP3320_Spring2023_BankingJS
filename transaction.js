class Transaction{
    constructor(type,value,id){
        this.type = type;
        this.value = value;
        this.id = id;
    }

    getType(){return this.type;}
    getValue(){return this.value;}
    getID(){return this.id;}

    setID(id){this.id=id;}

}