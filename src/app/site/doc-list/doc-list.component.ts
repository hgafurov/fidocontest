import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDoc } from 'src/app/interfaces/i.doc';
import { DocService } from 'src/app/services/doc.service';
import { DocDelDialogComponent } from '../doc-del-dialog/doc-del-dialog.component';
import { DocEditComponent } from '../doc-edit/doc-edit.component';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocListComponent implements OnInit {
  
  displayedColumns: string[] = ['id','regNo', 'regDate', 'outDocNo', 'outDocDate', 'tema', 'formaDostav','correspondent', 'srokIspol'];
  dataSource: MatTableDataSource<IDoc>;
  expandedElement: IDoc | null;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator;  

  constructor(public dialog: MatDialog,
              private docService: DocService) { }

  ngOnInit(): void {
    this.getDocs();    
  }
  
  ngAfterViewInit(): void {
  }

  getDocs(): void {
    this.docService.getDocs().subscribe(
      docs => {
        console.log(docs);
        this.dataSource = new MatTableDataSource(docs);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DocEditComponent, {data: {
      docId: id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getDocs();
    });
  }
  
  openDelDialog(id: number): void {
    const dialogRef = this.dialog.open(DocDelDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        this.deleteDoc(id);
        this.getDocs();
      }
    });
  }

  deleteDoc(id: number): void {
    this.docService.deleteDoc(id).subscribe(
      res => {
        console.log(res);
      }
    );
  }
}
