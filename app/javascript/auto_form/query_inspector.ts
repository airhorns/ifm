import * as _ from "lodash";
import { DocumentNode, OperationDefinitionNode, FieldNode } from "graphql";

export class QueryInspector {
  public queryDocument: DocumentNode;

  constructor(queryDocument: DocumentNode) {
    this.queryDocument = queryDocument;
  }

  public rootFieldName() {
    const definitions = _.filter(
      this.queryDocument.definitions,
      (definition): definition is OperationDefinitionNode => definition.kind === "OperationDefinition",
    );

    if (definitions.length === 0) { throw new Error("couldn't get root name, no definitions in gql document"); }
    if (definitions[0].selectionSet.selections.length === 0) { throw new Error("couldn't get root name, no selected fields in gql document");  }

    const fields = _.filter(
      definitions[0].selectionSet.selections,
      (selection): selection is FieldNode => selection.kind === "Field",
    );
    if (fields.length === 0) { throw new Error("couldn't get root name, no fields in selection in gql document");  }
    return fields[0].name.value;
  }
}
