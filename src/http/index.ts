export default class Http<T> {

  private readonly baseURL : string = import.meta.env.VITE_BASE_URL || "http://localhost:3001";
  private readonly path : string;

  constructor(path: string) {
    this.path = path;
  };

  public async get() : Promise<T[] | undefined> {
    try {
      const data = await fetch(this.baseURL + this.path);
      return data.json();
    } catch (err) {
      console.error(err);
    };
  };

};