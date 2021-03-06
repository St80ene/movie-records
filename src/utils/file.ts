import { FindManyOptions, Repository } from 'typeorm';

/* eslint-disable */

const axios = require('axios').default;

export const getGeoCoordinates = async function (ipAddress: any) {
  return axios(`https://ip4.dev/location/${ipAddress}`);
};

export const getIpAddress = async function () {
  return axios(`https://api.ipify.org?format=json`);
};

interface Pagination<Entity = null> {
  data?: Array<any>;
  total?: number;
  limit?: number;
  pageNumber?: number;
  page?: number;
  message?: string;
  repository?: Repository<Entity>;
  query?: FindManyOptions<Entity>;
}

export const paginateResponseData = async <Entity = null>({
  data,
  total,
  limit = 15,
  pageNumber = 1,
  page,
  message = 'Data Retrieved Successfully',
  repository = null,
  query = {},
}: Pagination<Entity>) => {
  if (repository) {
    [data, total] = await repository.findAndCount({
      take: limit,
      skip: page,
      ...query,
    });
  }
  const pageParam = page || pageNumber;
  const lastPage = Math.ceil(total / limit);
  const nextPage = total / limit > pageParam ? pageParam + 1 : null;
  const prevPage = pageParam - 1 < 1 ? null : pageParam - 1;

  return {
    status: true,
    message,
    data,
    total: Number(total),
    limit: Number(limit),
    currentPage: Number(pageParam),
    nextPage: Number(nextPage) || null,
    prevPage: Number(prevPage),
    lastPage: Number(lastPage),
  };
}