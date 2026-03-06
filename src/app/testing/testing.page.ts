import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { from } from 'rxjs';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],


})
export class TestingPage implements OnInit {


  menuList: any[] = [];
  menu: any = {};

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiJiYXNlV2ViQXBpU3ViamVjdCIsImp0aSI6WyI0MmU1N2Y5YS05ZDM1LTRlYTUtOTM1Yy0zYjE5ZWYxZjY5ZTQiLCI1LzMvMjAyNiAxMDo0OTowOCBBTSJdLCJJZCI6IjAiLCJVc2VyTmFtZSI6ImFkbWluIiwiUGFzc3dvcmQiOiJhZG1pbiIsImV4cCI6MTgwNDIxNDk0OCwiaXNzIjoiYmFzZVdlYkFwaUlzc3VlciIsImF1ZCI6ImJhc2VXZWJBcGlBdWRpZW5jZSJ9.DYS86c_1wuK_G7Il9dbP8gCwzr6mmiBxN9SEu5BX_s4";


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get<any[]>(
      "https://xcodeappapi.xcode.com.my/api/ManageMenu/GetMenuList",
      { headers }
    ).subscribe(data => {
      this.menuList = data;
    });
  }



  edit(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.get(
      "https://xcodeappapi.xcode.com.my/api/ManageMenu/GetMenuById/" + id,
      { headers }
    ).subscribe((data: any) => {
      console.log(data);
    })
  }

  updateMenu() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.token,
      'Content-Type': 'application/json'
    });

    const body = {

      MenuId: this.menu.MenuId,
      ItemName: this.menu.ItemName,
      Price: this.menu.Price,

      Image: "",
      ImageByte: "",
      Qty: 10,
      ItemDescription: "",
      IsDeliveryAllow: true,
      IsSpicy: false,
      Status: "active",
      Category: "food",
      SubMenuListJson: "[]"

    };

    this.http.put(
      "https://xcodeappapi.xcode.com.my/api/ManageMenu/UpdateMenuItem",
      body,
      { headers }
    ).subscribe(res => {
      alert("Update Success");
    });
  }
}
