import { CommonModule } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule ,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoListService } from '../todo-list.service';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  taskstring: string = "";
  arr: any[] = [];
  button = "Edit";
  checked = false;
  index!: number
  isEdit: boolean = false
  showcheckboxes:boolean = false
  select:string ="Select"
  Button:string = "Select"
  selectedTasks:boolean[]=[]
  editTaskId:string |null =null

  

  constructor(private todoservice: TodoListService,
    private formbuilder: FormBuilder
  ) {
    // const localTasks = localStorage.getItem('tasklist');
    // if (localTasks) {
    //   this.arr = JSON.parse(localTasks);
    // }  
  }
  ngOnInit(): void {
     this.getallTask()
  }
  getallTask(){
    this.todoservice.getAllTask().subscribe((response:any)=>{
      this.arr = response.response.Tasks;
      console.log(this.arr);
      
    })
  }
  
  save() {
      console.log("Save method");
      this.todoservice.addNewTask({taskName:this.taskstring}).subscribe({
        next : (response : any) => {
          console.log(response);
          let result = response
          this.getallTask();
          this.taskstring = " "
        },
        error : (err : any)=>{
          if(err.status===401){
            alert(err.error.message)
            this.taskstring = " "
          }else{
          console.log(err);
          alert("Something Went Wrong! ensure u logedin");
          this.taskstring = " ";
          }
        }
      });
  }
  
  editTask(index:number,id:string, task:string) {
    //this.arr[index].iseditable = true;
    this.isEdit = true
    //this.arr[index].taskName = inputref.value;
    this.taskstring = task
    this.editTaskId= id
    this.index = index
  }
  toggle(index:number){
    this.arr[index].iseditable = true;
  }
  updateTask(input:HTMLInputElement) {
   let newtaskName = input.value 
   console.log(newtaskName);
   
   this.todoservice.updateTask({id:this.editTaskId,name:newtaskName}).subscribe({
     next:(response:any) => {
       console.log(response);
       this.getallTask()
     },
     error: (err:any)=>{
       if(err.status ===401){
         alert(err.error.message)
       }else{
        console.log(err);
        alert("Something Went Wrong!");
       }
      }
    });
  }
         
  anotherEdit() {
    this.arr[this.index].taskName = this.taskstring
    this.isEdit = false
    this.arr[this.index].iseditable = false;
    const users = this.arr[this.index]
    //localStorage.setItem('tasklist',JSON.stringify(users))
    this.index = 1
    this.taskstring = ''
    //this.updateLocalStorage();
    
  }
       
  deleteTask(_id: string) {
     if (confirm("do you want to delete this task")) {
       this.todoservice.deleteTask({id:_id}).subscribe({
        next:(response:any) => {
          console.log(response);
          this.getallTask()
    
        },
        error: (err:any)=>{
          console.log(err);
          alert("Something Went Wrong!");
          
        }
      });
       /*  this.arr.splice(index, 1);
        this.updateLocalStorage() */
     }
  }
  
ischecked(index: number,id:string) {
  this.isEdit = false
  this.arr[index].iscompleted = !this.arr[index].iscompleted;
 
  this.todoservice.updateStatus({id:id, complete:this.arr[index].iscompleted}).subscribe({
      next:(response:any)=>{
        console.log(response);
  
      },error:(err:any)=>{
        console.log(err);
        alert("something went wrong")
        
      }
    })
    console.log(this.arr);
    console.log(this.arr);
  }

togglecheckbox(){
      if(this.Button ==="Select"){
        this.Button = "Delete";
      }else if(this.Button ==="Delete"){
        // this.Button = "Select"
        console.log("selectedtask:",this.selectedTasks);
  
        this.arr = this.arr.filter((_task, index) => !this.selectedTasks[index]);
        console.log(this.arr);
        
        this.selectedTasks = this.selectedTasks.filter((selected, index) => !selected);
        this.Button = "Select"
        
      }
      
      this.showcheckboxes = !this.showcheckboxes;
  }
  
  deleteMultipleTask(){
      // console.log("selectedtask:",this.selectedTasks);
      // this.arr = this.arr.filter((_task, index) => !this.selectedTasks[index]);
      // console.log(this.arr);
      // this.selectedTasks = this.selectedTasks.filter((selected, index) => !selected);
  }
    updateLocalStorage() {
      localStorage.setItem('tasklist', JSON.stringify(this.arr));
    }
}
