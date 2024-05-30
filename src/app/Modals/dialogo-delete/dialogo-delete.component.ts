import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Empleado } from '../../Interfaces/empleado';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrl: './dialogo-delete.component.scss'
})
export class DialogoDeleteComponent implements OnInit {
  /**
   *
   */
  constructor(private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>, @Inject (MAT_DIALOG_DATA) public dataEmpleado: Empleado) {
    
  }

  ngOnInit(): void {
    
  }

  confirmarEliminar() {
    if(this.dataEmpleado) {
      this.dialogoReferencia.close("eliminar");
    }
  }
}
