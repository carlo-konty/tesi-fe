export interface MigrationBody {
    table: string;
    schema: string;
    param: number;
    limit: number;
    offset: number;
}