import prisma from "../../../../Shared/prisma";
import { manageStats } from "./stats.helper";
const getStats = async () => {

  const totalStudent = await prisma.department.findMany({
    select: {
      name: true,

      _count: true,
    },
  });

  const totalPlaced = await prisma.department.findMany({
    include: {
      _count: {
        select: {
          student: {
            where: {
              status: true
            }
          }
        }
      }
    }
  });
//   console.log(totalPlaced)
//   console.log(totalStudent)
 return  manageStats(totalPlaced, totalStudent)
//  return {totalPlaced , totalStudent}
};
export const StatsService = {
  getStats,
};
