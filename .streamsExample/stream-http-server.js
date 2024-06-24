import http from "node:http";
import { Transform } from "node:stream";

class TurnToNegative extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * (-1) * (3));
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }
  console.log(buffers);

  const fullBodyStream = Buffer.concat(buffers).toString();
  console.log(fullBodyStream);
  return res.end(fullBodyStream);
})

server.listen(3334);