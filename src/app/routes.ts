import { IncomingMessage, ServerResponse } from "http";
import { StatusCode, messageError } from "./constant";
import { controllerGet, controllerDelUser, controllerPut, controllerPost } from "./controller";
import { showResponse } from "./message";

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const urlArr = req.url?.split('/').filter(Boolean) as string[];
    if (urlArr[0] !== 'api' || urlArr[1] !== 'users' || urlArr[3]) {
      showResponse(res, StatusCode.NOT_FOUND, messageError.ResourceNotFound);
      return;
    }
    switch (req.method) {
      case 'GET':
        if (!urlArr[2]) controllerGet(res);
        else controllerGet(res, urlArr[2]);
        break;
      case 'POST':
        if (urlArr[2]) showResponse(res, StatusCode.NOT_FOUND, messageError.ResourceNotFound);
        else controllerPost(req, res);
        break;
      case 'PUT':
        if (!urlArr[2]) showResponse(res, StatusCode.NOT_FOUND, messageError.ResourceNotFound);
        else controllerPut(req, res, urlArr[2]);
        break;
      case 'DELETE':
        if (!urlArr[2]) showResponse(res, StatusCode.NOT_FOUND, messageError.ResourceNotFound);
        else controllerDelUser(res, urlArr[2]);
        break;
      default:
        showResponse(res, StatusCode.NOT_FOUND, messageError.ResourceNotFound);
    }
  } catch {
    showResponse(res, StatusCode.SERVER_ERROR, messageError.ServerError);
  }
}
