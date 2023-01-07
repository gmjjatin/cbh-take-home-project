const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Returns a deterministic partition key for the provided event.
 * @param {any} event Event from which to determine the `partitionKey`
 * @returns string of length not greater than MAX_PARTITION_KEY_LENGTH
 */
const deterministicPartitionKey = (event) => {
  let partitionKey;

  if (!event) return TRIVIAL_PARTITION_KEY

  if (event.partitionKey) {
    partitionKey = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    partitionKey = createHash(data);
  }

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = createHash(partitionKey);
  }

  return partitionKey;
};

/**
 * Returns a hash
 * @param {string} key for which to create the hash
 * @returns string 
 */
const createHash = (key) => crypto.createHash("sha3-512").update(key).digest("hex");

exports.deterministicPartitionKey =  deterministicPartitionKey;
exports.createHash =  createHash;
exports.TRIVIAL_PARTITION_KEY =  TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH =  MAX_PARTITION_KEY_LENGTH;