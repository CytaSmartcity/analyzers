import {Injectable} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class Service {

  public companies: Array<any>;
  public id: string;
  public binInfo: Array<any>;
  public rewardsInfo: Array<any>;
  public userInfo: Array<any>;
  constructor(public http: Http,public alertCtrl: AlertController) {}

  getUser(){
    return this.http.get("http://ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/user/readPoints.php?id=1");
  }

  getBinInfo(id:string){
    return this.http.get("http://ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/bin/readOne.php?id="+id);
  }

  getAllRewards(){

    return this.http.get("http://ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/reward/readAll.php");

  }

  postProblem(problem: string){
    let headers = new Headers( { 'Content-Type' : 'application/json' }); 
    let options = new RequestOptions({ headers: headers }); 
    this.http.post('http://ec2-34-216-222-53.us-west-2.compute.amazonaws.com/api/report/add.php', 
        { 
            "binID" : this.id,
            "userID" : "1",
            "problem" : problem
        }).subscribe(data => console.log(data)
            , error => {
                console.log(error.json());
        });

  }
  doAlert(title: string, message: string) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}
