// Define the type for the first array's objects (table metadata)
export interface TableMetadata {
  Name: string;
  Owner: string;
  Type: string;
  Created_datetime: string; // This is a date-time string, often handled as string in TS
}

// Define the type for the second array's objects (column metadata)
export interface ColumnMetadata {
  Column_name: string;
  Type: string;
  Computed: string;
  Length: number;
  Prec: string;
  Scale: string;
  Nullable: string;
  TrimTrailingBlanks: string;
  FixedLenNullInSource: string;
  Collation: string | null; // Collation can be null
}

// Define the type for the third array's objects (identity information)
export interface IdentityInfo {
  Identity: string;
  Seed: number;
  Increment: number;
  "Not For Replication": number; // Use string literal for property name with spaces
}

// Define the type for the fourth array's objects (RowGuidCol information)
export interface RowGuidColInfo {
  RowGuidCol: string;
}

// Define the type for the fifth array's objects (filegroup information)
export interface FileGroupInfo {
  Data_located_on_filegroup: string;
}

// Define the type for the sixth array's objects (index information)
export interface IndexInfo {
  index_name: string;
  index_description: string;
  index_keys: string;
}

// Define the type for the seventh array's objects (constraint information)
export interface ConstraintInfo {
  constraint_type: string;
  constraint_name: string;
  delete_action: string;
  update_action: string;
  status_enabled: string;
  status_for_replication: string;
  constraint_keys: string;
}

// Define the main type for the entire JSON structure
// This is a tuple type representing the array of arrays, where each element
// corresponds to one of the interfaces defined above.
export type TableSchema = [
  TableMetadata[],
  ColumnMetadata[],
  IdentityInfo[],
  RowGuidColInfo[],
  FileGroupInfo[],
  IndexInfo[],
  ConstraintInfo[]
];
