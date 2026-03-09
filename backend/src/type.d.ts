export type Schedule = {
    day: string;
    startTime: string;
    endTime: string;
};
type User = "admin" | "teacher" | "student"
type RateLimitRole = UserRoles | "guest";