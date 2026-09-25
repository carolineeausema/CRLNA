let done = false;
const queue: Array<() => void> = [];

export function markLoaderDone() {
  if (done) return;
  done = true;
  queue.splice(0).forEach((fn) => fn());
}

export function whenLoaderDone(fn: () => void) {
  if (done) fn();
  else queue.push(fn);
}
