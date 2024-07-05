import {ConsoleLogger, Injectable} from '@nestjs/common';
import * as path from "node:path";
import {promises as fsPromises} from "node:fs";
import * as fs from "node:fs";

@Injectable()
export class MyloggerService extends ConsoleLogger {
    async logToFile(message: string, context?: string) {
        const entry = `[${context}]\ ${message}`;
        try {
            await fsPromises.appendFile(path.join(__dirname, 'logs.txt'), entry);
        } catch (e) {
            console.error(e);
        }
    }

    log(message: string, context?: string) {
        const entry = `[${context}]\ ${message}......`;
        this.logToFile(entry)
        super.log(message+' test', context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `[${stackOrContext}]\ ${message}`;
        super.error(message, stackOrContext);
    }
}

