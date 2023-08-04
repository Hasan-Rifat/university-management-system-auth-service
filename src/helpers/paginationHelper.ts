type IOptions = {
  page?: number;
  limit?: number;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
};

const calculatePagination = (option: IOptions): IOptionsResult => {
  const page = Number(option.page) || 1;
  const limit = Number(option.limit) || 10;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const paginationHelper = {
  calculatePagination,
};
