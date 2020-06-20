import {Component, Input} from '@angular/core';
import {SubscriptionRepository} from "../../../../repository/SubscriptionRepository";
import {HttpModel} from "../../../../model/http/HttpModel";
import {UnsubscribeDialog} from "../../modals/unsubscribeDialog/unsubscribe-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SubscriptionState} from "../../../../library/SubscriptionState";

@Component({
  selector: 'cms-subscription-item',
  styleUrls: [
    './subscription-item.component.scss',
  ],
  templateUrl: './subscription-item.component.html',
})
export class SubscriptionItem {
  @Input('subscriptionMetadata') subscriptionMetadata: any;

  status: string = null;
  subscription = null;
  selected: boolean = false;
  requestInFlight: boolean = false;
  statusText: string = '';
  statusClass: string = '';
  statusButtonClass: string = '';

  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.status = this.subscriptionMetadata.status;
    this.parseStatusText();
    this.parseStatusClass();
    this.parseStatusButtonClass();
  }

  onSelectEntry() {
    if (this.requestInFlight) return;

    this.selected = !this.selected;

    if (this.subscription) return;

    this.requestInFlight = true;

    const model = HttpModel.getStripeSubscription(this.subscriptionMetadata.subscriptionId);

    this.subscriptionRepository.getStripeSubscription(model).subscribe((subscription) => {
      this.subscription = subscription;

      this.requestInFlight = false;
    });
  }

  onUnsubscribe() {
    if (this.requestInFlight) return;

    const dialogRef = this.dialog.open(UnsubscribeDialog, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;

      this.requestInFlight = true;

      const model = HttpModel.updateSubscriptionStatus(
        this.subscriptionMetadata.uuid,
        SubscriptionState.PENDING_UNSUBSCRIPTION,
      );

      this.subscriptionRepository.updateSubscriptionStatus(model).subscribe(() => {
        this.status = SubscriptionState.PENDING_UNSUBSCRIPTION;

        this.parseStatusClass();
        this.parseStatusText();

        this.requestInFlight = false;
      });
    });
  }

  onReactivate() {
    if (this.requestInFlight) return;

    this.requestInFlight = true;

    const model = HttpModel.updateSubscriptionStatus(
      this.subscriptionMetadata.uuid,
      SubscriptionState.ACTIVE,
    );

    this.subscriptionRepository.updateSubscriptionStatus(model).subscribe(() => {
      this.status = SubscriptionState.ACTIVE;

      this.parseStatusClass();
      this.parseStatusText();

      this.requestInFlight = false;
    });
  }

  parseDuration(interval: string): string {
    if (interval === 'month') return 'monthly';
    if (interval === 'year') return 'annually';

    return '';
  }

  parseCost(cost: number): number {
    return cost / 100;
  }

  parseCurrency(currency: string): string {
    return currency.toUpperCase();
  }

  parseStatusText(): void {
    if (this.status === SubscriptionState.ACTIVE) {
      this.statusText = 'active';
    }

    if (this.status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      this.statusText = 'unsubscribed but active'
    }
  }

  parseStatusClass(): void {
    if (this.status === SubscriptionState.ACTIVE) {
      this.statusClass = 'active-status';
    }

    if (this.status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      this.statusClass = 'pending-status'
    }
  }

  parseStatusButtonClass(): void {
    if (this.status === SubscriptionState.PENDING_UNSUBSCRIPTION) {
      this.statusButtonClass = 'reactivate-button';
    }
  }
}
