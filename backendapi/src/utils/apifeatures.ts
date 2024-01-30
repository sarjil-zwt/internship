class ApiFeatures {
  private query: any; // Adjust the type accordingly
  private queryStr: any; // Adjust the type accordingly

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): this {
    const keyword = this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(): this {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields: string[] = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage: number): this {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export = ApiFeatures;
