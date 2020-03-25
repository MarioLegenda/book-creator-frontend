import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SubscriptionRouteResolver {
  private cndUri = environment.composeBookApiBaseUrl();

  private readonly routes = {
    getActiveSubscriptions: `${this.cndUri}/api/v1/stripe/get-active-subscriptions`,
    getStripeSubscription: `${this.cndUri}/api/v1/stripe/get-stripe-subscription`,
    updateSubscriptionStatus: `${this.cndUri}/api/v1/stripe/update-subscription-status`,
  };

  getActiveSubscriptions(): string {
    return this.routes.getActiveSubscriptions;
  }

  getStripeSubscription(): string {
    return this.routes.getStripeSubscription;
  }

  updateSubscriptionStatus(): string {
    return this.routes.updateSubscriptionStatus;
  }
}
