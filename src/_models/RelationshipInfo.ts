export interface RelationshipInfo {

    fkConstraintName: string;
    fkTableName: string;
    fkColumnName: string;
    referencedConstraintSchema: string;
    referencedConstraintName: string;
    referencedTableSchema: string;
    referencedTableName: string;
    referencedColumnName: string;
    
}