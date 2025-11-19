/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DifficultyLevel } from './DifficultyLevel';
import type { LessonResponse } from './LessonResponse';
export type CourseResponse = {
    title: string;
    slug: string;
    description?: (string | null);
    difficulty: DifficultyLevel;
    is_published?: boolean;
    id: number;
    lessons?: Array<LessonResponse>;
};

