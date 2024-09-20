import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { TemplecategoryComponent } from './components/templecategory/templecategory.component';
import { TemplesComponent } from './components/temples/temples.component';
import { TemplemainComponent } from './components/templemain/templemain.component';
import { GetbytemplesComponent } from './components/getbytemples/getbytemples.component';
import { GoshalacategoryComponent } from './components/goshalacategory/goshalacategory.component';
import { EventcategoryComponent } from './components/eventcategory/eventcategory.component';
import { GoshalaComponent } from './components/goshala/goshala.component';
import { EventComponent } from './components/event/event.component';
import { IndiatemplesComponent } from './components/indiatemples/indiatemples.component';
import { GlobaltempleComponent } from './components/globaltemple/globaltemple.component';
import { StatetemplesComponent } from './components/statetemples/statetemples.component';
import { DistrictTemplesComponent } from './components/district-temples/district-temples.component';
import { BlocktemplesComponent } from './components/blocktemples/blocktemples.component';
import { VillagetemplesComponent } from './components/villagetemples/villagetemples.component';
import { AddtempleComponent } from './components/addtemple/addtemple.component';
import { AddgoshalaComponent } from './components/addgoshala/addgoshala.component';
import { ConnectyourorginComponent } from './components/connectyourorgin/connectyourorgin.component';
import { GetmemberComponent } from './components/member/getmember/getmember.component';
import { AddmemberComponent } from './components/member/addmember/addmember.component';
import { CountryService } from './services/countryservice/country.service';
import { CountrytemplesComponent } from './components/countrytemples/countrytemples.component';
import { GoshalamainComponent } from './components/goshalamain/goshalamain.component';
import { IndiagoshalasComponent } from './components/indiagoshalas/indiagoshalas.component';
import { StategoshalasComponent } from './components/stategoshalas/stategoshalas.component';
import { DistrictgoshalasComponent } from './components/districtgoshalas/districtgoshalas.component';
import { BlockgoshalasComponent } from './components/blockgoshalas/blockgoshalas.component';
import { EventmainComponent } from './components/eventmain/eventmain.component';
import { IndiaeventsComponent } from './components/indiaevents/indiaevents.component';
import { StateeventsComponent } from './components/stateevents/stateevents.component';
import { DistricteventsComponent } from './components/districtevents/districtevents.component';
import { BlockeventsComponent } from './components/blockevents/blockevents.component';
import { GlobalgoshalasComponent } from './components/globalgoshalas/globalgoshalas.component';
import { GlobaleventsComponent } from './components/globalevents/globalevents.component';
import { CountryeventsComponent } from './components/countryevents/countryevents.component';
import { CountrygoshalasComponent } from './components/countrygoshalas/countrygoshalas.component';
import { DetailviewgoshalaComponent } from './components/detailviewgoshala/detailviewgoshala.component';
import { DetailvieweventComponent } from './components/detailviewevent/detailviewevent.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { AddeventComponent } from './components/addevent/addevent.component';
import { GetbygoshalaComponent } from './components/getbygoshala/getbygoshala.component';
import { AboutsComponent } from './components/abouts/abouts.component';
import { CategorytemplesComponent } from './components/categorytemples/categorytemples.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { PujariComponent } from './components/pujari/pujari.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LoggedinguardGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ConnectionsComponent } from './components/connections/connections/connections.component';
import { TemplechatComponent } from './components/chatroom/templechat/templechat.component';
import { AddvillageComponent } from './components/addvillage/addvillage/addvillage.component';
import { ConnectyourtempleComponent } from './components/connectyourtemple/connectyourtemple/connectyourtemple.component';
import { VisionmissionComponent } from './components/vision/mission/visionmission/visionmission.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { UserService } from './services/userservice/user.service';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: "home",component:HomeComponent},
    {path: "signup",component:SignupComponent},
    {path: "templecategory",component:TemplecategoryComponent},
    { path: 'temples/:id', component: TemplesComponent },
    { path: 'templemain',component: TemplemainComponent},
    { path: 'getbytemples/:id',component: GetbytemplesComponent},
    { path: 'getbygoshala/:id',component:GetbygoshalaComponent},
    { path: 'goshalacatagory',component: GoshalacategoryComponent},
    { path: 'eventcategory',component:EventcategoryComponent},
    // { path: 'goshala/:id',component:GoshalaComponent},
    // { path: 'events/:id', component: EventComponent },
    { path: 'indiatemples',component:IndiatemplesComponent},
    // { path: 'globaltemples/:id',component:GlobaltempleComponent},
    { path: "statetemples",component:StatetemplesComponent},
    { path: "districttemples",component:DistrictTemplesComponent},
    { path: "blocktemples",component:BlocktemplesComponent},
    // { path: "villages/:_id",component:VillagetemplesComponent},
    // { path: "addtemple", component:AddtempleComponent},
    // { path: 'addgoshala',component:AddgoshalaComponent},
    { path: 'connectorgin',component:ConnectyourorginComponent},
    { path:'getmember',component:GetmemberComponent},
    { path: 'addmember',component:AddmemberComponent},
    { path: 'countrytemples',component:CountrytemplesComponent},
    { path: 'goshalamain', component:GoshalamainComponent},
    { path: 'indiagoshalas', component:IndiagoshalasComponent},
    { path: 'stategoshalas',component:StategoshalasComponent},
    { path: 'districtgoshalas', component:DistrictgoshalasComponent},
    { path: 'blockgoshalas', component:BlockgoshalasComponent},
    { path: 'eventsmain', component:EventmainComponent},
    { path: 'IndiaeventsComponent', component:IndiaeventsComponent},
    { path: 'stateEvents', component:StateeventsComponent},
    {path: 'districtevents',component:DistricteventsComponent},
    {path: 'blockevents',component:BlockeventsComponent},
    {path: 'globalgoshalas/:id',component:GlobalgoshalasComponent},
    { path: 'globalevents/:id',component:GlobaleventsComponent},
    {path: 'countryevents',component:CountryeventsComponent},
    { path: 'countrygoshalas',component:CountrygoshalasComponent},
    { path: 'detailviewgoshala',component:DetailviewgoshalaComponent},
    {path: 'detailviewevent/:id',component:DetailvieweventComponent},
    {path: 'tree',component:TreeViewComponent},
    // { path: 'addevent',component:AddeventComponent},
    {path: "aboutus",component:AboutsComponent},
    {path: "categorytemples/:id",component:CategorytemplesComponent},
    {path:"chatroom/:id",component:ChatroomComponent},
    {path: 'addpujari',component:PujariComponent},
    {path: 'verify',component:VerifyComponent},
    // {path: 'profile',component:ProfileComponent},
    {path: 'connections',component:ConnectionsComponent},
    {path: 'templechat/:id',component:TemplechatComponent},
    {path: 'addvillage',component:AddvillageComponent},
    {path:'connectyourtemple',component:ConnectyourtempleComponent},
    {path: 'vision/mision',component:VisionmissionComponent},
    {path: 'updateprofile',component:UpdateprofileComponent},
    


    {
        path: 'addtemple',
        component: AddtempleComponent,
        canActivate: [LoggedinguardGuard],
      },


      {
        path: 'addgoshala',
        component: AddgoshalaComponent,
        canActivate: [LoggedinguardGuard],
      },

      {
        path: 'addevent',
        component: AddeventComponent,
        canActivate: [LoggedinguardGuard],
      },

      {
        path: 'globaltemples/:id',
        component: GlobaltempleComponent,
        canActivate: [LoggedinguardGuard],
      },

      {
        path: 'goshala/:id',
        component: GoshalaComponent,
        canActivate: [LoggedinguardGuard],
      },


      {
        path: 'events/:id',
        component: EventComponent,
        canActivate: [LoggedinguardGuard],
      },

      {
        path: 'villages/:_id',
        component: VillagetemplesComponent,
        canActivate: [LoggedinguardGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [UserService],
      },


      ];
