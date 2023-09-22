import { WithError } from "../../../entities/types";

type dbObject = object;

interface DbInstanceRepository{
  connect(connectionString: string): Promise<dbObject>;
}

export { DbInstanceRepository, dbObject }