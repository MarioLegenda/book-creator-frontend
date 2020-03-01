export class Account {
  public readonly type: string;
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly provider: string;
  public readonly confirmed: boolean;
  public readonly shortId: string;
  public readonly uuid: string;
  public readonly profile: any;
  public readonly token: string;

  constructor(
    type: string,
    name: string,
    lastName: string,
    email: string,
    provider: string,
    confirmed: boolean,
    shortId: string,
    uuid: string,
    token: string,
    profile: any,
  ) {
    this.type = type;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.provider = provider;
    this.confirmed = confirmed;
    this.shortId = shortId;
    this.uuid = uuid;
    this.token = token;
    this.profile = profile;
  }
}
