
import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view.tsx'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subject } from '@/types'
import { SelectValue } from '@radix-ui/react-select'
import { useTable } from '@refinedev/react-table'

import { ColumnDef } from '@tanstack/react-table'
import { Filter, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'



function CreateList() {
  const [searcQuery, setSearchQuery] = useState('')
  const [SelectedDepartment, setSelectedDepartment] = useState('all')
  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 100,
        header: () => <p className='column-title ml-2'>code</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 200,
        header: () => <p className='column-title '>name</p>,
        cell: ({ getValue }) => <span className='text-foreground'>{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
      {
        id: 'department',
        accessorKey: 'department.name',
        size: 150,
        header: () => <p className='column-title '>department</p>,
        cell: ({ getValue }) => <Badge variant='secondary'>{getValue<string>()}</Badge>,

      },
      {
        id: 'description',
        accessorKey: 'description',
        size: 300,
        header: () => <p className='column-title '>description</p>,
        cell: ({ getValue }) => <span className='truncate line-clamp-2'>{getValue<string>()}</span>,

      },

    ], []),
    refineCoreProps: {
      pagination: {
        pageSize: 10, mode: 'server'
      },
      resource: 'subjects',
      filters: {},
      sorters: {}
    }
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className='page-title'>Subject</h1>
      <div className='actions-row'>
        <div className='search-field'>
          <Search className='search-icon' />
          <Input
            placeholder='Enter'
            className='pl-10 w-full'
            value={searcQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className='flex'>
          <Select
            value={SelectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger >
              <SelectValue placeholder='Select Department' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Departments</SelectItem>
              {
                DEPARTMENT_OPTIONS.map((dept) => (
                  <SelectItem
                    key={dept.value}
                    value={dept.value}>
                    {dept.label}
                  </SelectItem>

                ))
              }
            </SelectContent>
          </Select>
          <CreateButton />
        </div>
      </div>
      <DataTable table={subjectTable} />
    </ListView>

  )
}

export default CreateList
