import { BACKEND_BASE_URL } from '@/constants';
import { ListResponse } from '@/types';
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
      })
      return params;
    },
    mapResponse: async (response) => {
      const playload: ListResponse = await response.json();
      return playload.data || [];
    },
    getTotalCount: async (response) => {
      const playload: ListResponse = await response.json();
      return playload.pagination?.total ?? playload.data?.length ?? 0;
    }
  }
}
const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);
export { dataProvider }
