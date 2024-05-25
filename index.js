class HashMap {
  constructor(initialCapacity = 16) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    return hashCode;
  }

  // Set key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update value if key exists
        return;
      }
    }
    bucket.push([key, value]); // Add new key-value pair
    this.size++;

    // Check load factor and resize if necessary
    if (this.size / this.buckets.length > 0.75) {
      this.resize(this.buckets.length * 2);
    }
  }

  // Get value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null; // Key not found
  }

  // Check if key exists
  has(key) {
    return this.get(key) !== null;
  }

  // Remove key-value pair by key
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // Remove key-value pair
        this.size--;
        return true;
      }
    }
    return false; // Key not found
  }

  // Get number of stored keys
  length() {
    return this.size;
  }

  // Clear all entries
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  // Get all keys
  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  // Get all values
  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  // Get all entries
  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }

  // Resize buckets when load factor is exceeded
  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value); // Rehash entries into new buckets
      }
    }
  }
}

// Extra Credit: HashSet class
class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  // Add key
  add(key) {
    this.map.set(key, true);
  }

  // Remove key
  remove(key) {
    return this.map.remove(key);
  }

  // Check if key exists
  has(key) {
    return this.map.has(key);
  }

  // Get number of keys
  length() {
    return this.map.length();
  }

  // Clear all keys
  clear() {
    this.map.clear();
  }

  // Get all keys
  keys() {
    return this.map.keys();
  }
}

// Example usage
const hashMap = new HashMap();
hashMap.set('Carlos', 'I am the old value.');
hashMap.set('Carlos', 'I am the new value.');
console.log(hashMap.get('Carlos')); // Output: 'I am the new value.'
console.log(hashMap.has('Carlos')); // Output: true
hashMap.remove('Carlos');
console.log(hashMap.has('Carlos')); // Output: false
console.log(hashMap.length()); // Output: 0
hashMap.set('Key1', 'Value1');
hashMap.set('Key2', 'Value2');
console.log(hashMap.keys()); // Output: ['Key1', 'Key2']
console.log(hashMap.values()); // Output: ['Value1', 'Value2']
console.log(hashMap.entries()); // Output: [['Key1', 'Value1'], ['Key2', 'Value2']]
hashMap.clear();
console.log(hashMap.length()); // Output: 0

const hashSet = new HashSet();
hashSet.add('Key1');
hashSet.add('Key2');
console.log(hashSet.has('Key1')); // Output: true
console.log(hashSet.keys()); // Output: ['Key1', 'Key2']
hashSet.remove('Key1');
console.log(hashSet.has('Key1')); // Output: false
console.log(hashSet.length()); // Output: 1
