import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "../app.component";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule, // Módulo necesario para ejecutar la aplicación en un navegador
    AppComponent,
    HttpClientModule // Módulo que permite hacer solicitudes HTTP
  ],
  declarations: [],
  providers: [provideHttpClient()], // Provee el cliente HTTP para la inyección de dependencias
  bootstrap: []
})
export class AppModule {} // Exporta la clase AppModule para que pueda ser utilizada en otros módulos o componentes
