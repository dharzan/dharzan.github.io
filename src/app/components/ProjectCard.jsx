import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ProjectScenePreview from "./ProjectScenePreview";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, sceneKey }) => {
  const hasScene = Boolean(sceneKey);
  return (
    <div className="rounded-xl overflow-hidden border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
      <div className="h-52 md:h-72 relative group overflow-hidden">
        {hasScene ? (
          <>
            <ProjectScenePreview sceneKey={sceneKey} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22d3ee11,_transparent)]" />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#020617] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
          </Link>
          <Link
            href={previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818]/70 py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
