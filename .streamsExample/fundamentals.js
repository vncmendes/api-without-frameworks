import { Readable, Transform, Writable } from "node:stream";

class OneToHundred extends Readable {

  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      }
      else {
        this.push(Buffer.from(String(i)));
      }
    }, 1000);
  }
}

class MultiplyByTen extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * 10));
    callback();
  }
}

class TurnToNegative extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(Number(chunk.toString() * -1));
    callback();
  }
}

new OneToHundred()
  .pipe(new TurnToNegative())
  .pipe(new MultiplyByTen())