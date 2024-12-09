export type Result<F, S> = Err<F> | Ok<S>;

export class Err<F> {
  readonly failure;

  constructor(failure: F) {
    this.failure = failure;
  }
}

export class Ok<S> {
  readonly success;

  constructor(success: S) {
    this.success = success;
  }
}

function err<const F>(failure: F): Result<F, never> {
  return new Err(failure);
}

function isErr<F, S>(result: Result<F, S>): result is Err<F> {
  return result instanceof Err;
}

function isOk<F, S>(result: Result<F, S>): result is Ok<S> {
  return result instanceof Ok;
}

function ok<const S>(success: S): Result<never, S> {
  return new Ok(success);
}

export const Result = {
  err,
  isErr,
  isOk,
  ok,
};
