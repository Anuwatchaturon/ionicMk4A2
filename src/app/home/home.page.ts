import { Component } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  server: string = "http://localhost/api/show.php";
  serverx: String = "http://localhost/";
  list=[]
  data:String;
HttpClient: any;
headers: HttpHeaders;

fname:String
place:String
code:String
tel:String
fax:String
email:String

uid:String;
btn:String="Insert"
  constructor(    public http: HttpClient,) {

    this.headers = new HttpHeaders();
      this.headers.append("Accept",'application/json');
      this.headers.append('Content-Type','application/json');
      this.headers.append('Access-Control-Allow_Origin','*');
      this.http.get(this.server).subscribe((res:any)=>{
        console.log("success");
        this.data = res;
console.log(this.data)
        },(error:any)=>{
        console.log("error");
        })

  }


  reaload(){
    this.headers.append("Accept",'application/json');
    this.headers.append('Content-Type','application/json');
    this.headers.append('Access-Control-Allow_Origin','*');
    this.http.get(this.server).subscribe((res:any)=>{
      console.log("success");
      this.data = res;
console.log(this.data)
      },(error:any)=>{
      console.log("error");
      })


  }

insert(){

if(this.btn == "Update"){
this.update();
}else{
  console.log((this.data.length))
  let data =  {
    id: ""+String(Number(this.data.length)+1),
    fname:this.fname,
    place: this.place,
    code: this.code,
    tel: this.tel,
    fax: this.fax,
    email:this.email,
  }
  this.http.post( "http://localhost/api/post.php",JSON.stringify(data),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  this.reaload()
}


}

clear(){
  this.fname=""
  this.place=""
  this.code=""
  this.tel=""
  this.fax=""
  this.email=""

}

edit(e){
  console.log(e)
  this.uid=e
  this.btn ="Update"
for(let i=0;i<this.data.length;i++){
  if(this.data[i]['id']==e){
    this.fname=this.data[i]['fname']
    this.place=this.data[i]['place']
    this.code=this.data[i]['code']
    this.tel=this.data[i]['tel']
    this.fax=this.data[i]['fax']
    this.email=this.data[i]['email']
  }
}

}

update(){
  let data =  {
    id: this.uid,
    fname:this.fname,
    place: this.place,
    code: this.code,
    tel: this.tel,
    fax: this.fax,
    email:this.email,
  }
  this.http.post( "http://localhost/api/update.php",JSON.stringify(data),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });

  this.btn ="Insert"
  this.reaload()
}


del(r){
console.log(r)

this.http.delete("http://localhost/api/del.php?id="+String(r)).subscribe(res => {
});
}
}
