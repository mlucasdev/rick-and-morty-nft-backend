import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { findByIdUserService } from "../users/users.service.js";

dotenv.config();

const authLoginMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "O token não foi informado! " });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token inválido" });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token mal formatado!" });
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (!decoded) {
      return res.status(400).send({ message: "Token inválido" });
    }
    const user = await findByIdUserService(decoded.id);
    if (err || !user || !user.id) {
      return res.status(401).send({ message: "Token inválido!" });
    }
    req.userID = user.id;

    return next();
  });
};

const authVerifyUserAdminMiddleware = async (req, res, next) => {
  try {
    const user = await findByIdUserService(req.userID);
    if (!user.admin) {
      return res.status(401).send({ message: "Sem permissão!" });
    }
    return next();
  } catch (err) {
    res.status(500).send({
      message: "Ops, tivemos um pequeno problema. Tente novamente mais tarde.",
    });
    console.log(err.message);
  }
};

export { authLoginMiddleware, authVerifyUserAdminMiddleware };
