// import * as jwt from "jsonwebtoken";
// import { prisma } from "@/src/config/prisma";
// import { NextFunction, Request, Response } from "express";

// const protect =async (req:Request, res:Response, next:NextFunction) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token

//       const secret = process.env.JWT_SECRET as string
//       const decoded = jwt.verify(token,secret );

//       // Get user from the token

//       if(typeof decoded ! == 'string') return;
//       req.user = await prisma.user.findFirst({
//         where: {
//           id: decoded.,
//         },
//       });

//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error("Not authorized");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

// module.exports = { protect };
