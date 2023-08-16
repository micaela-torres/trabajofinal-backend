import {
  calculateTimeDifference,
  parseDate,
} from "../../../mid/dateformater.js";
import { userRepository } from "../../../repositories/users.repository.js";
import { emailService } from "../../../services/email.service.js";

export async function deleteAllUserController(req, res, next) {
  req.logger.http("inside delete all user");
  try {
    const users = await userRepository.findMany();
    users.forEach(async (u) => {
      const last = parseDate(u.last_connection);
      const diference = calculateTimeDifference(
        last,
        2 * 60 * 60 * 1000
      ); /*dos horas*/
      if (diference && u.role !== "super-admin") {
        await userRepository.deleteOne(u.id);
        const mailData = {
          subject: "Cuenta eliminada",
          mensaje: `\n\n
          Por inactividad su cuenta ha sido eliminada.\n\n
          Hasta la vuelta\n`,
        };
        await emailService.send(u.email, mailData);
      }
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
