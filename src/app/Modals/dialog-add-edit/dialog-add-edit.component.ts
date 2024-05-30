import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../Interfaces/departamento';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../Services/departamento.service';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Interfaces/empleado';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.scss',
  providers: [
    {provide: MY_DATE_FORMAT, useValue: MY_DATE_FORMAT}
  ]
})
export class DialogAddEditComponent implements OnInit{

  formEmpleado: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaDepartamentos: Departamento[] = [];

  constructor(private dialogoReferencia: MatDialogRef<DialogAddEditComponent>, private fb: FormBuilder, 
    private _snackBar: MatSnackBar, private _departamentoServicio: DepartamentoService, private _empleadoServicio: EmpleadoService,
    @Inject (MAT_DIALOG_DATA) public dataEmpleado: Empleado) {
    
      this.formEmpleado = this.fb.group({
        nombreCompleto: ['', Validators.required],
        idDepartamento: ['', Validators.required],
        sueldo: ['', Validators.required],
        fechaContrato: ['', Validators.required]
      })

      this._departamentoServicio.getList().subscribe({
        next: (data) => {
          this.listaDepartamentos = data;
        }, error: (e) => {}
      })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      duration: 3000
    })
  }

  addEditEmpleado() {

    const modelo: Empleado = {
      idEmpleado: 0,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      idDepartamento: this.formEmpleado.value.idDepartamento,
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: this.formEmpleado.value.fechaContrato
    }

    if(this.dataEmpleado == null) {
      this._empleadoServicio.add(modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Empleado creado", "Listo");
          this.dialogoReferencia.close("creado");
        }, error:(e) => {
          this.mostrarAlerta("Empleado no se pudo crear", "Error");
        }
      })
    } else {
      this._empleadoServicio.update(this.dataEmpleado.idEmpleado, modelo).subscribe({
        next:(data) => {
          this.mostrarAlerta("Empleado editado", "Listo");
          this.dialogoReferencia.close("editado");
        }, error:(e) => {
          this.mostrarAlerta("Empleado no se pudo editar", "Error");
        }
      })
    }
  }

  ngOnInit(): void {
    if(this.dataEmpleado) {
      this.formEmpleado.patchValue({
        nombreCompleto: this.dataEmpleado.nombreCompleto,
        idDepartamento: this.dataEmpleado.idDepartamento,
        sueldo: this.dataEmpleado.sueldo,
        fechaContrato: this.dataEmpleado.fechaContrato,
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
}
