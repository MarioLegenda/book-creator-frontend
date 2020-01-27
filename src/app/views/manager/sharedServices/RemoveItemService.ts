import {RemoveConfirmDialogComponent} from "../modals/removeConfirm/remove-confirm-modal.component";
import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root',
})
export class RemoveItemService {
  constructor(
    private dialog: MatDialog,
  ) {}

  remove(repository, methodName: string, modelCallback, item, event, question: string) {
    const dialog = this.dialog.open(RemoveConfirmDialogComponent, {
      width: '400px',
      data: {
        question: question,
      },
    });

    dialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        repository[methodName](modelCallback.call(item.uuid)).subscribe(() => {
          event.emit(item);
        });
      }
    });
  }
}
