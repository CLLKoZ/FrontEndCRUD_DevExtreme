import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';;
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from '../../Modals/dialog-add-edit/dialog-add-edit.component';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Interfaces/empleado';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from '../../Modals/dialogo-delete/dialogo-delete.component';

@Component({
  templateUrl: 'empleados2.component.html',
  styleUrl: 'empleados.component.css',
})

export class EmpleadosComponent implements AfterViewInit, OnInit {
  remoteDataSource: any;
  displayedColumns: string[] = ["NombreCompleto", "Departamento", "Sueldo", "FechaContrato", "Acciones"]
  dataSource = new MatTableDataSource<Empleado>();

  selectedRowIndex = 1;

  constructor(public dialog: MatDialog, private _empleadoServicio: EmpleadoService, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectionChanged(e: any) {
    this.selectedRowIndex = e.getRowIndexByKey(e.selectedRowKeys[0])
  }

  mostrarEmpleados() {
    this._empleadoServicio.getList().subscribe({
      next:(data) => {
        console.log(data);
        this.dataSource.data = data;
      }, error:(e) => {}
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      duration: 3000
    })
  }


  addRow() {
    this.dialog.open(DialogAddEditComponent, {disableClose:true, width: "500px"}).afterClosed().subscribe(resultado => {
      if(resultado == "creado") {
        this.mostrarEmpleados();
      }
    });
  }

  editRow(dataEmpleado: Empleado) {
    this.dialog.open(DialogAddEditComponent, {disableClose:true, width: "500px", data:dataEmpleado}).afterClosed().subscribe(resultado => {
      if(resultado == "editado") {
        this.mostrarEmpleados();
      }
    });
  }

  deleteRow(dataEmpleado: Empleado) {
    this.dialog.open(DialogoDeleteComponent, {disableClose:true, data:dataEmpleado}).afterClosed().subscribe(resultado => {
      if(resultado == "eliminar") {
        this._empleadoServicio.delete(dataEmpleado.idEmpleado).subscribe({
          next:(data) => {
            this.mostrarAlerta("Empleado fue eliminado", "Listo");
            this.mostrarEmpleados();
          }, error: (e) => {console.log(e);}
        })
      }
    });
  }
}
