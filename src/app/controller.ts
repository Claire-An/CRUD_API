import { IncomingMessage, ServerResponse } from "http";
import { getUsers, findPosUser, getOneUser, deleteUser, updateUser, addUser, isvalidUser } from "../users";
import { validate as uuidValidate } from "uuid";
import { User } from "../users/type";
import { messageError, StatusCode } from "./constant";
import { showResponse } from "./message";

export const controllerGet = (res: ServerResponse, query: string = '') => {
  try {
    if(query == '') {
      res.writeHead(StatusCode.OK);
      res.end(JSON.stringify(getUsers()));
      return;
    }
    if (!uuidValidate(query)) {
      showResponse(res, StatusCode.BAD_REQUEST, messageError.UserIdInvalid);
      return;
    }
    const pos: number = findPosUser(query);
    if (pos === -1) {
      showResponse(res, StatusCode.NOT_FOUND, messageError.UserNotFound);
      return;
    }
    res.writeHead(StatusCode.OK);
    res.end(JSON.stringify(getOneUser(pos)));
  } catch {
      showResponse(res, StatusCode.SERVER_ERROR, messageError.ServerError);
  }
}

export const controllerPost = (req: IncomingMessage, res: ServerResponse): void => {
      let body = '';
      req.on('data', (chunk) => {
          body += chunk.toString();
      });
      req.on('end', () => {
        try {
            const { username, age, hobbies } = JSON.parse(body);  
            if(!age || !hobbies || !username || 
                typeof age !== "number" || typeof username !== "string" ||
                !Array.isArray(hobbies)) {
            showResponse(res, StatusCode.BAD_REQUEST, messageError.UserInvalid);
            return;
            }
            res.writeHead(StatusCode.POST_OK);
            res.end(JSON.stringify(addUser(body)));
        } catch {
            showResponse(res, StatusCode.SERVER_ERROR, messageError.ServerError);
        }
      });
}
  
export const controllerDelUser = (res: ServerResponse, query: string) => {
  try{
    if(!query) {
      showResponse(res, StatusCode.NOT_FOUND, messageError.UserNotFound);
      return;
    }
    if (!uuidValidate(query)) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserIdInvalid);
        return;
    }
    const pos: number = findPosUser(query);
    if (pos === -1) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserNotFound);
        return
    }
    deleteUser(pos);
    res.writeHead(204);
    res.end(JSON.stringify({code: 204}));
  } catch {
    showResponse(res, StatusCode.SERVER_ERROR, messageError.ServerError);
  }
}

export const controllerPut = (req: IncomingMessage, res: ServerResponse, query: string) => {
  try {
        if(!query) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserIdNotFound);
        return;
    }
    if (!uuidValidate(query)) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserIdInvalid);
        return;
    }
    const pos: number = findPosUser(query);
    if (pos === -1) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserNotFound);
        return;
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    })
    req.on('end', () => {
        const user: User = JSON.parse(body);
        if (isvalidUser(user) === 0) {
        showResponse(res, StatusCode.BAD_REQUEST, messageError.UserInvalid);
        return;
        }
        updateUser(pos, user);
        res.writeHead(StatusCode.OK);
        res.end(JSON.stringify(getOneUser(pos)));
    });
  } catch {
    showResponse(res, StatusCode.SERVER_ERROR, messageError.ServerError);
  }
}
