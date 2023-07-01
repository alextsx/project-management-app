import { FC } from "react"
import { Prisma } from "@prisma/client"
import clsx from "clsx"
import Card from "./Card"

//Prisma.UserArgs, ProjectArgs, TaskArgs etc
const projectWithTasks =  Prisma.validator<Prisma.ProjectArgs>()({
    include: {tasks: true}
})

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>

const formatDate = (date : Date) => (
    new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
)

const ProjectCard = ({project} : {project : ProjectWithTasks}) => {
    const completedTaskCount = project?.tasks.map(task=>task.status==='COMPLETED').length
    const taskProgressPercentage = Math.ceil((completedTaskCount/project.tasks.length)*100)

    return (
        <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
          <div>
            <span className="text-sm text-gray-300">
              {formatDate(project.createdAt)}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl text-gray-600">{project.name}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400">
              {completedTaskCount}/{project.tasks.length} completed
            </span>
          </div>
          <div>
            <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
              <div
                className={clsx(
                  "h-full text-center text-xs text-white bg-violet-600 rounded-full"
                )}
                style={{ width: `${taskProgressPercentage}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600 font-semibold">
                {taskProgressPercentage}%
              </span>
            </div>
          </div>
        </Card>
      );
    };

export default ProjectCard