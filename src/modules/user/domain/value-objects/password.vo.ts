import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Password {
    private readonly _value: string;

    constructor(value: string) {
        if (!this.validate(value)) {
            throw new HttpException(
                'Invalid password, must be more than 8 characters',
                HttpStatus.BAD_REQUEST
            );
        }
        this._value = value;
    }

    private validate(value: string): boolean {
        return value.length >= 8;
    }

    public async getValue(): Promise<string> {
        return this.hash();
    }

    public async hash(): Promise<string> {
        return bcrypt.hash(this._value, 10);
    }

    public async compare(password: string): Promise<boolean> {
        return await bcrypt.compare(this._value, password);
    }
}