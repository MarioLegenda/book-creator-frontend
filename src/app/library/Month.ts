export class Month {
  private static months = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "June", "July",
    "Aug", "Sep", "Oct",
    "Nov", "Dec",
  ];

  static get(idx: number): string {
    return Month.months[idx];
  }
}
