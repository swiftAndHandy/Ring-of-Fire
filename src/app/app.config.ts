import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-5d24f","appId":"1:309928989459:web:aa7f13e752f616de81c0e6","storageBucket":"ring-of-fire-5d24f.appspot.com","apiKey":"AIzaSyCT5DWuAWYT4afuF0A7FbMsFGkMhYCVUuM","authDomain":"ring-of-fire-5d24f.firebaseapp.com","messagingSenderId":"309928989459"})), provideFirestore(() => getFirestore())]
};
