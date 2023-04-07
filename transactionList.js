function hideForm(){
    document.getElementById("newTranForm").style.display = "none";
    document.getElementById("transactionList").style.display = "none";
    document.getElementById("clickAddTran").style.display = "block";

    document.getElementById("tt").style.display = "none";
}

function showForm(){
    document.getElementById("newTranForm").style.display = "block";
    document.getElementById("clickAddTran").style.display = "none";
}


class TransactionList{
    constructor(){
        this.list = [];
        this.total = 0;

        

    }

    getlist(){return this.list;}

    refresh(){
        let trans = document.querySelector('#transactionList');
        let tranAdded = document.getElementById('sampleTran');

        document.getElementById("transactionList").style.display = "block";

        let newId;

        for (let i = 0; i < this.list.length; i++){


            newId = this.list[i].value.toString()+this.list[i].type+Math.random()*100;

            if(this.list[i].getID()!=0)continue;

            let tranPerInfo = tranAdded.cloneNode(true);
            tranPerInfo.setAttribute("id", newId);
            tranPerInfo.setAttribute("class", "added_transactions");
            tranPerInfo.style.display = "block";
            tranPerInfo.querySelector('p').innerText = this.list[i].value;
            tranPerInfo.querySelector('p').style.color = this.list[i].type == 1? "green" : "red";
            tranPerInfo.querySelector('button').onclick = () => { 
                this.list.splice(i,1); 
                document.getElementById(newId).remove();
                //this.refresh();
            }
            trans.appendChild(tranPerInfo);

            this.list[i].setID(1);
        }

        
        //document.getElementById("transactionList").style.display = "block";
    }

    addTran(){
        let type = -1;
        if(document.getElementById("wd").checked){
            type = 0;
        }else if(document.getElementById("dp").checked){
            type = 1;
        } else {
            alert("Type not selected. Try again.")
        };

        if(type!=-1){
        
        let val =  document.getElementById("newTranVal").value;

        //console.log(type + " " + val);
        
        this.list.push(new Transaction(type,val,0));
        this.refresh();
        }
    }

    delTran(tr){
        this.list.splice(tr,1);
    }

    calculate(){
        this.total = parseInt(document.getElementById("im").value);
        if (isNaN(this.total))alert("missing initial value. Try again.");
        //console.log("initial: " + this.total);

        for (let i = 0; i < this.list.length; i++){
            let val = parseInt(this.list[i].getValue());
            if (val === [] || isNaN(val)){
                alert("missing input. Try again.");
                break;
            }
            else this.list[i].getType() == 1? this.total += val : this.total -= val;
        }
        document.getElementById("tt").innerText = this.total;
        document.getElementById("tt").style.display = "block";

        /*
        console.log("current list: ");
        for (let i = 0; i < this.list.length; i++){

            console.log(i+". Val: " + this.list[i].getValue()+ " Type: " + this.list[i].getType()
            + " ID: "+ this.list[i].getID() );
        }*/
    }

    

    delAll(){
        this.list.splice(0,this.list.length);
        let temp = document.querySelectorAll(".added_transactions");
        if(temp!=null){
            temp.forEach(e => e.remove());
        }
        document.getElementById("im").value = null;
        document.getElementById("newTranVal").value = null;
        hideForm();
        this.total = 0;
    }

}