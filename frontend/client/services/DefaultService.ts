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
     * @param lang
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static readCoursesCoursesGet(
        skip?: number,
        limit: number = 100,
        lang: string = 'en',
    ): CancelablePromise<Array<Course>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/',
            query: {
                'skip': skip,
                'limit': limit,
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Course
     * @param courseId
     * @param lang
     * @returns Course Successful Response
     * @throws ApiError
     */
    public static readCourseCoursesCourseIdGet(
        courseId: number,
        lang: string = 'en',
    ): CancelablePromise<Course> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/courses/{course_id}',
            path: {
                'course_id': courseId,
            },
            query: {
                'lang': lang,
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
     * @param lang
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static readLessonsLessonsGet(
        skip?: number,
        limit: number = 100,
        lang: string = 'en',
    ): CancelablePromise<Array<Lesson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/',
            query: {
                'skip': skip,
                'limit': limit,
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Lesson
     * @param lessonId
     * @param lang
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static readLessonLessonsLessonIdGet(
        lessonId: number,
        lang: string = 'en',
    ): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/lessons/{lesson_id}',
            path: {
                'lesson_id': lessonId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
