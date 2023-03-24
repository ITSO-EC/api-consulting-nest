import * as mongoose from 'mongoose';

export interface PaginationResult<T> {
    data: T[];
    total: number;
    limit: number;
    page: number;
    totalPages: number;
    prevPage?: number;
    nextPage?: number;
}

export interface PaginationQueryDto {
    page?: number;
    limit?: number;
    filter?: string;
    sort?: string;
    populate?: string;
}

interface IPaginateModel<T extends mongoose.Document> extends mongoose.PaginateModel<T> { }

export async function paginate<T extends mongoose.Document>(
    model: IPaginateModel<T>,
    paginationQueryDto: PaginationQueryDto
): Promise<PaginationResult<T>> {
    const { page = 1, limit = 10, filter = '{}', sort = '{}', populate } = paginationQueryDto;

    const filterObj = JSON.parse(filter);
    const sortObj = JSON.parse(sort);

    if (filterObj.name) {
        const regex = new RegExp(filterObj.name, 'i');
        filterObj.name = { $regex: regex };
    }

    if (filterObj.title) {
        const regex = new RegExp(filterObj.title, 'i');
        filterObj.title = { $regex: regex };
    }

    const options = { page, limit, sort: sortObj, populate };

    const result = await model.paginate(filterObj, options);

    return {
        data: result.docs,
        total: result.totalDocs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage
    };
}
