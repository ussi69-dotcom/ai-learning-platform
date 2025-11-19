/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreate } from '../models/CourseCreate';
import type { CourseResponse } from '../models/CourseResponse';
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
     * Create Course
     * @param requestBody
     * @returns CourseResponse Successful Response
     * @throws ApiError
     */
    public static createCourseCoursesPost(
        requestBody: CourseCreate,
    ): CancelablePromise<CourseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/courses/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Courses
     * @param skip
     * @param limit
     * @returns CourseResponse Successful Response
     * @throws ApiError
     */
    public static readCoursesCoursesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<CourseResponse>> {
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
}
