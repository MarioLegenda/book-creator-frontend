import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SubscriptionRouteResolver} from "./routeResolvers/SubscriptionRouteResolver";
import {reduce} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class SubscriptionRepository {
  constructor(
    private httpClient: HttpClient,
    private subscriptionRouteResolver: SubscriptionRouteResolver,
  ) {}

  getActiveSubscriptions(model: any) {
    return this.httpClient.post(this.subscriptionRouteResolver.getActiveSubscriptions(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }

  getStripeSubscription(model: any) {
    return this.httpClient.post(this.subscriptionRouteResolver.getStripeSubscription(), model)
      .pipe(
        reduce((acc, res: any) => {
          return res.data;
        }, {}),
      );
  }
}
