/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';
import type { Lesson } from '../models/Lesson';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Read Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readRootGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Read Courses
     * @param skip
     * @param limit
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static readCoursesCoursesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Course>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Course
     * @param courseId
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static readCourseCoursesCourseIdGet(
        courseId: number,
    ): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/{course_id}',
            path: {
                'course_id': courseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Lessons
     * @param skip
     * @param limit
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static readLessonsLessonsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Lesson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Lesson
     * @param lessonId
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static readLessonLessonsLessonIdGet(
        lessonId: number,
    ): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{lesson_id}',
            path: {
                'lesson_id': lessonId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
