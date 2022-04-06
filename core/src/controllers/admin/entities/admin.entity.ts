import { Exclude, Expose } from 'class-transformer';

export class AdminEntity {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    password: string;

    constructor(partial: Partial<AdminEntity>) {
        Object.assign(this, partial);
    }
}