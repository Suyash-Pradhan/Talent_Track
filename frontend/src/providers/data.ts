import { BACKEND_BASE_URL } from '@/constants';
import { ListResponse } from '@/types';
import { CreateResponse, GetOneResponse } from '@refinedev/core';
import { CreateDataProviderOptions, createDataProvider } from '@refinedev/rest';
import { getEndPoints } from 'recharts/types/cartesian/ReferenceLine';
const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildQueryParams: async ({ pagination, filters, resource }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSieze = pagination?.pageSize ?? 10;
      const params: Record<string, string | number> = { page, limit: pageSieze };

      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';
        const value = String(filter.value);
        if (resource === 'subjects') {
          if (field === 'department') params.department = value
          if (field === 'name' || field === 'code') params.search = value
        }
         if (field === "role") {
          params.role = value;
        }

        if (resource === "departments") {
          if (field === "name" || field === "code") params.search = value;
        }

        if (resource === "users") {
          if (field === "search" || field === "name" || field === "email") {
            params.search = value;
          }
        }

        if (resource === "classes") {
          if (field === "name") params.search = value;
          if (field === "subject") params.subject = value;
          if (field === "teacher") params.teacher = value;
        }
      })
      return params;
    },
    mapResponse: async (response) => {
      if (response.status === 429) {
        const json = await response.json()
        throw new Error((json as { message: string }).message)
      }
      const payload: ListResponse = await response.clone().json();
      return payload.data || [];
    },
    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  },
  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      const json: CreateResponse = await response.json();
      return json.data ?? {};
    },
  },

  getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async (response) => {
      const json: GetOneResponse = await response.json();
      return json.data ?? {};
    },
  },
};
const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);
export { dataProvider }
