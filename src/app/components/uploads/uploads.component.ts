import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FileUpload } from 'src/app/shared/models/file-upload.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit, OnChanges {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads?: any[] = [];

  @Input() basePath!: string;
  @Output() uploadFilesUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {   }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['basePath'].currentValue) {
      this.basePath = changes['basePath'].currentValue;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) 
    {
      for (var i = 0; i < this.selectedFiles.length; i++) 
      {
        const file: File | null = this.selectedFiles.item(i);

        if (file) 
        {
          this.currentFileUpload = new FileUpload(file);

          this.uploadService.pushFileToStorage(this.basePath, this.currentFileUpload)
                            .subscribe((percentage) => {
                                                        this.percentage = Math.round(percentage ? percentage : 0);
                                                        this.percentage == 100 ? this.uploadFilesUpdated.emit(this.currentFileUpload): null
                                                        return this.percentage = Math.round(percentage ? percentage : 0);
                                                        }); 
        }
      }
    }
    this.selectedFiles = undefined;
  }
}
