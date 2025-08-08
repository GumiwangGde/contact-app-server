export const getPaginationOptions = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || 'createdAt';
  const order = query.order ? query.order.trim() : 'desc';
  const sortOptions = { [sortBy]: order };

  return { limit, skip, page, sortOptions };
};

export const formatPaginatedResponse = (data, totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      limit,
    },
  };
};