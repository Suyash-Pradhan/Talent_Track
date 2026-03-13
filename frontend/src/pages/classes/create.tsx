import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { CreateView } from '@/components/refine-ui/views/create-view'
import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { classSchema, facultySchema } from '@/lib/schema'
import { Separator } from '@/components/ui/separator'
import { useBack, useList } from '@refinedev/core'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, Form } from 'react-hook-form'
import { useForm } from '@refinedev/react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import UplodeWidget from '@/components/uplode_widget'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Subject, User } from '@/types'


function ClassesCreate() {
    const goBack = useBack()

    const { query: subjectsQueary } = useList<Subject>({
        resource: "subjects",
        pagination: {
            pageSize: 100,
        },
    })
    const { query: teachersQuery } = useList<User>({
        resource: "users",
        filters: [
            { field: "role", operator: "eq", value: "teacher" }
        ],
        pagination: {
            pageSize: 100,
        },
    })
    const teachers = teachersQuery?.data?.data || []
    const teacherLoading = teachersQuery.isLoading

    const subjects = subjectsQueary?.data?.data || []
    const subjectLoading = subjectsQueary.isLoading

    const {
        refineCore: { onFinish },
        ...form
    } = useForm({
        resolver: zodResolver(classSchema),
        defaultValues: {
            status: 'active',
            description: ''
        },
    })
    const { isSubmitting } = form.formState

    async function onSubmit(data: z.infer<typeof classSchema>) {
        try {
            await onFinish(data)
        } catch (error) {
            console.error("Failed to create class:", error)
        }
    }
    const bannerPublicId = form.watch("bannerCldPubId")
    return (
        <div>
            <CreateView className='class-view'>
                <Breadcrumb />
                <h1 className='page-title'>Create a class</h1>
                <div className='intro-row'>
                    <p>Provide the reqired information to add a class </p>
                    <Button onClick={goBack}>Back</Button>
                </div>
                <Separator />
                <div className='my-4 flex items-center'>
                    <Card className='class-form-card'>
                        <CardHeader className='relative z-10'>
                            <CardTitle className='text-2xl pb-0 font-bold'>Fill out the Form</CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className='mt-7'>
                            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-5'>
                                <Controller
                                    name='bannerUrl'
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>
                                                Banner Image
                                                <span className='text-orange-600'>*</span>
                                            </FieldLabel>
                                            <UplodeWidget
                                                value={field.value ? {
                                                    url: field.value,
                                                    publicId: bannerPublicId ?? "",
                                                } : null}
                                                onChange={(file: { url: string; publicId: string } | null) => {
                                                    if (file) {
                                                        field.onChange(file.url);
                                                        form.setValue("bannerCldPubId", file.publicId, {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                    } else {
                                                        field.onChange("");
                                                        form.setValue("bannerCldPubId", "", {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        });
                                                    }
                                                }}
                                            />

                                        </Field>
                                    )}

                                />


                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                Class Name <span className='text-orange-600'>*</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}

                                                aria-invalid={fieldState.invalid}
                                                placeholder="Introdution to Biolagy - Section A"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <Controller
                                        name="subjectId"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Subject
                                                    <span className='text-orange-600'>*</span>
                                                </FieldLabel>
                                                <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString() } >
                                                    <SelectTrigger className='w-full' >
                                                        <SelectValue placeholder="Select subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {subjects.map((subject) => (
                                                            <SelectItem key={subject.id}
                                                                value={subject.id.toString()}
                                                            > {subject.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="teacherId"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Teacher
                                                    <span className='text-orange-600'>*</span>
                                                </FieldLabel>
                                                <Select onValueChange={(value) => field.onChange((value))} value={field.value?.toString() } disabled={teacherLoading}>
                                                    <SelectTrigger className='w-full' >
                                                        <SelectValue placeholder="Select teacher" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {teachers.map((teacher) => (
                                                            <SelectItem key={teacher.id}
                                                                value={teacher.id.toString()}
                                                            > {teacher.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>

                                <div className='grid sm:grid-cols-2 gap-4'>

                                    <Controller
                                        name="capacity"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Capacity <span className='text-orange-600'>*</span>
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    placeholder="30"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        field.onChange(value ? Number(value) : undefined);
                                                    }}
                                                    value={(field.value as number | undefined) ?? ""}
                                                    name={field.name}
                                                    ref={field.ref}
                                                    onBlur={field.onBlur}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="status"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Status
                                                    <span className='text-orange-600'>*</span>
                                                </FieldLabel>
                                                <Select onValueChange={(value) => field.onChange((value))} value={field.value}>
                                                    <SelectTrigger className='w-full' >
                                                        <SelectValue placeholder="Select Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-description">
                                                Description
                                            </FieldLabel>
                                            <InputGroup>
                                                <InputGroupTextarea
                                                    {...field}
                                                    id="form-rhf-demo-description"
                                                    placeholder="Breif description about the class"
                                                    rows={60}
                                                    className="min-h-24 resize-none"
                                                    aria-invalid={fieldState.invalid}
                                                />
                                                <InputGroupAddon align="block-end">
                                                    <InputGroupText className="tabular-nums">
                                                        {field.value.length}/100 characters
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Button type="submit" size="lg" className="w-full">
                                    {isSubmitting ? (
                                        <div className="flex gap-1">
                                            <span>Creating Class...</span>
                                            <Loader2 className="inline-block ml-2 animate-spin" />
                                        </div>
                                    ) : (
                                        "Create Class"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </CreateView >
        </div >
    )
}

export default ClassesCreate


