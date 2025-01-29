import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { AppModule } from './app/app.module';
import { ServerModule } from '@angular/platform-server';
import { NgModule } from '@angular/core';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;


@NgModule({
    imports: [
      AppModule,
      ServerModule,
    ],
    bootstrap: [AppComponent],
  })
  export class AppServerModule {}