import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: string[] = [];
  todo: string;

  constructor(public navCtrl: NavController, private alertController: AlertController) {

  }

  ionViewDidLoad(){

  }

  add() {
    let addTodoAlert = this.alertController.create({
        
        message:"Successfully Added!",
        buttons:[{
            text:"OK"
        }
    ]
    });
    addTodoAlert.present()
    this.todos.push(this.todo);
    this.todo = "";    
}

delete(item) {
    let delTodoAlert = this.alertController.create({
        
        message:"Successfully Deleted!",
        buttons:[{
            text:"OK"
        }
    ]
    });
    delTodoAlert.present()
    var index = this.todos.indexOf(item, 0);
    if (index > -1) {
        this.todos.splice(index, 1);
    }
}

edit(item){
    var index = this.todos.indexOf(item,0)
    let editTodoAlert = this.alertController.create({
        title:"Edit Todo",
        message:"Please Input!",
        inputs:[
        {
            type:"text",
            name:"editTodoInput",
            placeholder:item,
        }],
        buttons:[
        {
        text:"Update",
        handler:(inputData)=>{
            let todoText;
            todoText = inputData.editTodoInput;
            this.todos.splice(index,1);
            this.todos.push(todoText);    
        }   
        }],
    });
    editTodoAlert.present()
    // if (index > -1){
    //     this.todos.splice(index,1);
    //     this.todo = item;
    // }
}

}
