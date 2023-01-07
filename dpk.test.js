const { deterministicPartitionKey, createHash, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the 'TRIVIAL_PARTITION_KEY' when given no input", () => {
    const key = deterministicPartitionKey();
    expect(key).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the 'TRIVIAL_PARTITION_KEY' when input is falsy", () => {
    const key1 = deterministicPartitionKey(null);
    const key2 = deterministicPartitionKey(NaN);
    const key3 = deterministicPartitionKey(undefined);
    const key4 = deterministicPartitionKey(false);
    const key5 = deterministicPartitionKey(0);
    const key6 = deterministicPartitionKey(-0);
    const key7 = deterministicPartitionKey(0n);
    const key8 = deterministicPartitionKey('');
    
    expect(key1).toBe(TRIVIAL_PARTITION_KEY);
    expect(key2).toBe(TRIVIAL_PARTITION_KEY);
    expect(key3).toBe(TRIVIAL_PARTITION_KEY);
    expect(key4).toBe(TRIVIAL_PARTITION_KEY);
    expect(key5).toBe(TRIVIAL_PARTITION_KEY);
    expect(key6).toBe(TRIVIAL_PARTITION_KEY);
    expect(key7).toBe(TRIVIAL_PARTITION_KEY);
    expect(key8).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the same 'partitionKey' if present in input object and has length less than 'MAX_PARTITION_KEY_LENGTH'", () => {
    const partitionKey = 'test'
    
    const key1 = deterministicPartitionKey({ partitionKey });
    
    expect(key1).toBe(partitionKey);
  });

  it("Returns the hashed version of 'partitionKey' if present in input object and has length greater than 'MAX_PARTITION_KEY_LENGTH'", () => {
    const partitionKey = 'a'.repeat(MAX_PARTITION_KEY_LENGTH+1)
    const key1 = deterministicPartitionKey({partitionKey});
    
    expect(key1).toBe(createHash(partitionKey));
  });

  it("Returns the hashed version of stringified input if 'partitionKey' not present in input or its value is falsy", () => {
    const key1 = deterministicPartitionKey({partitionKey: false});
    const stringInput1 = JSON.stringify({partitionKey: false});
    
    const key2 = deterministicPartitionKey({partitionKey: 0});
    const stringInput2 = JSON.stringify({partitionKey: 0});

    const key3 = deterministicPartitionKey({});
    const stringInput3 = JSON.stringify({});

    const key4 = deterministicPartitionKey('test');
    const stringInput4 = JSON.stringify('test');

    const key5 = deterministicPartitionKey([]);
    const stringInput5 = JSON.stringify([]);

    expect(key1).toBe(createHash(stringInput1));
    expect(key2).toBe(createHash(stringInput2));
    expect(key3).toBe(createHash(stringInput3));
    expect(key4).toBe(createHash(stringInput4));
    expect(key5).toBe(createHash(stringInput5));
  });

  it("Always returns a string of length not greater than 'MAX_PARTITION_KEY_LENGTH' for any input", () => {
    
    expect(deterministicPartitionKey().length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey(null).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({partitionKey: false}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({partitionKey: 0}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey('test').length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey([]).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH)).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH+1)).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH+1)}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH)}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey({partitionKey:10**10}).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(deterministicPartitionKey(10**10).length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
  });

  it("Always returns same key for same input", () => {
    expect(deterministicPartitionKey()).toBe(deterministicPartitionKey());
    expect(deterministicPartitionKey(null)).toBe(deterministicPartitionKey(null));
    expect(deterministicPartitionKey({partitionKey: false})).toBe(deterministicPartitionKey({partitionKey: false}));
    expect(deterministicPartitionKey({partitionKey: 0})).toBe(deterministicPartitionKey({partitionKey: 0}));
    expect(deterministicPartitionKey({})).toBe(deterministicPartitionKey({}));
    expect(deterministicPartitionKey('test')).toBe(deterministicPartitionKey('test'));
    expect(deterministicPartitionKey([])).toBe(deterministicPartitionKey([]));
    expect(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH))).toBe(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH)));
    expect(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH+1))).toBe(deterministicPartitionKey('a'.repeat(MAX_PARTITION_KEY_LENGTH+1)));
    expect(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH+1)})).toBe(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH+1)}));
    expect(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH)})).toBe(deterministicPartitionKey({partitionKey:'a'.repeat(MAX_PARTITION_KEY_LENGTH)}));
    expect(deterministicPartitionKey({partitionKey:10**10})).toBe(deterministicPartitionKey({partitionKey:10**10}));
    expect(deterministicPartitionKey(10**10)).toBe(deterministicPartitionKey(10**10));
  });
});
