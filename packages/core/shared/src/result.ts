export type Result<F, S> = Err<F> | Ok<S>;

export class Err<F> {
  constructor(readonly failure: F) {}
}

export class Ok<S> {
  constructor(readonly success: S) {}
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
