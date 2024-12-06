export abstract class Module<Deps> {
  readonly deps: Deps;

  constructor(deps: Deps) {
    this.deps = deps;
  }
}
