import {PositionChangeModalComponent} from "../modals/changePosition/position-change-modal.component";

export function _switchPositionFlow() {
  const dialogRef = this.dialog.open(PositionChangeModalComponent, {
    width: '70%',
    data: {
      maxPosition: this.positionMap.getMax(),
      currentPosition: this.component.position,
    },
  });

  dialogRef.afterClosed().subscribe((position) => {
    if (!position) return;

    const event = {
      nextPosition: parseInt(position.position),
      // @ts-ignore
      currentPosition: parseInt(this.component.position),
      uuid: this.component.blockUuid,
    };

    this.positionChangeObserver.emit(event);
  });
}
