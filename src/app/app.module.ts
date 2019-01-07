import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Service } from '../app/services/service';
import { BudgettingPage } from '../pages/budgetting/budgetting';
import { EditPage } from '../pages/edit/edit';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ProductsPage } from '../pages/products/products';

import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BudgettingPage,
    EditPage,
    ItemDetailsPage,
    ProductsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    IonicImageViewerModule,
    Ng2SearchPipeModule,
    ElasticHeaderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BudgettingPage,
    EditPage,
    ItemDetailsPage,
    ProductsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Service,
    AngularFireAuth,
  ]
})
export class AppModule {}
