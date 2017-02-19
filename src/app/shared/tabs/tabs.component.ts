import { Component, Output, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from '../../../app/shared/tabs/tab.component'; 
/*
Referred from http://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/
*/
@Component({
    selector: 'so-tabs',
    template:`
    <style>
      .itemTab{
      padding: 20px;
      background: #ccc;
      color: #000;
      margin-left:10px;
      border-top: 14px solid #000;
      border-radius:4px;
      float:left;
      width:20%;
      }
      .itemTab:hover{
        background: #000;
        color: #fff;
        transition: 1s ease;
      }
      .active{
        border-top: 14px solid #394;
      }
    </style>
    <ul class="nav">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active" class="itemTab">
        <h3><span class="badge"><h4>{{tab.step}}</h4></span>  <strong>{{tab.title}}</strong></h3>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
})
export class TabsComponent implements AfterContentInit {
 

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  // contentChildren are set
  ngAfterContentInit() {
    console.log('tabs ngAftercontentinit');
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    console.log('activetabs: ' + this.tabs.length);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  selectTab(tab: TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }

}