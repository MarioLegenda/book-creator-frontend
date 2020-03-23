import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionRepository} from "../../../../repository/SubscriptionRepository";
import {HttpModel} from "../../../../model/http/HttpModel";

@Component({
  selector: 'cms-subscription-item',
  styleUrls: [
    './subscription-item.component.scss',
  ],
  templateUrl: './subscription-item.component.html',
})
export class SubscriptionItem implements OnInit{
  @Input('subscriptionId') subscriptionId: string;
  @Input('subscriptionMetadata') subscriptionMetadata: any;

  subscription = null;
  selected: boolean = false;

  constructor(
    private subscriptionRepository: SubscriptionRepository
  ) {}

  ngOnInit() {
  }

  onSelectEntry() {
    this.selected = !this.selected;

    if (this.subscription) return;

    const model = HttpModel.getStripeSubscription(this.subscriptionId);

    this.subscriptionRepository.getStripeSubscription(model).subscribe((subscription) => {
      this.subscription = subscription;
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
}
