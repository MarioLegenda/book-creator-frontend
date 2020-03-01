import Util from "./Util";

export class Environments {
  private environments: any;

  constructor(environments: any[]) {
    const resolved = {};

    for (const env of environments) {
      resolved[env.name] = name;
    }

    this.environments = resolved;
  }

  byName(name: string) {
    if (!Util.hasKey(this.environments, name)) return null;

    return this.environments[name];
  }

  isGoLang(name: string): boolean {
    const env = this.byName(name);

    if (!env) return false;

    return (env.name === name);
  }


}
