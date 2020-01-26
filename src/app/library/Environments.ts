export class Environments {
  private static environments = {
    'node_v8_17_0': 'Javascript (Node v8.17.0)',
    'node_v10_18_0': 'Javascript (Node v10.18.0)',
    'node_v12_14_1': 'Javascript (Node v12.14.1)',
    'node_latest': 'Javascript (Node latest)',
    'go_v1_13_5': 'Go v1.13.5',
    'python2': 'Python2',
    'python3': 'Python3',
  };

  static get(name: string): string {
    return Environments.environments[name];
  }
}
