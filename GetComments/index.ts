import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const rows: Row[] = context.bindings.inputTable ?? [];
    rows.sort((a, b) => a.RowKey > b.RowKey ? 1 : -1)
    const messages: Message[] = rows.map(({ message, date, name }) => ({ message, name, date }));

    context.res = {
        messages
    };

    interface Message {
        name: string;
        date: string;
        message: string;
    }
    interface Row extends Message {
        RowKey: number;
    }
    export default httpTrigger;