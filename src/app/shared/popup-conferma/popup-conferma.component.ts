import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'gc-popup-conferma',
  templateUrl: './popup-conferma.component.html',
  styleUrls: ['./popup-conferma.component.scss'],
  imports: [ModalDirective],
})
export class PopupConfermaComponent {
  @Input() titolo!: string;
  @Input() btnConferma!: string;
  @Input() btnAnnulla!: string;
  @Output() conferma: EventEmitter<void> = new EventEmitter();
  @Output() annulla: EventEmitter<void> = new EventEmitter();

  @ViewChild('modal', { static: true })
  private modal!: ModalDirective;

  apriModale() {
    this.modal.show();
  }

  chiudiModale() {
    this.modal.hide();
  }
}
