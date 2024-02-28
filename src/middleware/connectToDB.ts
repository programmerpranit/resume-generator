import type _mongoose from "mongoose";
import { connect } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

let cached = global.mongoose;

if (cached == null) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB(): Promise<typeof _mongoose | null> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (MONGODB_URI == null) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }
  if (cached.conn != null) {
    return cached.conn;
  }

  if (cached.promise == null) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDB;
