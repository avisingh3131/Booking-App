import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
   {path: '', component: LoginComponent},
   {path: 'home', component: NavbarComponent}
  // {path:'approve-list',component:ApproveListComponent},
  // {path:'reject-list',component:RejectListComponent}
];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
