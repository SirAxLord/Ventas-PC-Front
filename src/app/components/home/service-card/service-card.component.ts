import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Service, ServiceService } from '../../../services/service.service'; 
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../../services/auth.service'; 
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../dialogs/confirm-dialog.component'; 

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatIconModule,
    MatButtonModule,
    MatDialogModule, 
    MatSnackBarModule 
  ],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service!: Service;
  @Output() serviceDeleted = new EventEmitter<string>(); 

  constructor(
    private router: Router,
    public authService: AuthService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serviceService: ServiceService 
  ) {}

  viewServiceDetails(): void {
    if (this.service && this.service._id) {
      this.router.navigate(['/servicio', this.service._id]); 
    }
  }



  openDeleteServiceConfirmDialog(event: MouseEvent): void {
    event.stopPropagation(); // Si la tarjeta entera fuera clickeable
    
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData>(ConfirmDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que quieres eliminar el servicio "${this.service.title}"?\nEsta acción no se puede deshacer.`,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'No, Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.executeDeleteService();
      }
    });
  }

  private executeDeleteService(): void {
    if (!this.service || !this.service._id) return;

    this.serviceService.deleteService(this.service._id).subscribe({
      next: () => {
        this.snackBar.open(`Servicio "${this.service.title}" eliminado correctamente.`, 'Cerrar', { duration: 3000 });
        this.serviceDeleted.emit(this.service._id);
      },
      error: (err) => {
        console.error('Error al eliminar servicio:', err);
        let errorMessage = `Error al eliminar "${this.service.title}".`;
        if (err && err.error && err.error.msg) {
          errorMessage = err.error.msg;
        } else if (err.status === 403) {
            errorMessage = "No tienes permiso para eliminar este servicio."
        }
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 4000 });
      }
    });
  }
}