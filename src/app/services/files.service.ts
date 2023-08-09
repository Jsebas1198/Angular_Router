import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { API_URL } from '../constants';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = `${API_URL}/files`;

  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      //Algunos backedns necesitan que se envie con este header
      // headers: {
      //   'Content-type': "multipart/form-data"
      // }
    });
  }
}
