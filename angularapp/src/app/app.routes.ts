import { Routes } from '@angular/router';
import { AuthguardGuard } from './components/authguard/authguard.guard';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CreatefeedComponent } from './components/createfeed/createfeed.component';
import { CreatelivestockComponent } from './components/createlivestock/createlivestock.component';
import { ViewlivestockComponent } from './components/viewlivestock/viewlivestock.component';
import { CreatemedicineComponent } from './components/createmedicine/createmedicine.component';
import { OwnereditlivestockComponent } from './components/ownereditlivestock/ownereditlivestock.component';
import { OwnerviewfeedComponent } from './components/ownerviewfeed/ownerviewfeed.component';
import { OwnerviewmedicineComponent } from './components/ownerviewmedicine/ownerviewmedicine.component';
import { OwnerviewrequestComponent } from './components/ownerviewrequest/ownerviewrequest.component';
import { RequestformComponent } from './components/requestform/requestform.component';
import { SuppliereditfeedComponent } from './components/suppliereditfeed/suppliereditfeed.component';
import { SuppliereditmedicineComponent } from './components/suppliereditmedicine/suppliereditmedicine.component';
import { SupplierrequestsComponent } from './components/supplierrequests/supplierrequests.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ViewfeedComponent } from './components/viewfeed/viewfeed.component';
import { ViewmedicineComponent } from './components/viewmedicine/viewmedicine.component';

export const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'createlivestock',
    component: CreatelivestockComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  { path: 'viewlivestock', component: ViewlivestockComponent },
  {
    path: 'adminviewfeedback',
    component: AdminviewfeedbackComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  {
    path: 'createfeed',
    component: CreatefeedComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  {
    path: 'createmedicine',
    component: CreatemedicineComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  {
    path: 'ownereditlivestock/:id',
    component: OwnereditlivestockComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'ownerviewfeed',
    component: OwnerviewfeedComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'ownerviewmedicine',
    component: OwnerviewmedicineComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'suppliereditfeed/:id',
    component: SuppliereditfeedComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  {
    path: 'useraddfeedback',
    component: UseraddfeedbackComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'userviewfeedback',
    component: UserviewfeedbackComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  { path: 'viewfeed', component: ViewfeedComponent },
  { path: 'viewmedicine', component: ViewmedicineComponent },
  {
    path: 'suppliereditmedicine/:id',
    component: SuppliereditmedicineComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  {
    path: 'ownerviewrequest',
    component: OwnerviewrequestComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'requestform/:type/:id',
    component: RequestformComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Owner' },
  },
  {
    path: 'supplierrequests',
    component: SupplierrequestsComponent,
    canActivate: [AuthguardGuard],
    data: { role: 'Supplier' },
  },
  { path: '**', pathMatch: 'full', redirectTo: 'error' },
];
