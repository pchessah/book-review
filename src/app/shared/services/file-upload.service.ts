import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, PathReference } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(basePath: string, fileUpload: FileUpload): Observable<number | undefined> 
  {
    const filePath = `${basePath}/${fileUpload.file.name}`;

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(basePath, fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  private saveFileData(basePath: string, fileUpload: FileUpload): void {
    this.db.list(basePath).push(fileUpload);
  }

  getFiles(basePath: string) {
    return this.storage.ref(basePath)
  }

  deleteFile(fileUpload: FileUpload, basePath: string): void {
    this.deleteFileDatabase(fileUpload.key, basePath)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, basePath);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string, basePath: PathReference): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  private deleteFileStorage(name: string, basePath: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }
}
