import { Readable } from "node:stream";

class OneToHundred extends Readable {

  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 3) {
        this.push(null);
      }
      else {
        this.push(Buffer.from(String(i)));
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundred(),
  duplex: "half"
});