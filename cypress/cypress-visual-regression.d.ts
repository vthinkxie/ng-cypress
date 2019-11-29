// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  // tslint:disable-next-line:class-name
  interface cy extends Chainable<undefined> {
    compareSnapshot: (name: string, errorThreshold: number) => void;
  }
}
