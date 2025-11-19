/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DifficultyLevel } from './DifficultyLevel';
export type CourseCreate = {
    title: string;
    slug: string;
    description?: (string | null);
    difficulty: DifficultyLevel;
    is_published?: boolean;
};

