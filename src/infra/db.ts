export class MongoDB<T> {
  static getModel<T>(name: string): MongoDB<T> {
    return new MongoDB<T>();
  }

  private readonly db = new Set<T>();

  async create(data: T) {
    Reflect.set(
      data as Object,
      '_id',
      Math.random().toString(36).substring(2, 9),
    );
    this.db.add(data);
    return data;
  }

  async find() {
    return [...this.db];
  }

  async findOne(query?: Partial<T>) {
    if (query) {
      for (const item of this.db.values()) {
        const find = Object.keys(query).every(
          (key) => Reflect.get(item as Object, key) === Reflect.get(query, key),
        );
        if (find) {
          return item;
        }
      }
    }
    return [...this.db][0];
  }
}
