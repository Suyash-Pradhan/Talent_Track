export const DEPARTMENTS = [
    'CS',
    'Math',
    'Physics',
    'Chemistry',
    'Biology',
    'English'
]
export const DEPARTMENTS_OPTIONS = DEPARTMENTS.map((department) => ({
    label: department,
    value: department.toLowerCase()
}))