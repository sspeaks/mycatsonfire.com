import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import moment = require("moment");

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const name = (req.body && req.body.name);
    const message = (req.body && req.body.message);
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');

    if (name && message && date) {
        context.bindings.outputTable.push({
            PartitionKey: "comments",
            RowKey: new Date().valueOf(),
            name, message, date
        })
    }
    context.done();
};

export default httpTrigger;