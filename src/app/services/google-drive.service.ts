import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { gapi } from 'gapi-script';


@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private CLIENT_ID = "845313346691-8s96unh52t7vq96jfpf0os8b8q37c9qr.apps.googleusercontent.com";
  private API_KEY = "AIzaSyBAjqEjqJQZFUodaZcImYzKmg3gpq-V49w";
  private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  private SCOPES = 'https://www.googleapis.com/auth/drive.file';
  http = inject(HttpClient);

  private authSubject = new BehaviorSubject<boolean>(false);
  constructor() { 
    gapi.load('client:auth2', this.initClient.bind(this))
  }
  private initClient() {
    gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
    }).then(() => {
        this.authSubject.next(gapi.auth2.getAuthInstance().isSignedIn.get());
        gapi.auth2.getAuthInstance().isSignedIn.listen((status: boolean) => this.authSubject.next(status));
    });
}


  signIn() {
    return gapi.auth2.getAuthInstance().signIn();
  }

  signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

  async uploadFile(file: File): Promise<string> {
    const metadata = {
        name: file.name,
        mimeType: file.type
    };

    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    // Capturando a resposta usando 'const response'
    const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`, {
      method: 'POST',
      headers: new Headers({ 'Authorization': `Bearer ${accessToken}` }),
      body: form
    });

    const fileData = await response.json(); // Extrai o JSON da resposta
    return `https://drive.google.com/file/d/${fileData.id}/view`; // Retorna o link da imagem
}
}